const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  // host: "smtp-mail.outlook.com", // hostname
  //     secureConnection: false, // TLS requires secureConnection to be false
  //     port: 587, // port for secure SMTP
  //     tls: {
  //         ciphers:'SSLv3'
  //     },
  // host: 'smtp.zohocloud.ca',
  // port: 465,
  // secure: true, //ssl
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendConfirmationEmail(email, reservationDetails) {
  console.log(process.env.EMAIL_USER);
  console.log(process.env.EMAIL_PASS);
  transporter.verify((error) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Server is ready to take our messages');
    }
  });
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Reservation Confirmation',
      html: `
        <p>Dear ${reservationDetails.user.name},</p>
        <p>Your reservation has been successfully confirmed.</p>
        <p>Reservation Details:</p>
        <ul>
          <li>Vehicle: ${reservationDetails.vehicle.make} ${reservationDetails.vehicle.model}</li>
          <li>Date: ${reservationDetails.pickupDate} - ${reservationDetails.returnDate}</li>
          <!-- Please reply directly to this email incase you didn't make this reservation -->
        </ul>
        <p>Thank you for choosing CarRentals.com.</p>
      `,
    };
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    return true;
  } catch (error) {
    console.log(`Error sending email ${error}`);
    return false;
  }
}

module.exports = { sendConfirmationEmail };
