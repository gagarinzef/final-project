const { Task } = require("../models");

class TaskController {
  static async findAllTaskByUserId(req, res, next) {
    try {
      const UserId = req.user.id;
      const task = await Task.findAll({ where: { UserId } });
      if (!task.length) throw { name: "notFound" };
      res.status(200).json(task);
    } catch (error) {
      next(error);
    }
  }

  static async createTask(req, res, next) {
    try {
      const UserId = req.user.id;
      const { title, date, color, ProjectId } = req.body;
      const task = await Task.create({
        ProjectId: 1, // sementara nanti dinamis tergantung lg di project id berapa
        UserId,
        status: "Unprogress",
        title,
        date,
        color,
      });
      res.status(201).json({
        message: "succes create task",
        id: task.id,
        title: task.title,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = TaskController;
