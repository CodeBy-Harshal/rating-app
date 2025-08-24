const { Rating, User, Store } = require("../models");

// Get all ratings with user + store info
exports.getRatings = async (req, res, next) => {
  try {
    const ratings = await Rating.findAll({
      include: [
        { model: User, as: "user", attributes: ["id", "name", "email"] },
        { model: Store, as: "store", attributes: ["id", "name"] },
      ],
    });
    res.json(ratings);
  } catch (err) {
    next(err);
  }
};

// Create new rating
exports.createRating = async (req, res, next) => {
  try {
    const { userId, storeId, score } = req.body;

    const rating = await Rating.create({ userId, storeId, score });
    res.status(201).json(rating);
  } catch (err) {
    next(err);
  }
};
