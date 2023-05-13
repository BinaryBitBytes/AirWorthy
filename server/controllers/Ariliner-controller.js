const { Airliner } = require('../models');

module.exports = {
  async getAllAirliner(req, res) {
    const allAirliner = await Airliner.find({});

    if (!allAirliner) {
      return res.status(400).json({ message: 'No airliners were found' });
    }
    res.status(200).json(allAirliner); //5.12.23 possible bug fix, json() was previously set to allAriline changed to allAirliner
  },
};
