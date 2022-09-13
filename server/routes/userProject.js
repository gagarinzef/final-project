const UserProjectController = require("../controllers/userProjectController");
const router = require("express").Router();

// Sent Invitation Email
router.post("/", UserProjectController.inviteUser);

// Accept Invitation
router.post("/accept", UserProjectController.acceptInvite);

// Get User By Project
router.get("/:ProjectId", UserProjectController.getUserByProjectId);

module.exports = router;