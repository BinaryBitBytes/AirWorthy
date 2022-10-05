//per stackoverflow
//! https://stackoverflow.com/questions/9230932/file-structure-of-mongoose-nodejs-project
const { connection } = require('mongoose');

'use strict'; //decleration of strictly expression declerations
const fs = require('fs'); //require the filesystem on my computer
const path = require('path'); //provides utilities for working with file and directory path
const mongoose = require('mongoose');//.set('debug', true);

//! Need To comprehend These
const basename  = path.basename(__filename);
///~~Example~~//
//! var filename = path.basename('/Users/Refsnes/demo_path.js', '.js');
//! console.log(filename);
const env = process.env.NODE_ENV || 'development'; // development environment
// const config    = require(__dirname + '/../config/config.json')[env]; //!Needs path configured
const db = {};
const Schema = mongoose.Schema;
fs
    .readdirSync(__dirname)
    .filter(fileName => {
        return (
            fileName.indexOf('.') !== 0) 
                    && (fileName !== basename) 
                    && (fileName.slice(-3) === '.js'
        );
    })
    .forEach(fileName => {
        const model = require(path.join(__dirname, fileName));
        const modelSchema = new Schema(model.schema);

        modelSchema.methods = model.methods;
        modelSchema.statics = model.statics;

        // user.js will be user now
        fileName = fileName.split('.')[0];
        db[fileName] = mongoose.model(fileName, modelSchema);
    });

module.exports = db;

////``````````````````````Old Code` Below`````````````````````````````````````


const { Airliner } = require('./Airliner');
//! Above is a commonJS import Below is a ES6 Import
// import { Airliner } from './Airliner';
const { Inspector} = require('./Inspector');
const { Manager } = require('./Manager');
const { Project } = require('./Project');
const { Technician } = require('./Technician');


//! Needs to go in controllers
//directive @connection(keyName: String, fields: [String!]) on FIELD_DEFINITION
// Event.hasMany(models.Person, { as: 'employees', scope: {type: 'EMPLOYEE'} ... })
// Event.hasMany(models.Person, { as: 'contractors', scope: {type: 'CONTRACTOR'} ... })
// Event.hasMany(models.Person, { as: 'people', /** no scope **/ ... })
// // Manager.hasMany(models.Project, { as: Manager, scope: {type: 'MANAGER'}
// // });

//  Manager.hasMany(Project, {
//    foreignKey: 'manager_id',
//    onDelete: 'CASCADE',
//  });

//  Technician.belongsTo(Project, {
//    foreignKey: 'user_id',
//  });

module.exports = {Airliner, Inspector, Manager, Project ,Technician};
