const formData = require('form-data');
const Mailgun = require('mailgun.js');
const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: 'api',
  key: '3e5c466e567bb74342ec59cf4674b275-8c9e82ec-2ec8b9d2',
});

// Define a function that sends an email with the provided OTP
const sendEmailWithOTP = (toEmail, otp) => {
  mg.messages
    .create('sandboxb3587f19e5a442c797200213290c1cb2.mailgun.org', {
      from: 'Mailgun Sandbox <postmaster@sandboxb3587f19e5a442c797200213290c1cb2.mailgun.org>',
      to: [toEmail],
      subject: 'Your OTP Code',
      text: `Your OTP code is: ${otp}`,
    })
    .then((msg) => {
      console.log('OTP email sent:', msg); // logs response data
    })
    .catch((err) => {
      console.error('Error sending OTP email:', err); // logs any error
    });
};

module.exports = sendEmailWithOTP;
