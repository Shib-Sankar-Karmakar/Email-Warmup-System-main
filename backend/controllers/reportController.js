



const Email = require('../models/email').Email;

const getEmailStats = async (req, res) => {
  try {
    const stats = await Email.aggregate([
      {
        $group: {
          _id: '$status',  // Group by the status field in the Email model (e.g., 'sent', 'failed')
          count: { $sum: 1 },  // Count the number of occurrences for each status
        },
      },
    ]);
    res.status(200).json(stats);  // Return stats as a JSON response
  } catch (err) {
    res.status(500).send('Failed to fetch email stats');
  }
};

module.exports = { getEmailStats };
