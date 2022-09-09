const ProjectController = require("../controllers/projectController");
const router = require("express").Router();

router.get("/", ProjectController.getProject);
router.get("/:projectId", ProjectController.getProjectById);
router.post("/", ProjectController.createProject);

module.exports = router;
