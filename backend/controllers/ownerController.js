const { Store, Rating, User } = require("../models");

// Dashboard for store owner
exports.getDashboard = async (req, res) => {
  try {
    const store = await Store.findOne({ where: { ownerId: req.user.id }, include: { model: Rating, include: User } });
    if (!store) return res.status(404).json({ message: "Store not found" });

    const ratings = store.Ratings;
    const avgRating = ratings.length > 0 ? ratings.reduce((a,b) => a+b.score, 0)/ratings.length : 0;

    const users = ratings.map(r => r.User);

    res.json({ storeName: store.name, avgRating, users });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
