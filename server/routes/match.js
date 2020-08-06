const express = require("express");
const authUser = require("../middleware/authUser");
const router = express.Router();

router.put("/matches", async (req, res) => {
  const { date, player_one, player_two, winner, frames_played } = req.body;

  const newMatch = new Match({
    date,
    player_one,
    player_two,
    winner,
    frames_played
  });
  try {
    await newMatch.save();

    res.status(200).json({ message: "Match saved" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ errorMessage: err.message });
  }
});

router.use(authUser);

module.exports = router;
