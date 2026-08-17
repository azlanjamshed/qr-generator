const crypto = require('crypto');
const QRCode = require('qrcode');
const Qr = require('../models/Qr');

exports.generateQr = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text || !text.trim()) {
      return res.status(400).json({ error: 'Text is required' });
    }

    const cleanText = text.trim();
    const hash = crypto.createHash('sha256').update(cleanText).digest('hex');

    // check if this data was already used to generate a QR
    const existing = await Qr.findById(hash);
    if (existing) {
      return res.json({ qrImage: existing.qrImage, cached: true });
    }

    // generate a new QR code as a base64 data URL
    const qrImage = await QRCode.toDataURL(cleanText);

    const newQr = new Qr({ _id: hash, text: cleanText, qrImage });
    await newQr.save();

    res.json({ qrImage, cached: false });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

exports.getHistory = async (req, res) => {
  try {
    const items = await Qr.find().sort({ createdAt: -1 }).limit(50);
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};
