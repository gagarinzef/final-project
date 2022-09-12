const router = require("express").Router();
const TaskController = require("../controllers/taskController");
const authentication = require("../middlewares/authentication");

router.use(authentication);
// Get Task
router.get("/", TaskController.findAllTaskByUserId);
// Create Task
router.post("/", TaskController.createTask);
//Update Task
router.patch("/:taskId", TaskController.updateTask);

module.exports = router;
