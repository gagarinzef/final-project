const ChatController = require('../controllers/chatController')
const router = require("express").Router();

router.get("/", ChatController.listChat);

router.post('/', ChatController.createChat)


module.exports = router