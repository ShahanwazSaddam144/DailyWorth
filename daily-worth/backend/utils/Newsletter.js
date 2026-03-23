const nodemailer = require("nodemailer");

const sendNewsletterEmail = async (email) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"DailyWorth" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Welcome to DailyWorth Newsletter 🎉",
      html: `
        <div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); color: #e2e8f0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 30px;">
          <div style="max-width: 600px; margin: auto; background: #0f172a; border: 1px solid #334155; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,.4);">
            <div style="background: linear-gradient(120deg, #0891b2, #2563eb); padding: 30px; text-align: center; color: #fff;">
              <h1 style="margin: 0; font-size: 1.8rem;">Welcome to DailyWorth!</h1>
              <p style="margin: 10px 0 0; font-size: 1rem;">Your financial literacy journey starts now.</p>
            </div>
            <div style="padding: 24px;">
              <p style="margin: 0 0 18px; color: #cbd5e1;">Thanks for subscribing. We're glad you joined the Webiate-inspired financial family.</p>
              <ul style="margin: 0 0 20px; padding-left: 18px; color: #94a3b8;">              
                <li>Weekly smart budgeting tips</li>
                <li>Exclusive savings advice</li>
                <li>Community challenge invites</li>
              </ul>
              <a href="#" style="display: inline-block; padding: 12px 24px; background: #22d3ee; color: #0f172a; border-radius: 8px; text-decoration: none; font-weight: 700;">Explore your dashboard</a>
            </div>
            <div style="background: #111827; border-top: 1px solid #334155; padding: 16px; text-align: center; color: #94a3b8; font-size: 12px;">
              You're now set to receive actionable financial insights from DailyWorth. Manage preferences in your dashboard.
            </div>
          </div>
        </div>
      `,
    });
  } catch (err) {
    throw err;
  }
};

module.exports = { sendNewsletterEmail };