const mongoose = require('mongoose');

const emailSchema = new mongoose.Schema({
  fromName: String,
  fromEmail: String,
  to: String,
  subject: String,
  emailBody: String,
  status: String,
  createdAt: { type: Date, default: Date.now },
});

const warmupConfigSchema = new mongoose.Schema({
  userEmail: String,
  emailsPerDay: Number,
  intervalMinutes: Number,
  gradualIncrease: Number,
  lastSent: { type: Date, default: Date.now },
});

const Email = mongoose.model('Email', emailSchema);
const WarmupConfig = mongoose.model('WarmupConfig', warmupConfigSchema);

module.exports = { Email, WarmupConfig };
