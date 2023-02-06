const bcrypt = require("bcrypt");
const rent = require("./Rent")
// const { isEmail } = require("validator");
module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
      unique: true
    },
    password: {
      type: Sequelize.STRING
    },
    role: {
      type: Sequelize.ENUM,
      values: ['admin', 'publisher', 'user'],
      defaultValue: 'user'
    },
    is_deleted: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    }
  }, {
    hooks: {
      beforeCreate: async (record, options) => {
        const salt = await bcrypt.genSalt();
        record.password = await bcrypt.hash(record.password, salt);
      }
    },
  })
  // .hasMany(rent)

  User.associate = models => {
    User.hasMany(models.Rent, {
      onDelete: "cascade"
    })
  }

  return User
}
