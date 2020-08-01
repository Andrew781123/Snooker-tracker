const express = require("express");
const User = require("../models/user");
const authUser = require("../middleware/authUser");
const Match = require("../models/match");
const router = express.Router();
const mongoose = require("mongoose");

router.use(authUser);

router.get("/:userId/stats", async (req, res) => {
  const { userId } = req.params;
  const { num } = req.query;

  const user_id = mongoose.Types.ObjectId(userId);

  //$match: filter all matches that user involved
  //$project: remove the opponent of all matches
  //$project: convert to same parent field name
  //$group: calc the stats

  try {
    const { username } = await User.findById(userId);
    if (!username)
      return res.status(404).json({ errorMessage: "User not found" });

    const stats = await Match.aggregate([
      {
        $match: {
          $or: [
            { "player_one.user_id": user_id },
            { "player_two.user_id": user_id }
          ]
        }
      },
      ...(typeof num !== "undefined"
        ? [{ $sort: { date: -1 } }, { $limit: +num }]
        : []),
      {
        $project: {
          player_one: {
            $cond: {
              if: { $eq: ["$player_one.user_id", user_id] },
              then: "$player_one",
              else: "$$REMOVE"
            }
          },
          player_two: {
            $cond: {
              if: { $eq: ["$player_two.user_id", user_id] },
              then: "$player_two",
              else: "$$REMOVE"
            }
          },
          winner: "$winner",
          frames_played: "$frames_played"
        }
      },
      {
        $project: {
          player: {
            $ifNull: ["$player_one", "$player_two"]
          },
          winner: 1,
          frames_played: "$frames_played"
        }
      },
      {
        $group: {
          _id: "$player.username",
          attempts: {
            $sum: "$player.attempts"
          },
          balls_potted: {
            $sum: "$player.balls_potted"
          },
          points_scored: {
            $sum: "$player.points_scored"
          },
          centuries: {
            $sum: "$player.centuries"
          },
          highest_break: {
            $max: "$player.highest_break"
          },
          fouls: {
            $sum: "$player.fouls"
          },
          frames_won: {
            $sum: "$player.frames_won"
          },
          frames_played: {
            $sum: "$frames_played"
          },
          match_won: {
            $sum: {
              $cond: { if: { $eq: ["$winner", username] }, then: 1, else: 0 }
            }
          },
          match_played: {
            $sum: 1
          }
        }
      },
      {
        $project: {
          attempts: "$attempts",
          balls_potted: "$balls_potted",
          balls_per_frame: getFraction("$balls_potted", "$frames_played"),
          pot_success: convertToPercentage(
            getFraction("$balls_potted", "$attempts")
          ),
          points_scored: "$points_scored",
          points_per_frame: getFraction("$points_scored", "$frames_played"),
          centuries: "$centuries",
          highest_break: "$highest_break",
          fouls: "$fouls",
          fouls_per_frame: getFraction("$fouls", "$frames_played"),
          frames_won: "$frames_won",
          frames_played: "$frames_played",
          frame_winning_percentage: convertToPercentage(
            getFraction("$frames_won", "$frames_played")
          ),
          match_won: 1,
          match_played: 1,
          match_winning_percentage: convertToPercentage(
            getFraction("$match_won", "$match_played")
          )
        }
      }
    ]);

    res.status(200).json({ stats });

    function getFraction(numerator, denominator) {
      return {
        $convert: {
          input: {
            $round: [{ $divide: [numerator, denominator] }, 3]
          },
          to: "string"
        }
      };
    }

    function convertToPercentage(fraction) {
      return {
        $concat: [
          {
            $toString: {
              $multiply: [
                {
                  $toDouble: fraction
                },
                100
              ]
            }
          },
          "%"
        ]
      };
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ errorMessage: err.message });
  }
});

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

//history

router.get("/:userId/histories", async (req, res) => {
  const { userId } = req.params;
  const { num, page } = req.query;

  const startIdx = +page > 0 ? (+page - 1) * +num : 0;

  const user_id = mongoose.Types.ObjectId(userId);

  try {
    const histories = await Match.find({
      $or: [
        { "player_one.user_id": user_id },
        { "player_two.user_id": user_id }
      ]
    })
      .sort({ date: -1 })
      .skip(startIdx)
      .limit(+num)
      .exec();

    historiesObj = histories.map(history => {
      historyObj = history.toObject();

      historyObj.player_one.pot_success = `${(
        (history.player_one.balls_potted * 100) /
        historyObj.player_one.attempts
      ).toFixed(1)}%`;

      historyObj.player_two.pot_success = `${
        (history.player_two.balls_potted * 100) / historyObj.player_two.attempts
      }%`;

      delete historyObj.player_one.attempts;
      delete historyObj.player_one.balls_potted;
      delete historyObj.player_two.attempts;
      delete historyObj.player_two.balls_potted;

      return historyObj;
    });

    res.json(historiesObj);
  } catch (err) {
    console.log(err);
    res.status(500).json({ errorMessage: err.message });
  }
});

module.exports = router;
