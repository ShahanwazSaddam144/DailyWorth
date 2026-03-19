const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    monthlySalary: {
      type: Number,
      required: true,
      min: 0,
    },

    monthlyBudget: {
      type: Number,
      required: true,
      min: 0,
    },

    dailyBudget: {
      type: Number,
      required: true,
      min: 0,
    },

    dailySpent: {
      type: Number,
      required: true,
      min: 0,
    },

    remaining: {
      type: Number,
      required: true,
      min: 0,
    },

    saved: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Expense", expenseSchema);