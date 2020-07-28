const express = require("express");
const User = require("../models/user");
const authUser = require("../middleware/authUser");
const router = express.Router();

router.use(authUser);

router.get("/:userId/stats", async (req, res) => {
  const { inLastTen } = req.query;
  const { userId } = req.params;

  try {
    if (!inLastTen) {
      const { stats } = await User.findById(userId).select("stats").exec();
      if (!stats)
        return res.status(404).json({ errorMessage: "User not found" });

      res.status(200).json({ stats });
    } else {
      const { last_ten_stats } = await User.findById(userId)
        .select("last_ten_stats")
        .exec();
      if (!last_ten_stats)
        return res.status(404).json({ errorMessage: "User not found" });

      let lastTenStats = { cumulative: {}, best_record: {} };

      last_ten_stats.forEach(stat => {
        const statObj = stat.toObject();

        for (const field in statObj.cumulative) {
          lastTenStats.cumulative[field] =
            statObj.cumulative[field] + (lastTenStats.cumulative[field] || 0);
        }
        for (const field in statObj.best_record) {
          lastTenStats.best_record[field] = Math.max(
            lastTenStats.best_record[field] || 0,
            statObj.best_record[field]
          );
        }
      });

      console.log(lastTenStats);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ errorMessage: err.message });
  }
});

router.put("/:userId/stats", async (req, res) => {
  const stats = req.body;
  const userId = req.user._id;

  try {
    const user = await User.findById(userId);

    if (!user) return res.status(401).json({ errorMessage: "User not found" });

    user.stats = stats;

    //push and shift last ten
    if (user.last_ten_stats.length === 10) {
      user.last_ten_stats.shift();
    }
    user.last_ten_stats.push(stats);

    await user.save();

    res.status(200).json({ message: "User stats updated" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ errorMessage: err.message });
  }
});

module.exports = router;
