const { Project, UserProject, Task, User, Chat } = require("../models");

class ChatController {
  static async listChat(req, res, next) {
    try {
      let chats = await Chat.findAll({
        include: {
          all: true,
          nested: true,
        },
        order: ["id"],
      });
      res.status(200).json(chats);
    } catch (error) {
      next(error);
    }
  }

  static async createChat(req, res, next) {
    try {
      const { project_id, user_id, chat } = req.body;
      const response = await Chat.create({
        ProjectId: project_id,
        UserId: user_id,
        chat: chat,
      });

      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ChatController;
