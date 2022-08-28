const { Airliner } = require('../models');

module.exports = {
  async getAllAirliner(req, res) {
    const allAirliner = await Airliner.find({});

    if (!allAirliner) {
      return res.status(400).json({ message: 'No airliners were found' });
    }
    res.status(200).json(allAirliner);
  },
};
