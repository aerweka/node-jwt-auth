const { Router } = require("express");
const {
    get,
    getById,
    create,
    update,
    softDelete,
    hardDelete
} = require("../controllers/bookController");

const uploadUtil = require("../utils/uploadImg")
const router = Router()

router.get("/", get)
router.get("/:id", getById)
router.post("/", uploadUtil('books/cover').single('cover_img'), create)
router.patch("/:id", update)
router.delete("/soft/:id", softDelete)
router.delete("/hard/:id", hardDelete)

module.exports = router