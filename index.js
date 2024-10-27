const express = require('express');
const sgMail = require('@sendgrid/mail');
const cors = require('cors');
require('dotenv').config();

sgMail.setApiKey("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");
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
    html: `
      <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
        <h2 style="color: #4CAF50;">Hello, ${name || 'there'}!</h2>
        <p>${message}</p>
        <br/>
        <p>Best Regards,</p>
        <p><strong>EventMaster</strong></p>
        <p>Contact us: <a href="mailto:raiasmit10@gmail.com">raiasmit10@gmail.com</a></p>
      </div>
    `,
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
