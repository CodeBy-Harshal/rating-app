const { User, Store, Rating } = require("../models");

// Get all users with their stores + ratings
exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.findAll({
      include: [
        { model: Store, as: "stores", attributes: ["id", "name", "email"] },
        { model: Rating, as: "ratings", attributes: ["id", "score"] },
      ],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
};

// Get single user by ID
exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {
      include: [
        { model: Store, as: "stores", attributes: ["id", "name", "email"] },
        { model: Rating, as: "ratings", attributes: ["id", "score"] },
      ],
    });

    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    next(err);
  }
};
