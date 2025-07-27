const mongoose = require('mongoose');

const EntrepreneurSchema = new mongoose.Schema({
  name: { type: String, required: true },
  gender: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  state: { type: String, required: true },
  district: { type: String, required: true },
  mandal: { type: String, required: true },
  cityTownVillage: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Entrepreneur', EntrepreneurSchema);
