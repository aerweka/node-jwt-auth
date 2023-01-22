const dbConfig = require("../config/dbConnection")
const Sequelize = require("sequelize")

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize
db.books = require("./Book")(sequelize, Sequelize)
db.author = require("./Author")(sequelize, Sequelize)
db.user = require("./User")(sequelize, Sequelize)

module.exports = db