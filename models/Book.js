const author = require("./Author")
module.exports = (sequelize, Sequelize) => {
    const Book = sequelize.define("books", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        title: {
            type: Sequelize.STRING,
        },
        price: {
            type: Sequelize.BIGINT,
        },
        pages: {
            type: Sequelize.INTEGER
        },
        cover_img: {
            type: Sequelize.STRING,
            allowNull: true
        },
        author_id: {
            type: Sequelize.UUID,
            references: {
                model: 'authors',
                key: 'id'
            }
        },
        is_deleted: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
    })
    // .belongsTo(author)

    Book.associate = models => {
        Book.belongsTo(models.Author, {
            foreignKey: {
                allowNull: false
            }
        })

        Book.belongsToMany(models.Rent, {
            through: models.RentedBooks
        })
    }

    return Book
}