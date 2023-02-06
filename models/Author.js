const book = require("./Book")
module.exports = (sequelize, Sequelize) => {
    const Author = sequelize.define("authors", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING,
        },
        is_deleted: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
    })
    // .hasMany(book)

    Author.associate = models => {
        Author.hasMany(models.Book, {
            onDelete: "cascade"
        })
    }

    return Author
}