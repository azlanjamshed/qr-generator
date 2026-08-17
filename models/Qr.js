const mongoose = require('mongoose');

const qrSchema = new mongoose.Schema(
  {
    _id: String, 
    text: String,
    qrImage: String, 
  },
  { timestamps: true }
);

module.exports = mongoose.model('Qr', qrSchema);
