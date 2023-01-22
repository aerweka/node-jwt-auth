module.exports = (sequelize, Sequelize) => {
    const Author = sequelize.define("authors", {
        name: {
            type: Sequelize.STRING,
        },
        is_deleted: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
    })

    return Author
}