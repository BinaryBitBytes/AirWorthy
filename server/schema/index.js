const Airliner = require('./Airliner');
const Inspector = require('./Inspector');
const Manager = require('./Manager');
const Project = require('./Project');
const Technician = require('./Technician');

module.exports = {Airliner, Inspector, Manager, Project, Technician };

// Manager.hasMany(Doctor, {
//   foreignKey: 'manager_id',
//   onDelete: 'CASCADE',
// });

// Doctor.belongsTo(User, {
//   foreignKey: 'user_id',
// });

// module.exports = { User, Doctor };
