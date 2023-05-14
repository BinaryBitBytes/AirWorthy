import Airliner from './Airliner';
import Inspector from './Inspector';
import Manager from './Manager';
import Project from './Project';
import Technician from './Technician';
//1.15.23 the constants above were wrapped in { } given the chat gpt example did not wrap these i removed them

//! Needs to go in controllers
// Manager.hasMany(Project, {
//   foreignKey: 'manager_id',
//   onDelete: 'CASCADE',
// });

// Technician.belongsTo(Project, {
//   foreignKey: 'user_id',
// });

export default {Airliner, Inspector, Manager, Project ,Technician};
