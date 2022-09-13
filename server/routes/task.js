const router = require("express").Router();
const TaskController = require("../controllers/taskController");

// Create Task
router.post("/", TaskController.createTask);
// Update task buat kanban (gw blm tau bisa sama ap ngga sama update yg biasa, krn cara update di controllernya ga kaya update biasa)
router.put("/", TaskController.updateTaskKanban);
// Update Task
router.patch("/:taskId", TaskController.updateTask);
// Delete Task
router.delete("/:taskId", TaskController.deleteTask);
// Get Task By ID
router.get("/:taskId", TaskController.getById);

router.get("/project/:projectId", TaskController.findAllTaskByProjectId);
module.exports = router;
