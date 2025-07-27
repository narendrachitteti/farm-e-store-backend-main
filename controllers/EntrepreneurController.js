const Entrepreneur = require('../models/EntrepreneurModel');

exports.createEntrepreneur = async (req, res) => {
  try {
    const entrepreneur = new Entrepreneur(req.body);
    await entrepreneur.save();
    res.status(201).json({ success: true, data: entrepreneur });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.getEntrepreneurs = async (req, res) => {
  try {
    const entrepreneurs = await Entrepreneur.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: entrepreneurs });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
