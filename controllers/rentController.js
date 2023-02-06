const rentService = require("../services/rentServices")

const get = (req, res) => {
    rentService.get(req, res)
}

const getById = (req, res) => {
    rentService.getById(req, res)
}

const create = (req, res) => {
    rentService.create(req, res)
}

const update = (req, res) => {
    rentService.update(req, res)
}

const softDelete = (req, res) => {
    rentService.softDelete(req, res)
}

const hardDelete = (req, res) => {
    rentService.hardDelete(req, res)
}

module.exports = { get, getById, create, update, softDelete, hardDelete }