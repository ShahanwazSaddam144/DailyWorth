const express = require("express");
const router = express.Router();
const Goals = require("../Database/goals");
const { authMiddleware } = require("../middleware/authMiddleware");


router.post("/goals", authMiddleware, async (req, res) => {
  try {
    const { name, target, emoji } = req.body;

    if (!name || !target || !emoji) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill all fields" });
    }

    const newGoal = new Goals({
      user: req.user._id,
      email: req.user.email,
      name,
      target,
      emoji,
    });

    await newGoal.save();

    res.status(200).json({
      success: true,
      message: "Goal Saved Successfully",
      data: newGoal,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
});


router.get("/goals", authMiddleware, async (req, res) => {
  try {
    const goals = await Goals.find({ email: req.user.email }).sort({
      createdAt: -1,
    });

    if (!goals || goals.length === 0) {
      return res
        .status(200)
        .json({ success: true, data: [] });
    }

    res.status(200).json({
      success: true,
      message: "Goals Fetched Successfully",
      data: goals,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
});


router.delete("/goals/:id", authMiddleware, async (req, res) => {
  try {
    const goal = await Goals.findOneAndDelete({
      _id: req.params.id,
      email: req.user.email,
    });

    if (!goal) {
      return res
        .status(404)
        .json({ success: false, message: "Goal not found" });
    }

    res.status(200).json({
      success: true,
      message: "Goal deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

module.exports = router;