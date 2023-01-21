module.exports = (sequelize, Sequelize) => {
    const Book = sequelize.define("books", {
        title: {
            type: Sequelize.STRING,
        },
        price: {
            type: Sequelize.BIGINT,
        },
        pages: {
            type: Sequelize.INTEGER
        },
        author_id: {
            type: Sequelize.INTEGER
        },
        is_deleted: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
    })

    return Book
}