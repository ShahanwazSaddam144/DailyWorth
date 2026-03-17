const express = require("express");
const router = express.Router();
const Expense = require("../Database/expense");
const { authMiddleware } = require("../middleware/authMiddleware");

router.post("/expense", authMiddleware, async (req, res) => {
  try {
    const { monthlySalary, monthlyBudget, monthlySaving, dailyBudget } = req.body;

    if (!monthlySalary || !monthlyBudget || !monthlySaving || !dailyBudget) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }

    const newExpense = new Expense({
      user: req.user._id,
      email: req.user.email,
      monthlySalary,
      monthlyBudget,
      monthlySaving,
      dailyBudget,
    });

    await newExpense.save();

    res.status(201).json({
      success: true,
      message: "Expense Saved Successfully",
      data: newExpense,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

module.exports = router;