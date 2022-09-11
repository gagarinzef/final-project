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
            const { data } = req.body

            const response = await Chat.create({
                ProjectId: data.project_id,
                UserId: data.user_id,
                chat: data.chat
            })

            res.status(201).json(response)

        } catch (error) {
            console.log(error)
        }
    }

}


module.exports = ChatController