import {Airliner} from './Airliner.js';
import {Inspector} from './Inspector.js';
import {Manager} from './Manager.js';
import {Project} from './Project.js';
import {Technician} from './Technician.js';
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
