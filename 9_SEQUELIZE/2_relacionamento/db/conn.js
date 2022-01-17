const { Sequelize } = require('sequelize')

// Banco = nodejssequelize2
const sequelize = new Sequelize('nodejssequelize2', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = sequelize