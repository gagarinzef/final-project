const { Task, User, Project } = require("../models");
const assignEmail = require("../helpers/assignEmail");
const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 3002 });

class TaskController {
  static async findAllTaskByProjectId(req, res, next) {
    const { projectId } = req.params;
    try {
      const task = await Task.findAll({
        where: { ProjectId: projectId },
        include: User,
      });
      if (!task.length) throw { name: "notFound" };
      res.status(200).json(task);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  // UPDATE TASK BUAT KANBAN
  static async updateTaskKanban(req, res, next) {
    let arr = [];
    for (const key in req.body) {
      req.body[key].items.map((el) => {
        el.status = req.body[key].name;
        el.color = req.body[key].color;
        el.updatedAt = new Date();
      });
      arr.push(req.body[key]);
    }
    try {
      await Task.bulkCreate(arr[0].items, {
        updateOnDuplicate: [
          "date",
          "title",
          "id",
          "status",
          "color",
          "updatedAt",
        ],
      }); //unstarted

      await Task.bulkCreate(arr[1].items, {
        updateOnDuplicate: [
          "date",
          "title",
          "id",
          "status",
          "color",
          "updatedAt",
        ],
      }); //in progress

      await Task.bulkCreate(arr[2].items, {
        updateOnDuplicate: [
          "date",
          "title",
          "id",
          "status",
          "color",
          "updatedAt",
        ],
      }); //completed

      wss.clients.forEach((ws) => ws.send("updated"));
      res.status(200).json({ message: "Item updated" });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async createTask(req, res, next) {
    try {
      console.log(req.body);
      const task = await Task.create({
        ...req.body,
        status: "On Progress",
        color: "#D7A463",
      });

      res.status(201).json({
        message: "Task created",
        id: task.id,
        title: task.title,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateTask(req, res, next) {
    try {
      const { UserId, ProjectId, status, title, date, color } = req.body;
      console.log(req.body);
      const { taskId } = req.params;
      let response = {
        message: "Task updated",
      };
      const task = await Task.findByPk(+taskId);
      if (!task) throw { name: "notFound" };

      await Task.update(
        { status, title, date, color, UserId },
        { where: { id: +taskId } }
      );

      if (UserId) {
        const user = await User.findByPk(+UserId);
        if (!user) throw { name: "userNotFound" };
        console.log(+UserId, task.UserId);
        if (+UserId !== task.UserId) {
          const project = await Project.findByPk(+ProjectId);
          if (!project) throw { name: "notFound" };
          await Task.update({ UserId }, { where: { id: +taskId } });

          const obj = {
            task: task.title,
            username: user.username,
            email: user.email,
            project: project.name,
            ProjectId,
          };

          // Send Email
          assignEmail(obj);
          response.status = "Invitation has been sent";
        }
      }
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async deleteTask(req, res, next) {
    try {
      const { taskId } = req.params;
      const task = await Task.findByPk(taskId);
      if (!task) throw { name: "notFound" };
      await Task.destroy({ where: { id: +taskId } });
      res.status(200).json({ message: "Task deleted" });
    } catch (error) {
      next(error);
    }
  }

  static async getById(req, res, next) {
    try {
      const { taskId } = req.params;
      const task = await Task.findByPk(+taskId, {
        include: {
          model: User,
          attributes: ["id", "username", "email"],
        },
      });
      if (!task) throw { name: "notFound" };
      res.status(200).json(task);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = TaskController;
