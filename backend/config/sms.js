const twilio = require('twilio');
require('dotenv').config();
// Set up Twilio client with your account SID and auth token
const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

const sendSMS = async (to, body) => {
  try {
    const message = await client.messages.create({
      body,
      from: process.env.TWILIO_PHONE,
      to,
    });

    console.log('SMS sent: ' + message.sid);
  } catch (error) {
    console.error('Error sending SMS:', error);
  }
};
