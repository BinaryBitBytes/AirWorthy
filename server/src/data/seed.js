import mongoose from 'mongoose'
import { connectDB } from '../../config/connection.js'
import path from 'path'
import express from 'express'
import fs from 'fs'
// import { 
//   AirlinerModel,
//   InspectorModel,
//   ManagerModel,
//   ProjectModel,
//   TechnicianModel,
//   AuthModel,
//   ProjectDataModel } from '../models/index.js'
// import { 
//   Airliner_jsonString,
//   Inspector_jsonString,
//   Manager_jsonString,
//   ProjectData_jsonString,
//   Technician_jsonString,
//   AuthData_jsonString,
//   ProjectData_Data_jsonString  } from './json_String_index.js'
  import {
    AirlinerData,
    InspectorData,
    ManagerData,
    ProjectData,
    TechnicianData,
    AuthData,
    ProjectData_Data 
} from './index.js'
import models from '../models/index.js'
const airliner = new models.AirlinerModel();
const inspector = new models.InspectorModel();
const manager = new models.ManagerModel();
const project = new models.ProjectModel();
const technician = new models.TechnicianModel();
const auth = new models.AuthModel();
const projectData = new models.ProjectDataModel();

const app = express();
app.use(express.json())
connectDB(async () => {
  async function seedDB () {
    try {
      //clear any existing data from the collections
      await Promise.all(
        Object.values(mongoose.connection.collections).map(async (collection) => {
        await collection.deleteMany();
        })
      )
      //Read seed data from the JSON files
      const seedDataPath = path.join(__dirname, 'data');
      const fileNames = fs.readdirSync(seedDataPath);

      // Now inserting seed data into the database
      fileNames.forEach((fileName) => {
        const filePath = path.join(seedDataPath, fileName);
        const seedData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        const modelName = fileName.split('.')[0];
        const Model = mongoose.model(modelName);
        Model.insertMany(seedData);
      });
      // seeding the airliners
      async function airlinerSeed () { 
        await airliner.deleteMany({});
        const AirlinerDataRead = JSON.parse(fs.readFileSync('C:\\Users\\Miles\\Documents\\GIT\\AirWorthy\\server\\src\\data\\airlinerData.json', 'utf-8'))
        await airliner.insertMany(AirlinerData);
        console.log('Airliners seeded!')
      }
      // seeding the inspectors
      async function inspectorSeed () { 
        await inspector.deleteMany({});
        const InspectorDataRead = JSON.parse(fs.readFileSync('C:\\Users\\Miles\\Documents\\GIT\\AirWorthy\\server\\src\\data\\inspectorData.json', 'utf-8'))
        await inspector.insertMany(InspectorData);
        console.log('Inspectors seeded!')
      }
      // seeding the managers
      async function managerSeed () { 
        await manager.deleteMany({});
        const ManagerDataRead = JSON.parse(fs.readFileSync('C:\\Users\\Miles\\Documents\\GIT\\AirWorthy\\server\\src\\data\\managerData.json', 'utf-8'))
        await manager.insertMany(ManagerData);
        console.log('Managers seeded!')
      }
      // seeding the projects
      async function projectSeed () { 
        await project.deleteMany({});
        const ProjectDataRead = JSON.parse(fs.readFileSync('C:\\Users\\Miles\\Documents\\GIT\\AirWorthy\\server\\src\\data\\projectData.json', 'utf-8'))
        await project.insertMany(ProjectData);
        console.log('Projects seeded!')
      }
      // seeding the technicians
      async function technicianSeed () { 
        await technician.deleteMany({});
        const TechnicianDataRead = JSON.parse(fs.readFileSync('C:\\Users\\Miles\\Documents\\GIT\\AirWorthy\\server\\src\\data\\technicianData.json', 'utf-8'))
        await technician.insertMany(TechnicianData);
        console.log('Technicians seeded!')
      }
      // seeding the auth
      async function authSeed () { 
        await auth.deleteMany({});
        const AuthDataRead = JSON.parse(fs.readFileSync('C:\\Users\\Miles\\Documents\\GIT\\AirWorthy\\server\\src\\data\\authData.json', 'utf-8'))
        await auth.insertMany(AuthData);
        console.log('Auth seeded!')
      }
      // seeding the project-data
      async function projectDataSeed () { 
        await projectData.deleteMany({});
        const ProjectData_DataRead = JSON.parse(fs.readFileSync('C:\\Users\\Miles\\Documents\\GIT\\AirWorthy\\server\\src\\data\\projectDataData.json', 'utf-8'))
        await projectData.insertMany(ProjectData_Data);
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

      console.log('Database has been seeded');
      process.exit(0);
    } catch (error) {
      console.error('Error while seeding the Database', error);
      process.exit(1);
    }
  };

  await seedDB()
  process.exit(0)
})
