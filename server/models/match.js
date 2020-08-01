const mongoose = require("mongoose");

const matchStatsSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId
  },
  username: {
    type: String,
    required: true
  },
  attempts: {
    type: Number,
    required: true
  },
  balls_potted: {
    type: Number,
    required: true
  },
  highest_break: {
    type: Number,
    required: true
  },
  points_scored: {
    type: Number,
    required: true
  },
  centuries: {
    type: Number,
    required: true
  },
  frames_won: {
    type: Number,
    required: true
  },
  fouls: {
    type: Number,
    required: true
  }
});

const matchSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  player_one: matchStatsSchema,
  player_two: matchStatsSchema,
  winner: {
    type: String
  },
  frames_played: {
    type: Number,
    required: true
  },
  best_of_frames: {
    type: Number,
    required: true
  }
});

const Match = mongoose.model("match", matchSchema);

module.exports = Match;
