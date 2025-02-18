require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');
const app = express();

// Twilio client
// const client = twilio(
//   process.env.TWILIO_ACCOUNT_SID,
//   process.env.TWILIO_AUTH_TOKEN
// );

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => {
  res.render('index', { message: null, error: null });
});

app.post('/send-sms', async (req, res) => {
  const { phone, message } = req.body;
  
  try {
    await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone
    });
    
    res.render('index', { 
      message: 'Message sent successfully!', 
      error: null 
    });
  } catch (err) {
    console.error(err);
    res.render('index', { 
      message: null, 
      error: 'Failed to send message. Please try again.' 
    });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});