const { Project, UserProject, Task, User, Chat } = require("../models");
const { Op } = require("sequelize");

class ProjectController {
  static async createProject(req, res, next) {
    const { name } = req.body;
    const { id } = req.user;

    console.log(req.body);
    try {
      const data = await Project.create({
        name,
      });

      await UserProject.create({
        UserId: id,
        ProjectId: data.id,
        role: "leader",
      });

      res.status(201).json({ message: "Project created" });
    } catch (error) {
      // console.log(error);
      // next(error);
    }
  }

  static async getProject(req, res, next) {
    const { id } = req.user;
    try {
      const data = await UserProject.findAll({
        where: {
          UserId: id,
        },
        include: [Project],
      });
      res.status(200).json(data);
    } catch (error) {
      // next(error);
    }
  }

  static async getProjectChatById(req, res, next) {
    const { projectId } = req.params;
    const { id } = req.user;

    try {
      const data = await UserProject.findOne({
        where: {
          UserId: id,
          ProjectId: projectId,
        },
      });

      if (!data) throw { name: "forbidden" };

      const chat = await Chat.findAll({
        where: {
          ProjectId: projectId,
        },
        include: {
          model: User,
          attributes: {
            exclude: ["password", "token", "status"],
          },
        },
        order: [['createdAt', 'ASC']]
      });

      res.status(200).json({ chat });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async getProjectById(req, res, next) {
    const { projectId } = req.params;
    const { id } = req.user;
    try {
      let obj = {};
      let option = {};
      if (req.query.key) {
        const { start: startDate, end: endDate } = JSON.parse(req.query.key);
        if (startDate && endDate) {
          obj.createdAt = { [Op.between]: [startDate, endDate] };
        }

        if (obj.createdAt) {
          //kalo nilai konversi ada, maka where bisa diget
          option = { where: obj };
        }
      }
      const data = await UserProject.findOne({
        where: {
          UserId: id,
          ProjectId: projectId, // nanti ambil dr pramas project client
        },
      });

      if (!data) throw { name: "forbidden" };

      const project = await Project.findByPk(projectId, {
        include: {
          model: Task,
          ...option, // kondisional buat nyari between
          include: {
            model: User,
            attributes: {
              exclude: ["password", "token", "status"],
            },
          },
        },
        order: [[{ model: Task }, "id", "DESC"]],
      });

      const member = await UserProject.findAll({
        where: {
          ProjectId: projectId,
        },
        attributes: ["id", "UserId", "role"],
        include: {
          model: User,
          attributes: {
            exclude: ["password", "token", "status"],
          },
        },
      });

      res.status(200).json({ project, member });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async deleteProjectById(req, res, next) {
    try {
      const { projectId } = req.params;
      const findProject = await Project.findByPk(projectId);
      if (!findProject) throw { name: "notFound" };
      await Project.destroy({ where: { id: projectId } });
      res.status(200).json({ message: `${findProject.name} has been deleted` });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ProjectController;
