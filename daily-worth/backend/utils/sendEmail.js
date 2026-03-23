const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

const sendVerificationEmail = async (to, name, verifyUrl) => {
  const mailOptions = {
    from: `"DailyWorth Auth" <${EMAIL_USER}>`,
    to,
    subject: "Confirm Your DailyWorth Account",
    html: `
      <div style="background: linear-gradient(135deg, #0f172a, #1e293b); padding: 30px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #cbd5e1;">
        <div style="max-width: 620px; margin: auto; background: #0f172a; border: 1px solid #334155; border-radius: 14px; overflow: hidden; box-shadow: 0 10px 25px rgba(0, 0, 0, 0.45);">
          <div style="padding: 24px; text-align: center; background: linear-gradient(120deg, #0891b2, #2563eb); color: #fff;">
            <h1 style="margin: 0; font-size: 1.8rem;">Hi ${name} 👋</h1>
            <p style="margin: 10px 0 0; font-size: 1rem;">Welcome to DailyWorth - your web finance companion.</p>
          </div>
          <div style="padding: 24px;">
            <p style="margin-bottom: 16px;">Click the button below to verify your email and activate your account.</p>
            <a href="${verifyUrl}" style="display: inline-block; padding: 12px 26px; background: #22d3ee; color: #0f172a; border-radius: 10px; font-weight: bold; text-decoration: none;">Verify Account</a>
            <p style="margin-top: 18px; color: #94a3b8; font-size: 0.95rem;">If the button doesn't work, paste this link in your browser:</p>
            <p style="word-break: break-all; color: #a5b4fc; font-size: 0.85rem;">${verifyUrl}</p>
            <p style="margin-top: 16px; color: #94a3b8; font-size: 0.9rem;">This link is valid for 24 hours.</p>
          </div>
          <div style="background: #111827; padding: 16px; text-align: center; border-top: 1px solid #334155; color: #94a3b8; font-size: 12px;">
            If you did not request this, please ignore this email. Welcome to the DailyWorth community.
          </div>
        </div>
      </div>
    `,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = { sendVerificationEmail };
