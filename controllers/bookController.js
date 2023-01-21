const bookService = require("../services/bookServices")

const get = (req, res) => {
    bookService.get(req, res)
}

const getById = (req, res) => {
    bookService.getById(req, res)
}

const create = (req, res) => {
    bookService.create(req, res)
}

const update = (req, res) => {
    bookService.update(req, res)
}

const softDelete = (req, res) => {
    bookService.softDelete(req, res)
}

const hardDelete = (req, res) => {
    bookService.hardDelete(req, res)
}

module.exports = { get, getById, create, update, softDelete, hardDelete }