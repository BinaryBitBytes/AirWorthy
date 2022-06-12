const { Manager } = require('../models');

module.exports = {
  async getAllManager(req, res) {
    const allManager = await Manager.find({});

    if (!allManager) {
      return res.status(400).json({ message: 'No managers were found' });
    }
    res.status(200).json(allManager);
  },
};
