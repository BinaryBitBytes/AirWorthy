const db = require('../config/connection');
const { Airliner, Inspector, Manager, Project, Technician } = require('../models');

const techData = require('./techData.json');

db.once('open', async () => {
  await /*Tech.deleteMany*/({});

  //const technologies = await Tech.insertMany(techData);

  console.log('Technologies seeded!');
  process.exit(0);
});
