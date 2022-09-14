const UserProjectController = require("../controllers/userProjectController");
const authentication = require("../middleware/authentication");
const router = require("express").Router();

// Accept Invitation
router.post("/accept", UserProjectController.acceptInvite);

// Authentication
router.use(authentication);

// Sent Invitation Email
router.post("/", UserProjectController.inviteUser);

// Get User By Project
router.get("/:ProjectId", UserProjectController.getUserByProjectId);

module.exports = router;