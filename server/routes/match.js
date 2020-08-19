const express = require("express");
const authUser = require("../middleware/authUser");
const Match = require("../models/match");
const router = express.Router();

router.put("/", async (req, res) => {
  const { date, player_one, player_two, winner, best_of_frames } = req.body;

  const newMatch = new Match({
    date,
    player_one,
    player_two,
    winner,
    best_of_frames
  });
  try {
    const savedMatch = await newMatch.save();

    console.log(savedMatch);

    res.status(200).json({ message: "Match saved" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ errorMessage: err.message });
  }
});

router.use(authUser);

module.exports = router;
