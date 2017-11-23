const EntertainMe = require('../models/EntertainMe');

const EntertainMeController = {
  flushCache: (req, res) => {
    EntertainMe.flushCache();
    res.status(200).json({
      message: 'Redis cache flushed'
    });
  },
  fetchEntertainments: async (req, res) => {
    try {
      const entertainments = await EntertainMe.fetchEntertainments();
      res.status(200).json(entertainments);
    } catch (err) {
      res.status(400).json(err);
    }
  },
};

module.exports = EntertainMeController;
