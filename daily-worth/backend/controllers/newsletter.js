const express = require("express");
const router = express.Router();
const NewsLetter = require("../Database/newsletter");
const { sendNewsletterEmail } = require("../utils/Newsletter");

router.post("/newsletter", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Email is required" });
    }

    const exists = await NewsLetter.findOne({ email });
    if (exists) {
      return res
        .status(400)
        .json({ success: false, message: "Already subscribed" });
    }

    const newNewsLetter = new NewsLetter({ email });
    await newNewsLetter.save();

    await sendNewsletterEmail(email);

    res
      .status(200)
      .json({ success: true, message: "Subscribed & email sent" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

module.exports = router;