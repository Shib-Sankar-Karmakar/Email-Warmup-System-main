const WarmupConfig = require('../models/email').WarmupConfig;

const setWarmupConfig = async (req, res) => {
  const { userEmail, emailsPerDay, intervalMinutes, gradualIncrease } = req.body;
  try {
    const config = new WarmupConfig({ userEmail, emailsPerDay, intervalMinutes, gradualIncrease });
    await config.save();
    res.status(200).send('Warmup configuration saved successfully');
  } catch (err) {
    res.status(500).send('Failed to save warmup configuration');
  }
};

module.exports = { setWarmupConfig };
