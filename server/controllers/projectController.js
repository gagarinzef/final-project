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
        order: [["createdAt", "ASC"]],
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
      let list = { order: [[{ model: Task }, "createdAt", "DESC"]] };
      if (
        req.query.key !==
        '{"start":"","end":"","status":"","sort":"","UserId":""}'
      ) {
        const {
          start: startDate,
          end: endDate,
          sort,
          UserId,
          status,
        } = JSON.parse(req.query.key);

        console.log(JSON.parse(req.query.key));
        if (startDate && endDate) {
          obj.createdAt = { [Op.between]: [startDate, endDate] };
          // sort title
          sort
            ? sort != "none"
              ? (list = { order: [[{ model: Task }, "createdAt", `${sort}`]] })
              : null
            : null;
          // sort by created at
          sort
            ? sort.created
              ? sort.created != "none"
                ? (list = {
                    order: [[{ model: Task }, "createdAt", `${sort.created}`]],
                  })
                : null
              : null
            : null;
          // sort due
          sort
            ? sort.due
              ? sort.due != "none"
                ? (list = { order: [[{ model: Task }, "date", `${sort.due}`]] })
                : null
              : null
            : null;
          // sort userId
          UserId ? (UserId != "none" ? (obj.UserId = UserId) : null) : null;
          // filter status
          status ? (status != "none" ? (obj.status = status) : null) : null;
          // kalo startdate & enddate  true
          obj.createdAt ? (option = { where: obj }) : null;
        }

        // filter dan sort tanpa filter date
        if (!obj.createdAt) {
          // sort title
          sort
            ? (list = { order: [[{ model: Task }, "title", `${sort}`]] })
            : null;
          // sort createdAt
          sort
            ? sort.created
              ? sort.created != "none"
                ? (list = {
                    order: [[{ model: Task }, "createdAt", `${sort.created}`]],
                  })
                : null
              : null
            : null;
          // sort due
          sort
            ? sort.due
              ? sort.due != "none"
                ? (list = { order: [[{ model: Task }, "date", `${sort.due}`]] })
                : null
              : null
            : null;
          // filter assignee
          UserId ? (UserId != "none" ? (obj.UserId = UserId) : null) : null;
          // filter status
          status ? (status != "none" ? (obj.status = status) : null) : null;
          // kalo obj createdAtnya gaada
          !obj.createdAt ? (option = { where: obj }) : null;
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
        ...list, // filter
      });

      // const project = await Project.findByPk(projectId);
      if (!project) {
        throw { name: "notFound" };
      }
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
      next(error);
    }
  }

  static async deleteProjectById(req, res, next) {
    const { id } = req.user;
    try {
      const { projectId } = req.params;
      const findProject = await Project.findByPk(projectId);
      if (!findProject) throw { name: "notFound" };

      const user = await UserProject.findOne({
        where: {
          ProjectId: projectId,
          UserId: id,
        },
      });
      if (!user) {
        throw { name: "notFound" };
      }
      if (user.role !== "leader") {
        throw { name: "forbidden" };
      }

      await Project.destroy({ where: { id: projectId } });
      res.status(200).json({ message: `${findProject.name} has been deleted` });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ProjectController;
