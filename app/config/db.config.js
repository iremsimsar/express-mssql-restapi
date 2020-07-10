const Sequelize = require('sequelize');

const sequelize = new Sequelize('SampleDB', 'root', 'hmt123456', { //database,username,password
host: "localhost",
dialect: "mssql",
port: 1433,
dialectOptions: {
  instanceName: "SQLEXPRESS"
},  
  },
);

const db = {};


db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.user = require('../model/user.model.js')(sequelize, Sequelize);
db.role = require('../model/role.model.js')(sequelize, Sequelize);
db.note = require('../model/note.model.js')(sequelize, Sequelize);
 

db.role.belongsToMany(db.user, { through: 'user_roles', foreignKey: 'roleId', otherKey: 'userId'});
db.user.belongsToMany(db.role, { through: 'user_roles', foreignKey: 'userId', otherKey: 'roleId'});

module.exports = db;