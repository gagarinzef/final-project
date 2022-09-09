const UserController = require("../controllers/userController");
const router = require("express").Router();

// Find All User
router.get("/", UserController.findAllUser);

// Register User
router.post("/", UserController.registerUser);

// Verify email user
router.get("/verify/:token", UserController.verifyUser); 

// Login USer
router.post("/login", UserController.loginUser);

module.exports = router;