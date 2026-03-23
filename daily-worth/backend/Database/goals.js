const mongoose = require("mongoose");

const goalsSchema = new mongoose.Schema({
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

  name: { type: String, required: true },
  target: { type: Number, required: true },
  emoji: { type: String, required: true },
});

module.exports = mongoose.model("Goals", goalsSchema);
