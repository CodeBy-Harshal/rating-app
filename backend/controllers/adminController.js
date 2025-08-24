const { User, Store, Rating } = require("../models");
const bcrypt = require("bcrypt");

// Dashboard
exports.getDashboard = async (req, res) => {
  try {
    const totalUsers = await User.count();
    const totalStores = await Store.count();
    const totalRatings = await Rating.count();

    res.json({ totalUsers, totalStores, totalRatings });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add new user
exports.addUser = async (req, res) => {
  try {
    const { name, email, address, password, role } = req.body;

    if (!name || !email || !password || !role) return res.status(400).json({ message: "Missing required fields" });

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, address, password: hashedPassword, role });

    res.status(201).json({ message: "User added successfully", userId: newUser.id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add new store
exports.addStore = async (req, res) => {
  try {
    const { name, email, address, ownerId } = req.body;
    if (!name || !ownerId) return res.status(400).json({ message: "Missing required fields" });

    const store = await Store.create({ name, email, address, ownerId });
    res.status(201).json({ message: "Store added successfully", storeId: store.id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// List users (with optional filters)
exports.listUsers = async (req, res) => {
  try {
    const { name, email, address, role } = req.query;

    const whereClause = {};
    if (name) whereClause.name = name;
    if (email) whereClause.email = email;
    if (address) whereClause.address = address;
    if (role) whereClause.role = role;

    const users = await User.findAll({ where: whereClause });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get user details
exports.getUserDetails = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findByPk(userId, { include: [{ model: Store, as: "stores" }, Rating] });
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// List stores (with optional filters)
exports.listStores = async (req, res) => {
  try {
    const { name, email, address } = req.query;
    const whereClause = {};
    if (name) whereClause.name = name;
    if (email) whereClause.email = email;
    if (address) whereClause.address = address;

    const stores = await Store.findAll({ where: whereClause, include: Rating });
    res.json(stores);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
