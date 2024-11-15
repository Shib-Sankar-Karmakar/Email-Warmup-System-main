const cron = require('node-cron');
const nodemailer = require('nodemailer');
const { WarmupConfig, Email } = require('../models/email');

const scheduleWarmupEmails = () => {
  cron.schedule('* * * * *', async () => {
    const configs = await WarmupConfig.find();
    configs.forEach(async (config) => {
      const { userEmail, emailsPerDay, intervalMinutes, gradualIncrease, lastSent } = config;
      const now = new Date();
      const nextSend = new Date(lastSent.getTime() + intervalMinutes * 60000);

      if (now >= nextSend) {
        // Dummy email details
        const emailDetails = {
          host: 'smtp.gmail.com',
          port: 465,
          email: userEmail,
          appPassword: 'your-app-password',
          fromName: 'Warmup Bot',
          fromEmail: userEmail,
          to: 'recipient@example.com',
          subject: 'Warmup Email',
          emailBody: '<p>This is a warmup email.</p>',
        };

        const mailTransporter = nodemailer.createTransport({
          host: emailDetails.host,
          port: emailDetails.port,
          secure: true,
          auth: {
            user: emailDetails.email,
            pass: emailDetails.appPassword,
          },
        });

        const details = {
          from: {
            name: emailDetails.fromName,
            address: emailDetails.fromEmail,
          },
          to: emailDetails.to,
          subject: emailDetails.subject,
          html: emailDetails.emailBody,
        };

        try {
          await mailTransporter.sendMail(details);
          const emailRecord = new Email({ ...emailDetails, status: 'sent' });
          await emailRecord.save();
          config.lastSent = now;
          await config.save();
        } catch (err) {
          console.log(err);
          const emailRecord = new Email({ ...emailDetails, status: 'failed' });
          await emailRecord.save();
        }
      }
    });
  });
};

module.exports = { scheduleWarmupEmails };
