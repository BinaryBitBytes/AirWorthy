import { connectDB } from '../../config/connection.js'
import express from 'express'
import fs from 'fs'
import { 
  AirlinerModel,
  InspectorModel,
  ManagerModel,
  ProjectModel,
  TechnicianModel,
  AuthModel,
  ProjectDataModel } from '../models/index.js'
import { 
  Airliner_jsonString,
  inspectorData,
  managerData,
  projectData,
  technicianData,
  authData,
  projectDataData  } from './index.js'

const app = express();
connectDB('open', async () => {
  async function seedDB () {
    await app.use(express.json()) //! Team Stuxtnet2 does this go here or below?
    // seeding the airliners
    async function airlinerSeed () { 
      await AirlinerModel.deleteMany({});
      const airlinerData = JSON.parse(fs.readFileSync('C:\\Users\\Miles\\Documents\\GIT\\AirWorthy\\server\\src\\data\\airlinerData.json', 'utf-8'))
      await AirlinerModel.insertMany(Airliner_jsonString);
      console.log('Airliners seeded!')
    }
    // seeding the inspectors
    async function inspectorSeed () { 
      await InspectorModel.deleteMany({});
      const airlinerData = JSON.parse(fs.readFileSync('C:\\Users\\Miles\\Documents\\GIT\\AirWorthy\\server\\src\\data\\inspectorData.json', 'utf-8'))
      await InspectorModel.insertMany(inspectorData);
      console.log('Inspectors seeded!')
    }
    // seeding the managers
    async function managerSeed () { 
      await ManagerModel.deleteMany({});
      const airlinerData = JSON.parse(fs.readFileSync('C:\\Users\\Miles\\Documents\\GIT\\AirWorthy\\server\\src\\data\\managerData.json', 'utf-8'))
      await ManagerModel.insertMany(managerData);
      console.log('Managers seeded!')
    }
    // seeding the projects
    async function projectSeed () { 
      await ProjectModel.deleteMany({});
      const airlinerData = JSON.parse(fs.readFileSync('C:\\Users\\Miles\\Documents\\GIT\\AirWorthy\\server\\src\\data\\projectData.json', 'utf-8'))
      await ProjectModel.insertMany(projectData);
      console.log('Projects seeded!')
    }
    // seeding the technicians
    async function technicianSeed () { 
      await TechnicianModel.deleteMany({});
      const airlinerData = JSON.parse(fs.readFileSync('C:\\Users\\Miles\\Documents\\GIT\\AirWorthy\\server\\src\\data\\technicianData.json', 'utf-8'))
      await TechnicianModel.insertMany(technicianData);
      console.log('Technicians seeded!')
    }
    // seeding the auth
    async function authSeed () { 
      await AuthModel.deleteMany({});
      const airlinerData = JSON.parse(fs.readFileSync('C:\\Users\\Miles\\Documents\\GIT\\AirWorthy\\server\\src\\data\\authData.json', 'utf-8'))
      await AuthModel.insertMany(authData);
      console.log('Auth seeded!')
    }
    // seeding the project-data
    async function projectDataSeed () { 
      await ProjectDataModel.deleteMany({});
      const airlinerData = JSON.parse(fs.readFileSync('C:\\Users\\Miles\\Documents\\GIT\\AirWorthy\\server\\src\\data\\projectDataData.json', 'utf-8'))
      await ProjectDataModel.insertMany(projectDataData);
      console.log('Project Data seeded!')
    }
    await airlinerSeed();
    await inspectorSeed();
    await managerSeed();
    await projectSeed();
    await technicianSeed();
    await authSeed();
    await projectDataSeed();
    console.log(`Database seeding is complete.`)
    // To recognize incoming request as JSON object
    // // app.use(express.json()); //! Team Stuxtnet2 does this go here or below?
    //! ^ 5/14/23 moved to top of this stacked function
  };

  seedDB()
  process.exit(0)
})
