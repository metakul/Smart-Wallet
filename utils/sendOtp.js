const nodemailer = require('nodemailer');

// Configure Nodemailer with Gmail SMTP
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'shubhamkunwar10feb@gmail.com',
    pass: 'hedb bryb fbbp uusi', // Use your Gmail password or an App Password
  },
});

// Define a function that sends an email with the provided OTP
const sendEmailWithOTP = (toEmail, otp) => {
  // Compose the email
  const mailOptions = {
    from: 'metakul@gmail.com',
    to: toEmail,
    subject: 'Your OTP Code',
    text: `Your OTP code is: ${otp}`,
  };

  // Send the OTP email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending OTP email:', error);
    } else {
      console.log('OTP email sent:', info.response);
    }
  });
};

module.exports = sendEmailWithOTP;
