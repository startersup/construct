const sequelize = require('sequelize');

module.exports = new sequelize('database_development','root','root',{
    host : '127.0.0.1',
    dialect :'mysql',
    operatorAliases :false,
    pool:{
        max : 5,
        min : 0,
        acquire : 30000,
        idle : 10000
    }
});