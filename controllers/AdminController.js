const Admin = require("../models/AdminModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerAdmin = async (req, res) => {
  const { username, password } = req.body;
  const existingUser = await Admin.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ message: "Username already taken" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new Admin({ username, password: hashedPassword });
  await newUser.save();
  res.status(201).json({ message: "User registered successfully" });
};

//wow

exports.loginAdmin = async (req, res) => {
  const { username, password } = req.body;
  const user = await Admin.findOne({ username });
  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }
  const token = jwt.sign({ id: user._id }, process.env.ADMIN_JWT_SECRET, {
    expiresIn: "1h",
  });

  res.json({ message: "Login successful", token });
};

exports.updateAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const { id } = req.params;
    const admin = await Admin.findById(id);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    if (username) {
      const existingUser = await Admin.findOne({ username });
      if (existingUser && existingUser._id.toString() !== id) {
        return res.status(400).json({ message: "Username already taken" });
      }
      admin.username = username;
    }
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      admin.password = hashedPassword;
    }
    await admin.save();
    res.json({ message: "Admin updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getByIdAdmin = async (req, res) => {
  try {
    const admin = await Admin.findById("6716a96020db59597f94e398");
    if (!admin) return res.status(404).json({ message: "Admin not found" });
    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json({ message: "Error fetching Admin" });
  }
};
