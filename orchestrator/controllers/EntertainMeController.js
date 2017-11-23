const EntertainMe = require('../models/EntertainMe');

const EntertainMeController = {
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
