const express = require("express");
const router = express.Router();

const todoController = require("./controller");

router.get("/", todoController.getAll);
router.get("/:id", todoController.getById)
router.get("/email/:email", todoController.getByEmail);
router.delete("/:id", todoController.deleteOne)
router.delete("/", todoController.deleteAll)
router.post("/", todoController.addOne)
router.put("/:id", todoController.updateOne)
router.put("/email/:email", todoController.getByEmail);


module.exports = router;
