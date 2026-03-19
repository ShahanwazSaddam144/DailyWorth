const express = require("express");
const router = express.Router();
const Expense = require("../Database/expense");
const { authMiddleware } = require("../middleware/authMiddleware");

router.post("/expense", authMiddleware, async (req, res) => {
  try {
    const {
      monthlySalary,
      monthlyBudget,
      dailyBudget,
      dailySpent,
      remaining,
      saved,
    } = req.body;

    if (
      monthlySalary === undefined ||
      monthlyBudget === undefined ||
      dailyBudget === undefined ||
      dailySpent === undefined ||
      remaining === undefined ||
      saved === undefined
    ) {
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
      dailyBudget,
      dailySpent,
      remaining,
      saved,
    });

    await newExpense.save();

    res.status(201).json({
      success: true,
      message: "Expense Saved Successfully",
      data: newExpense,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

router.get("/expense", authMiddleware, async (req, res) => {
  try {
    const expenses = await Expense.find({
      email: req.user.email,
    }).sort({ createdAt: 1 });

    if (!expenses || expenses.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No expense data found for this user",
      });
    }

    res.status(200).json({
      success: true,
      message: "Expense fetched successfully",
      data: expenses,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

module.exports = router;