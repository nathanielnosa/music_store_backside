const nodemailer = require('nodemailer');

// Create a nodemailer transporter with your email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.email_user,
    pass: process.env.email_pass
  }
});

// Function to send welcome email
const sendWelcomeEmail = async (email, firstname) => {
  try {
    await transporter.sendMail({
      from: process.env.email_user,
      to: email,
      subject: 'Welcome to MusicHub!',
      text: `Dear ${firstname},\n\nWelcome to Music Hub! We're excited to have you on board.\n\nBest regards,\nThe Music Hub Team`
    });
  } catch (error) {
    console.error('Error sending welcome email:', error);
  }
};

module.exports = { sendWelcomeEmail }