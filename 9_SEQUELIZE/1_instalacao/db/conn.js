const { Sequelize } = require('sequelize')

// Banco = nodejssequelize2
const sequelize = new Sequelize('nodejssequelize2', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

// try{
//     sequelize.authenticate()
//     console.log('Conectado ao banco de dados mysql ')
// } catch(err) {
//     console.log('Não foi possível conectar: ', err)
// }

module.exports = sequelize