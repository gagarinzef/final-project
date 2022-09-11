const { Project, UserProject, Task, User } = require("../models");

class ProjectController {
  static async createProject(req, res, next) {
    const { name } = req.body;
    const { id } = req.user;

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
      // console.log(error);
      // next(error);
    }
  }

  static async getProjectById(req, res, next) {
    const { projectId } = req.params;
    const { id } = req.user;
    try {
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
          include: {
            model: User,
            attributes: {
              exclude: ["password", "token", "status"],
            },
          },
        },
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
      // console.log(error);
      // next(error);
    }
  }
}

module.exports = ProjectController;
