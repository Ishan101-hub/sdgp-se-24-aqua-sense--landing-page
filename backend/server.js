require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(cors({ origin: process.env.ALLOWED_ORIGIN || "*" }));
app.use(express.json());

// ── Nodemailer transporter ────────────────────────────────────────────────────
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,   // aquasenze@gmail.com
    pass: process.env.EMAIL_PASS,   // Gmail App Password (16 chars, no spaces)
  },
});

// ── POST /api/feedback ────────────────────────────────────────────────────────
app.post("/api/feedback", async (req, res) => {
  const { name, email, message, rating } = req.body;

  // Basic server-side validation
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: "All fields are required." });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ success: false, error: "Invalid email address." });
  }

  const stars = rating ? "⭐".repeat(Number(rating)) : "No rating given";

  const mailOptions = {
    from: `"AquaSense Feedback" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,          // sends to aquasenze@gmail.com
    replyTo: email,                       // so you can reply directly to the user
    subject: `New Feedback from ${name} — AquaSense`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:auto;background:#0a0e27;color:#fff;border-radius:12px;padding:32px;">
        <h2 style="color:#00ffcc;margin-bottom:4px;">New Feedback Received</h2>
        <hr style="border-color:rgba(255,255,255,0.1);margin-bottom:24px;">

        <p style="margin:0 0 8px;"><strong style="color:#00ccff;">Name:</strong>&nbsp;${name}</p>
        <p style="margin:0 0 8px;"><strong style="color:#00ccff;">Email:</strong>&nbsp;<a href="mailto:${email}" style="color:#00ffcc;">${email}</a></p>
        <p style="margin:0 0 8px;"><strong style="color:#00ccff;">Rating:</strong>&nbsp;${stars}</p>

        <div style="margin-top:20px;background:rgba(255,255,255,0.05);border-radius:8px;padding:16px;border-left:4px solid #00ffcc;">
          <strong style="color:#00ccff;">Message:</strong>
          <p style="margin:8px 0 0;line-height:1.6;">${message.replace(/\n/g, "<br>")}</p>
        </div>

        <p style="margin-top:28px;font-size:12px;color:#555;">This email was sent automatically from the AquaSense feedback form.</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ success: true, message: "Feedback sent successfully." });
  } catch (err) {
    console.error("Mail error:", err);
    return res.status(500).json({ success: false, error: "Failed to send email. Please try again." });
  }
});

// ── Health check ──────────────────────────────────────────────────────────────
app.get("/", (req, res) => res.send("AquaSense backend is running ✅"));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));