const { Task } = require("../models");

class TaskController {
  static async findAllTaskByUserId(req, res, next) {
    try {
      // const UserId = req.user.id;
      const task = await Task.findAll({
        where: { ProjectId: 1 }, // nanti dinamis dari req.params project di client
        order: [["status", "DESC"]],
      });
      if (!task.length) throw { name: "notFound" };
      res.status(200).json(task);
    } catch (error) {
      next(error);
    }
  }

  // UPDATE TASK BUAT KANBAN
  static async updateTaskKanban(req, res, next) {
    // let arr = [];
    // for (const key in req.body) {
    //   req.body[key].items.map((el) => {
    //     el.status = req.body[key].name;
    //     el.color = req.body[key].color;
    //   });
    //   arr.push(req.body[key]);
    // }
    const { id, status, title, color, date } = req.body;
    try {
      const response = await Task.update(
        {
          id,
          status,
          title,
          color,
          date,
        },
        {
          where: {
            id,
          },
        }
      );
      // await Task.bulkCreate(arr[0].items, {
      //   updateOnDuplicate: ["date", "title", "id", "status", "color"],
      // }); //unstarted

      // await Task.bulkCreate(arr[1].items, {
      //   updateOnDuplicate: ["date", "title", "id", "status", "color"],
      // }); //in progress

      // await Task.bulkCreate(arr[2].items, {
      //   updateOnDuplicate: ["date", "title", "id", "status", "color"],
      // }); //completed

      res.status(200).json({ message: "Item updated" });
    } catch (error) {
      console.log(error);
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
        message: "Success Create Task",
        id: task.id,
        title: task.title,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = TaskController;
