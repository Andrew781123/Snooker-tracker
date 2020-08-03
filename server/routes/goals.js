const express = require("express");
const User = require("../models/user");
const Goal = require("../models/goal");
const authUser = require("../middleware/authUser");
const { update } = require("../models/user");
const router = express.Router();

router.use(authUser);

router.get("/", async (req, res) => {
  const userId = req.user._id;

  try {
    const { goals } = await User.findById(userId)
      .populate("goals")
      .select("goals")
      .exec();
    if (!goals) return res.status(404).json({ errorMessage: "User not found" });

    res.status(200).json({ goals });
  } catch (err) {
    console.log(err);
    res.status(500).json({ errorMessage: err.message });
  }
});

router.post("/", async (req, res) => {
  const userId = req.user._id;
  const { content } = req.body;

  const newGoal = new Goal({ content });
  try {
    const user = await User.findById(userId);
    const savedGoal = await newGoal.save();
    user.goals.push(savedGoal._id);
    await user.save();

    res.status(201).json({ newGoal: savedGoal });
  } catch (err) {
    console.log(err);
    res.status(500).json({ errorMessage: err.message });
  }
});

router.patch("/:goalId", async (req, res) => {
  const { goalId } = req.params;

  try {
    const goal = await Goal.findById(goalId);
    if (!goal) return res.status(404).json({ errorMessage: "Goal not found" });

    for (const field in req.body) {
      goal[field] = req.body[field];
    }

    const updatedGoal = await goal.save();

    res.status(200).json({ updatedGoal });
  } catch (err) {
    console.log(err);
    res.status(500).json({ errorMessage: err.message });
  }
});

router.delete("/:goalId", async (req, res) => {
  const userId = req.user._id;
  const { goalId } = req.params;

  try {
    const user = await User.findById(userId)
      .populate("goals")
      .select("goals")
      .exec();
    if (!user) return res.status(404).json({ errorMessage: "User not found" });

    const goal = await Goal.findById(goalId);
    if (!goal) return res.status(404).json({ errorMessage: "Goal not found" });

    await goal.remove();

    user.goals.pull(goalId);

    await user.save();

    res.status(200).json({ message: "Goal deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ errorMessage: err.message });
  }
});

module.exports = router;
