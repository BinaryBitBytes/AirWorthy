import { once } from '../../config/connection';
import { Airliner, Inspector, Manager, Project, Technician } from '../models';
import airlinerData from './airlinerData.json';
import inspectorData from './inspectorData.json';
import managerData from './managerData.json';
import projectData from './projectData.json';
import technicianData from './technicianData.json';
once('open', async () => {

  async function seedDB() {
    app.use(express.json()); //! Team Stuxtnet2 does this go here or below?
    //seeding the airliners
    async function airliner() { await Airliner.insertMany(airlinerData) };
    console.log('Airliners seeded!');
    //seeding the inspectors
    async function inspector() { await Inspector.insertMany(inspectorData) };
    console.log('Inspectors seeded!');
    //seeding the managers
    async function manager() { await Manager.insertMany(managerData) };
    console.log('Managers seeded!');
    //seeding the projects
    async function project() { await Project.insertMany(projectData) };
    console.log('Projects seeded!');
    //seeding the technicians
    async function technician() { await Technician.insertMany(technicianData) };
    console.log('Technicians seeded!');
    // To recognize incoming request as JSON object
    // // app.use(express.json()); //! Team Stuxtnet2 does this go here or below?
    //! ^ 5/14/23 moved to top of this stacked function
  };

  seedDB(airliner, inspector, manager, project, technician);
  process.exit(0);
});
