const db = require("../models")
const Rent = db.rent
const Op = db.Sequelize.Op
const response = require("../utils/responseTemplate");

const get = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.iLike]: `%${title}%` }, is_deleted: false } : { is_deleted: false };

    Rent.findAll({ where: condition })
        .then(data => {
            res.status(200).send(response(data, "", 200))
        })
        .catch(err => {
            res.status(500).send(response(null, err.message || "Some error occurred while retrieving rent", 500))
        });
}

const getById = (req, res) => {
    const id = req.params.id

    Rent.findByPk(id)
        .then(data => {
            if (data) {
                res.status(200).send(response(data, "", 200))
            } else {
                res.status(404).send(response(null, "Cannot find rent with inserted id", 404))
            }
        })
        .catch(err => {
            res.status(500).send(response(null, err.message || "Some error occurred while creating rent", 500))
        })
}

const create = (req, res) => {
    const { user_id, rent_hours, bookId } = req.body

    if (!user_id) return res.status(400).send(response(null, "Please insert the user id", 400))

    if (!rent_hours) return res.status(400).send(response(null, "Please insert the hours of rent", 400))

    if (!bookId.length > 0) return res.status(400).send(response(null, "Please insert the book which you want to rent", 400))

    Rent.create(req.body)
        .then(data => {
            for (let i = 0; i < bookId.length; i++) {
                db.rented_book.create({ rent_id: data.id, book_id: bookId[i] })
            }
            res.status(201).send(response(data, "Rent inserted successfully", 201))
        }).catch(err => {
            res.status(500).send(response(null, err.message || "Some error occurred while creating rent", 500))
        })
}

const update = (req, res) => {
    const id = req.params.id

    Rent.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.status(201).send(response(null, "Rent updated successfully", 201))
            } else {
                res.status(404).send(response(null, "Cannot find rent with inserted id", 404))
            }
        })
        .catch(err => {
            res.status(500).send(response(null, err.message || "Some error occurred while updating rent", 500))
        });
}

const returning = (req, res) => {
    const rentId = req.params.id
    const bookId = req.query.bookId

    db.rented_book.update({ returning_timestamps: Date.now() }, { where: { rent_id: rentId, book_id: bookId } })
        .then(num => {
            if (num == 1) {
                res.status(201).send(response(null, "Rent updated successfully", 201))
            } else {
                res.status(404).send(response(null, "Cannot find rent with inserted id", 404))
            }
        })
        .catch(err => {
            res.status(500).send(response(null, err.message || "Some error occurred while updating rent", 500))
        })
}

const softDelete = (req, res) => {
    const id = req.params.id

    Rent.update({ is_deleted: true }, { where: { id: id } })
        .then(num => {
            if (num == 1) {
                res.status(201).send(response(null, "Rent deleted successfully", 201))
            } else {
                res.status(404).send(response(null, "Cannot find rent with inserted id", 404))
            }
        })
        .catch(err => {
            res.status(500).send(response(null, err.message || "Some error occurred while deleting rent", 500))
        })
}

const hardDelete = (req, res) => {
    const id = req.params.id

    Rent.destroy({ where: { id: id } })
        .then(num => {
            if (num == 1) {
                res.status(201).send(response(null, "Rent deleted successfully", 201))
            } else {
                res.status(404).send(response(null, "Cannot find rent with inserted id", 404))
            }
        })
        .catch(err => {
            res.status(500).send(response(null, err.message || "Some error occurred while deleting rent", 500))
        })
}

module.exports = { get, getById, create, update, softDelete, hardDelete }