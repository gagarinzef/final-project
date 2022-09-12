const { Project, UserProject, Task, User, Chat } = require("../models");

class ChatController {
    static async listChat(req, res, next) {
        try {
            let chats = await Chat.findAll({
                include: {
                    all: true,
                    nested: true
                },
                order: ['id']
            })
            res.status(200).json(chats)

        } catch (error) {
            console.log(error)
        }
    }

    static async createChat(req, res, next) {
        try {
            console.log("create chat here")
            const { project_id, user_id, chat } = req.body
            console.log(req.body)
            const response = await Chat.create({
                ProjectId: project_id,
                UserId: user_id,
                chat: chat
            })

            res.status(201).json(response)

        } catch (error) {
            console.log(error)
        }
    }

}


module.exports = ChatController