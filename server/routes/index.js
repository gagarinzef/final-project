const router = require("express").Router();
const userRouter = require("./user");
const taskRouter = require("./task");
const projectRouter = require("./project");
const userProjectRouter = require("./userProject");
const chatRouter = require('./chat')
const authentication = require("../middleware/authentication");

router.use("/users", userRouter);
// router.use(authentication);
router.use("/tasks", taskRouter);
router.use("/projects", projectRouter);
router.use("/userprojects", userProjectRouter);
router.use('/chat', chatRouter)

module.exports = router;
