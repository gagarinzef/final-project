const ProjectController = require("../controllers/projectController");
const router = require("express").Router();

router.get("/", ProjectController.getProject);
router.get("/:projectId", ProjectController.getProjectById);
router.get("/:projectId/chat", ProjectController.getProjectChatById);
router.post("/", ProjectController.createProject);
router.delete("/:projectId", ProjectController.deleteProjectById);

module.exports = router;
