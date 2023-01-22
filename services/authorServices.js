const db = require("../models")
const Author = db.author
const Op = db.Sequelize.Op
const response = require("../utils/responseTemplate");

const get = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.iLike]: `%${title}%` }, is_deleted: false } : { is_deleted: false };

    Author.findAll({ where: condition })
        .then(data => {
            res.status(200).send(response(data, "", 200))
        })
        .catch(err => {
            res.status(500).send(response(null, err.message || "Some error occurred while retrieving author", 500))
        });
}

const getById = (req, res) => {
    const id = req.params.id

    Author.findByPk(id)
        .then(data => {
            if (data) {
                res.status(200).send(response(data, "", 200))
            } else {
                res.status(404).send(response(null, "Cannot find Author with inserted id", 404))
            }
        })
        .catch(err => {
            res.status(500).send(response(null, err.message || "Some error occurred while creating author", 500))
        })
}

const create = (req, res) => {
    const { name } = req.body

    if (!name) {
        res.status(400).send(response(null, "Please insert the name", 400))
        return
    }

    Author.create(req.body)
        .then(data => {
            res.status(201).send(response(data, "Author inserted successfully", 201))
        }).catch(err => {
            res.status(500).send(response(null, err.message || "Some error occurred while creating Author", 500))
        })
}

const update = (req, res) => {
    const id = req.params.id

    Author.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.status(201).send(response(null, "Author updated successfully", 201))
            } else {
                res.status(404).send(response(null, "Cannot find Author with inserted id", 404))
            }
        })
        .catch(err => {
            res.status(500).send(response(null, err.message || "Some error occurred while updating Author", 500))
        });
}

const softDelete = (req, res) => {
    const id = req.params.id

    Author.update({ is_deleted: true }, { where: { id: id } })
        .then(num => {
            if (num == 1) {
                res.status(201).send(response(null, "Author deleted successfully", 201))
            } else {
                res.status(404).send(response(null, "Cannot find Author with inserted id", 404))
            }
        })
        .catch(err => {
            res.status(500).send(response(null, err.message || "Some error occurred while deleting Author", 500))
        })
}

const hardDelete = (req, res) => {
    const id = req.params.id

    Author.destroy({ where: { id: id } })
        .then(num => {
            if (num == 1) {
                res.status(201).send(response(null, "Author deleted successfully", 201))
            } else {
                res.status(404).send(response(null, "Cannot find Author with inserted id", 404))
            }
        })
        .catch(err => {
            res.status(500).send(response(null, err.message || "Some error occurred while deleting Author", 500))
        })
}

module.exports = { get, getById, create, update, softDelete, hardDelete }