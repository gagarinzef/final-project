const router = require("express").Router();
const TaskController = require("../controllers/taskController");
const authentication = require("../middleware/authentication");

// router.use(authentication);
// Get Task
router.get("/", TaskController.findAllTaskByUserId);
// Create Task
router.post("/", TaskController.createTask);
// Update task buat kanban (gw blm tau bisa sama ap ngga sama update yg biasa, krn cara update di controllernya ga kaya update biasa)
router.put("/", TaskController.updateTaskKanban);
// Update Task
router.patch("/", TaskController.updateTask);
// Delete Task
router.delete("/", TaskController.deleteTask)
// Get Task By ID
router.get("/:taskId", TaskController.getById)
module.exports = router;
