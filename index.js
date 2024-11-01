const express = require('express');
const sgMail = require('@sendgrid/mail');
const cors = require('cors');
require('dotenv').config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const app = express();
app.use(cors());
app.use(express.json());

app.post('/send-email', async (req, res) => {
  const { email, name, subject, message } = req.body;

  const msg = {
    to: email,
    from: 'raiasmit10@gmail.com',
    subject: subject || 'No Subject',
    text: message,
    html: `${message}`,
  };

  try {
    const response = await sgMail.send(msg);
    res.status(200).json({ message: 'Email sent successfully', statusCode: response[0].statusCode });
    console.log(`Email sent to ${email} with status code ${response[0].statusCode}`);
  } catch (error) {
    console.error('Failed to send email:', error.message || error);
    res.status(500).json({
      error: 'Failed to send email',
      details: error.response ? error.response.body.errors : error.message,
    });
  }
});

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
