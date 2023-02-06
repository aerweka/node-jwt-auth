const user = require("./User");
module.exports = (sequelize, Sequelize) => {
    const Rent = sequelize.define("rents", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        user_id: {
            type: Sequelize.UUID,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        rent_hours: {
            type: Sequelize.INTEGER,
        },
        returning_timestamps: {
            type: Sequelize.DATE
        },
        is_deleted: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
    })
    // .belongsTo(user)
    Rent.associate = models => {
        Rent.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        })

        Rent.belongsToMany(models.Book, {
            through: models.RentedBooks
        })
    }

    return Rent
}