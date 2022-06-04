const Airliner = require('./Airliner');
const Inspector = require('./Inspector');
const Manager = require('./Manager');
const Project = require('./Project');
const Technician = require('./Technician');



Manager.hasMany(Project, {
  foreignKey: 'manager_id',
  onDelete: 'CASCADE',
});

Technician.belongsTo(Project, {
  foreignKey: 'user_id',
});

module.exports = {Project ,Technician, Manager, Inspector, Airliner };
