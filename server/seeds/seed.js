const db = require('../config/connection');
const { Airliner, Inspector, Manager, Project, Technician } = require('../models');
const airlinerData = require('./airlinerData.json');
const inspectorData = require('./inspectorData.json');
const managerData = require('./managerData.json');
const projectData = require('./projectData.json');
const technicianData = require('./technicianData.json');

  // await Airliner.deleteMany({});
  // await Inspector.deleteMany({});
  // await Manager.deleteMany({});
  // await Project.deleteMany({});
  // await Technician.deleteMany({});

db.once('open', async () => {
  
  seedDB(){
  //seeding the airliners
  async function airliner(){await Airliner.insertMany(airlinerData)};
  console.log('Airliners seeded!');
  //seeding the inspectors
  async function  inspector(){await Inspector.insertMany(inspectorData)};
  console.log('Inspectors seeded!');
  //seeding the managers
  async function  manager(){await Manager.insertMany(managerData)};
  console.log('Managers seeded!');
  //seeding the projects
  async function  project(){await Project.insertMany(projectData)};
  console.log('Projects seeded!');
  //seeding the technicians
  async function technician(){await Technician.insertMany(technicianData)};
  console.log('Technicians seeded!');
  // To recognize incoming request as JSON object
  app.use(express.json()); //! Team Stuxtnet2 does this go here or below?
  }

  seedDB(airliner,inspector,manager,project, technician);
  process.exit(0);
});
