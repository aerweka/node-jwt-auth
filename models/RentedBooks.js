module.exports = (sequelize, Sequelize) => {
    const RentedBooks = sequelize.define('rented_books', {
        rent_id: {
            type: Sequelize.UUID,
            references: {
                model: 'rents',
                key: 'id'
            },
            primaryKey: true
        },
        book_id: {
            type: Sequelize.UUID,
            references: {
                model: 'books',
                key: 'id'
            }
        },
        is_returned: {
            type: Sequelize.DATE,
        }
    })

    return RentedBooks
}