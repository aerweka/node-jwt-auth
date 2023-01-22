const authorService = require("../services/authorServices")

const get = (req, res) => {
    authorService.get(req, res)
}

const getById = (req, res) => {
    authorService.getById(req, res)
}

const create = (req, res) => {
    authorService.create(req, res)
}

const update = (req, res) => {
    authorService.update(req, res)
}

const softDelete = (req, res) => {
    authorService.softDelete(req, res)
}

const hardDelete = (req, res) => {
    authorService.hardDelete(req, res)
}

module.exports = { get, getById, create, update, softDelete, hardDelete }