const { connection } = require('mongoose');
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
