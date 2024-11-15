// const nodemailer = require('nodemailer');
// const Email = require('../models/email').Email;

// const sendEmail = async (req, res) => {
//   const { host, port, email, appPassword, fromName, fromEmail, to, subject, emailBody } = req.body;

//   const mailTransporter = nodemailer.createTransport({
//     host: host || 'smtp.gmail.com',
//     port: port || 465,
//     secure: true,
//     auth: {
//       user: email,
//       pass: appPassword,
//     },
//   });

//   const details = {
//     from: {
//       name: fromName,
//       address: fromEmail,
//     },
//     to: to,
//     subject: subject,
//     html: emailBody,
//   };

//   try {
//     await mailTransporter.sendMail(details);
//     const emailRecord = new Email({ fromName, fromEmail, to, subject, emailBody, status: 'sent' });
//     await emailRecord.save();
//     res.status(200).send('Email sent successfully');
//   } catch (err) {
//     console.log(err);
//     const emailRecord = new Email({ fromName, fromEmail, to, subject, emailBody, status: 'failed' });
//     await emailRecord.save();
//     res.status(500).send('Failed to send email');
//   }
// };

// module.exports = { sendEmail };


const nodemailer = require('nodemailer');
const WarmupConfig = require('../models/email').WarmupConfig;
const Email = require('../models/email').Email;  // Assuming this is your MongoDB model for tracking emails


const sendEmail = async (req, res) => {
  const { host, port, email, appPassword, fromName, fromEmail, to, subject, emailBody } = req.body;
  try {
    // Fetch the user's warmup configuration
    const warmupConfig = await WarmupConfig.findOne({ userEmail: fromEmail });

    if (!warmupConfig) {
      return res.status(400).send('Warmup configuration not found for this user.');
    }

    const currentTime = new Date();
    const lastSentTime = warmupConfig.lastSent;
    const intervalMinutes = warmupConfig.intervalMinutes;
    const nextAllowedSendTime = new Date(lastSentTime.getTime() + intervalMinutes * 60000);

    // Check if the current time is before the next allowed send time
    if (currentTime < nextAllowedSendTime) {
      const remainingTime = Math.ceil((nextAllowedSendTime - currentTime) / 60000); // Convert milliseconds to minutes
      return res.status(429).json({
        message: `Please wait ${remainingTime} more minute(s) before sending the next email.`
      });
        
    }

    // Create transport for sending the email
    const mailTransporter = nodemailer.createTransport({
      host: host || 'smtp.gmail.com',
      port: port || 465,
      secure: true,
      auth: {
        user: email,
        pass: appPassword,
      },
    });

    // Email details to be sent
    const details = {
      from: {
        name: fromName,
        address: fromEmail,
      },
      to: to,
      subject: subject,
      html: emailBody,
    };

    // Send email using nodemailer
    await mailTransporter.sendMail(details);

    // Save email record in MongoDB with status 'sent'
    const emailRecord = new Email({
      fromName,
      fromEmail,
      to,
      subject,
      emailBody,
      status: 'sent',
    });
    await emailRecord.save();

    // Update the lastSent field in the warmup configuration
    warmupConfig.lastSent = currentTime;
    await warmupConfig.save();

    // Send successful response
    res.status(200).send('Email sent successfully');
  } catch (err) {
    // Log the error to the console
    console.log('Error occurred while sending email:', err);

    // Save the email record with status 'failed'
    const emailRecord = new Email({
      fromName,
      fromEmail,
      to,
      subject,
      emailBody,
      status: 'failed',
    });
    await emailRecord.save();

    // Send failed response to frontend
    res.status(500).send('Failed to send email');
  }
};

module.exports = { sendEmail };