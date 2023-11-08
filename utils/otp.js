const bcrypt = require('bcrypt');
const sendEmailWithOTP = require('./sendOtp'); // Replace with the actual path to your email module
const crypto = require('crypto');

// Array to store OTPs and their creation timestamps
const otps = [];

// Generate a random OTP of a specified length and save it in the array
async function generateOTP(userEmailAddress, length = 6) {
  return new Promise(async (resolve) => {
    const existingOtpEntry = otps.find((entry) => entry.userEmailAddress.toLowerCase() === userEmailAddress.toLowerCase());
    let myotp
    if (existingOtpEntry) {
      // If the email already exists, update the existing entry with a new OTP
      existingOtpEntry.otp = crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
      existingOtpEntry.timestamp = Date.now();
    } else {
      // If the email is not found, create a new OTP entry
       myotp = crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
      const timestamp = Date.now();

      // Save the OTP and its creation timestamp in the array
      otps.push({ userEmailAddress: userEmailAddress, myotp, timestamp });
    }

    // Send the OTP via email
    await sendEmailWithOTP(userEmailAddress, existingOtpEntry ? existingOtpEntry.otp : myotp);
    console.log('OTP email sent:', existingOtpEntry ? existingOtpEntry.otp : myotp);

    // Set a timer to remove the OTP from the array after 5 minutes
    setTimeout(() => {
      removeOTP(userEmailAddress, existingOtpEntry ? existingOtpEntry.otp : myotp);
    }, 5 * 60 * 1000); // 5 minutes in milliseconds

    resolve(existingOtpEntry ? existingOtpEntry.otp : myotp);
  });
}


function verifyOTP(otp, userEmail) {
  let otpMatched = false;
  console.log(otp)
  console.log(otps)

  for (let i = 0; i < otps.length; i++) {
    const otpEntry = otps[i];
    console.log(otpEntry)

    if (otpEntry.userEmailAddress.toLowerCase() === userEmail.toLowerCase()) {
      // Email found in the array
      const currentTime = Date.now();

      if (currentTime - otpEntry.timestamp <= 5 * 60 * 1000) {
        // OTP is still valid

        if (otp==otpEntry.myotp) {
          // OTP is correct
          otpMatched = true;

          // Remove the OTP from the array
          otps.splice(i, 1);

          console.log('OTP matched:', otpEntry.myotp);
        } else {
          return false
        }
      } else {
        console.log('OTP has expired');
      }
      break; // Exit the loop when the email is found
    }
  }

  if (!otpMatched) {
    console.log('Email not found in the array');
  }
}


// Remove the OTP entry from the array
function removeOTP(userEmailAddress, otp) {
  const index = otps.findIndex((entry) => entry.userEmailAddress === userEmailAddress && entry.otp === otp);
  if (index !== -1) {
    otps.splice(index, 1);
  }
}

module.exports = { generateOTP, verifyOTP };
