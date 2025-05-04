import nodemailer from 'nodemailer';
const sendEmail = async (to, subject, text) => {
  let transporter = nodemailer.createTransport({
    service: 'gmail', // Or any other email service you prefer
    auth: {
      user: '80802003st@gmail.com',
      pass: 'Bro@1904', // Consider using environment variables for security
    },
  });

  let info = await transporter.sendMail({
    from: '"Your App" <80802003st@gmail.com>',
    to,
    subject,
    text,
  });

  console.log('Email sent: ' + info.response);
};

sendEmail('tatishravani@example.com', 'Notification Subject', 'Your notification text here.');
