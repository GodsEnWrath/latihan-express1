const express = require("express");
const router = express.Router();

const todoController = require("./controller");

router.get("/", todoController.getAll);
router.get("/:id", todoController.getById)
router.delete("/:id", todoController.deleteOne)
router.delete("/", todoController.deleteAll)
router.post("/", todoController.addOne)
router.post("/login", todoController.login)
router.put("/:id", todoController.updateOne)


// const {
//     getAll,
//     getById,
//     deleteOne,
//     addOne,
//     updateOne
// } = require("./controller");

// router.get("/", getAll);
// router.get("/:id", getById);
// router.delete("/:id", deleteOne);
// router.post("/", addOne);
// router.put("/:id", updateOne);

module.exports = router;
