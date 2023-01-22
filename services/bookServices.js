const db = require("../models")
const Book = db.books
const Op = db.Sequelize.Op
const response = require("../utils/responseTemplate");

const get = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.iLike]: `%${title}%` }, is_deleted: false } : { is_deleted: false };

    Book.findAll({ where: condition })
        .then(data => {
            res.status(200).send(response(data, "", 200))
        })
        .catch(err => {
            res.status(500).send(response(null, err.message || "Some error occurred while retrieving book", 500))
        });
}

const getById = (req, res) => {
    const id = req.params.id

    Book.findByPk(id)
        .then(data => {
            if (data) {
                res.status(200).send(response(data, "", 200))
            } else {
                res.status(404).send(response(null, "Cannot find book with inserted id", 404))
            }
        })
        .catch(err => {
            res.status(500).send(response(null, err.message || "Some error occurred while creating book", 500))
        })
}

const create = (req, res) => {
    const { title, price, pages, author_id } = req.body

    if (!title) return res.status(400).send(response(null, "Please insert the title", 400))

    if (!price) return res.status(400).send(response(null, "Please insert the price", 400))

    if (!pages) return res.status(400).send(response(null, "Please insert the pages", 400))

    if (!author_id) return res.status(400).send(response(null, "Please insert the author", 400))


    Book.create(req.body)
        .then(data => {
            res.status(201).send(response(data, "Book inserted successfully", 201))
        }).catch(err => {
            res.status(500).send(response(null, err.message || "Some error occurred while creating book", 500))
        })
}

const update = (req, res) => {
    const id = req.params.id

    Book.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.status(201).send(response(null, "Book updated successfully", 201))
            } else {
                res.status(404).send(response(null, "Cannot find book with inserted id", 404))
            }
        })
        .catch(err => {
            res.status(500).send(response(null, err.message || "Some error occurred while updating book", 500))
        });
}

const softDelete = (req, res) => {
    const id = req.params.id

    Book.update({ is_deleted: true }, { where: { id: id } })
        .then(num => {
            if (num == 1) {
                res.status(201).send(response(null, "Book deleted successfully", 201))
            } else {
                res.status(404).send(response(null, "Cannot find book with inserted id", 404))
            }
        })
        .catch(err => {
            res.status(500).send(response(null, err.message || "Some error occurred while deleting book", 500))
        })
}

const hardDelete = (req, res) => {
    const id = req.params.id

    Book.destroy({ where: { id: id } })
        .then(num => {
            if (num == 1) {
                res.status(201).send(response(null, "Book deleted successfully", 201))
            } else {
                res.status(404).send(response(null, "Cannot find book with inserted id", 404))
            }
        })
        .catch(err => {
            res.status(500).send(response(null, err.message || "Some error occurred while deleting book", 500))
        })
}

module.exports = { get, getById, create, update, softDelete, hardDelete }