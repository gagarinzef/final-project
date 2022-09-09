const UserProjectController = require("../controllers/userProjectController");
const router = require("express").Router();

// Sent Invitation Email
router.post("/", UserProjectController.inviteUser);

// Accept Invitation
router.post("/accept", UserProjectController.acceptInvite);


module.exports = router;