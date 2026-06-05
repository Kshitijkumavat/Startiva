const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

async function sendInviteEmail(to, inviterName, startupName, inviteLink) {
  await transporter.sendMail({
    from: `"Startiva" <${process.env.SMTP_USER}>`,
    to,
    subject: `You've been invited to join ${startupName} on Startiva`,
    html: `
      <h2>You're invited!</h2>
      <p>${inviterName} has invited you to join <strong>${startupName}</strong> on Startiva.</p>
      <a href="${inviteLink}" style="
        display:inline-block;padding:12px 24px;
        background:#1E3A5F;color:white;
        border-radius:6px;text-decoration:none;
      ">Accept Invite</a>
      <p>This link expires in 48 hours.</p>
    `,
  });
}

module.exports = { sendInviteEmail };