const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema({
  content: {
    type: String,
    reuqired: true
  },
  created_at: {
    type: Date,
    default: () => new Date()
  },
  reached_at: {
    type: Date,
    default: null
  },
  isCompleted: {
    type: Boolean,
    default: false
  }
});

const Goal = mongoose.model("goal", goalSchema);

module.exports = Goal;
