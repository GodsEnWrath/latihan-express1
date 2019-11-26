const express = require("express");
const router = express.Router();

const todoController = require("./controller");

router.get("/", todoController.getAll);
router.get("/", todoController.getById)
router.delete("/:id", todoController.deleteOne)

module.exports = router;
