const { Project } = require('../models');

module.exports = {
  async getAllProject(req, res) {
    const allProject = await Project.find({});

    if (!allProject) {
      return res.status(400).json({ message: 'No projects were found' });
    }
    res.status(200).json(allProject);
  },
};
