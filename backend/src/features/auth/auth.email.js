import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const createEmailShell = ({ heading, body, buttonText, buttonUrl, footer }) => `
  <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0;">
    <div style="background: linear-gradient(135deg, #2563eb, #3b82f6); padding: 32px; text-align: center;">
      <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 800; letter-spacing: 0;">
        <span>Recipe</span><span style="color: #fca5a5;">Finder</span>
      </h1>
    </div>
    <div style="padding: 40px 32px;">
      <h2 style="color: #1e293b; margin: 0 0 16px; font-size: 22px;">${heading}</h2>
      <p style="color: #64748b; font-size: 15px; line-height: 1.6; margin: 0 0 24px;">${body}</p>
      <div style="text-align: center; margin: 32px 0;">
        <a href="${buttonUrl}" style="display: inline-block; background: #2563eb; color: #ffffff; text-decoration: none; padding: 14px 40px; border-radius: 8px; font-weight: 600; font-size: 15px;">${buttonText}</a>
      </div>
      <p style="color: #94a3b8; font-size: 13px; line-height: 1.5; margin: 24px 0 0;">${footer}</p>
    </div>
    <div style="background: #f8fafc; padding: 20px 32px; text-align: center; border-top: 1px solid #e2e8f0;">
      <p style="color: #94a3b8; font-size: 12px; margin: 0;">&copy; ${new Date().getFullYear()} RecipeFinder. All rights reserved.</p>
    </div>
  </div>
`;

const sendMail = async ({ to, subject, html }) => {
  await transporter.sendMail({
    from: `"RecipeFinder" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  });
};

const sendVerificationEmail = async (to, token) => {
  const verificationUrl = `${process.env.CLIENT_URL}/verify-email?token=${token}`;

  await sendMail({
    to,
    subject: "Verify Your Email - RecipeFinder",
    html: createEmailShell({
      heading: "Verify Your Email",
      body: "Thanks for signing up! Please click the button below to verify your email address and activate your account.",
      buttonText: "Verify Email",
      buttonUrl: verificationUrl,
      footer: "This link will expire in 24 hours. If you did not create an account, you can safely ignore this email.",
    }),
  });
};

const sendPasswordResetEmail = async (to, token) => {
  const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${token}`;

  await sendMail({
    to,
    subject: "Reset Your Password - RecipeFinder",
    html: createEmailShell({
      heading: "Reset Your Password",
      body: "We received a request to reset your password. Click the button below to choose a new one.",
      buttonText: "Reset Password",
      buttonUrl: resetUrl,
      footer: "This link will expire in 1 hour. If you did not request this, you can safely ignore this email. Your password will not change.",
    }),
  });
};

export { sendVerificationEmail, sendPasswordResetEmail };
