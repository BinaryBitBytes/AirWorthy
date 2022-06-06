const db = require('../config/connection');
const { Airliner, Inspector, Manager, Project, Technician } = require('../models');

const airlinerData = require('./airlinerData.json');
const inspectorData = require('./inspectorData.json');
const managerData = require('./managerData.json');
const projectData = require('./projectData.json');
const technicianData = require('./technicianData.json');
//sourced from stackOverflow line 11 mongoose.connect
//https://stackoverflow.com/questions/61897268/trying-to-seed-db-with-mongoose-looping-over-json-while-adding-relational-data
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/app", { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false })

db.once('open', async () => {
  //!-- await /*Tech.deleteMany*/({});

  //seeding the airliners
  const airliner = await Airliner.insertMany(airlinerData);
  console.log('Airliners seeded!');
  //seeding the inspectors
  const inspector = await Inspector.insertMany(inspectorData);
  console.log('Inspectors seeded!');
  //seeding the managers
  const manager = await Manager.insertMany(managerData);
  console.log('Managers seeded!');
  //seeding the projects
  const project = await Project.insertMany(projectData);
  console.log('Projects seeded!');
  //seeding the technicians
  const technician = await Technician.insertMany(technicianData);
  console.log('Technicians seeded!');

  process.exit(0);
});
