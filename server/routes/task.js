const router = require("express").Router();
const TaskController = require("../controllers/taskController");
const authentication = require("../middleware/authentication");

router.use(authentication);
// Get Task
router.get("/", TaskController.findAllTaskByUserId);
// Create Task
router.post("/", TaskController.createTask);

module.exports = router;
