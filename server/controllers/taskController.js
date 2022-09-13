const { Task, User, Project } = require("../models");
const assignEmail = require("../helpers/assignEmail");
const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 3002 });

class TaskController {
  static async findAllTaskByUserId(req, res, next) {
    try {
      // const UserId = req.user.id;
      const task = await Task.findAll({
        where: { ProjectId: 1 },
        include: User, // nanti dinamis dari req.params project di client
        order: [["ProjectId", "DESC"]],
      });
      if (!task.length) throw { name: "notFound" };
      res.status(200).json(task);
    } catch (error) {
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
    const { id, status, title, color, date } = req.body;
    try {
      // const response = await Task.update(
      //   {
      //     id,
      //     status,
      //     title,
      //     color,
      //     date,
      //   },
      //   {
      //     where: {
      //       id,
      //     },
      //   }
      // );
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
      const { title, ProjectId, date, color } = req.body;
      // const user = await User.findOne({ where: { email } });
      // const project = await Project.findByPk(ProjectId);
      console.log(req.body);
      const task = await Task.create({
        ProjectId: 1, // sementara nanti dinamis tergantung lg di project id berapa
        // UserId: user.id,
        status: "On Progress",
        title,
        date,
        color,
      });

      res.status(201).json({
        message: "Success Create Task",
        id: task.id,
        title: task.title,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateTask(req, res, next) {
    try {
      console.log("masuk");
      const { title, date, color, UserId, TaskId, ProjectId } = req.body;
      let response = {
        message: "Success Update Task",
      };

      if (title) {
        await Task.update({ title }, { where: { id: +TaskId } });
      }

      if (date) {
        await Task.update({ date }, { where: { id: +TaskId } });
      }

      if (color) {
        await Task.update({ color }, { where: { id: +TaskId } });
      }

      if (UserId) {
        const user = await User.findByPk(+UserId);
        if (!user) throw { name: "userNotFound" };
        const project = await Project.findByPk(+ProjectId);
        if (!project) throw { name: "notFound" };
        const task = await Task.findByPk(+TaskId);
        if (!task) throw { name: "notFound" };

        await Task.update({ UserId }, { where: { id: +TaskId } });

        const obj = {
          task: task.title,
          username: user.username,
          email: user.email,
          project: project.name,
          ProjectId,
        };

        // Send Email
        await assignEmail(obj);

        response.status = "Invitation has been sent";
      }

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async deleteTask(req, res, next) {
    try {
      const { TaskId } = req.body;
      const task = await Task.findByPk(TaskId);
      if (!task) throw { name: "notFound" };
      await Task.destroy({ where: { id: +TaskId } });
      res.status(200).json({ message: "Success Delete Task" });
    } catch (error) {
      next(error);
    }
  }

  static async getById(req, res, next) {
    try {
      const { taskId } = req.params;
      const task = await Task.findByPk(+taskId);
      if (!task) throw { name: "notFound" };
      res.status(200).json(task);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = TaskController;
