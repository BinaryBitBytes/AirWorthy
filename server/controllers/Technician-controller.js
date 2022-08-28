const { Technician } = require('../models');

module.exports = {
  async getAllTechnician(req, res) {
    const allTechnician = await Technician.find({});

    if (!allTechnician) {
      return res.status(400).json({ message: 'No technicians were found' });
    }
    res.status(200).json(allTechnician);
  },
};
