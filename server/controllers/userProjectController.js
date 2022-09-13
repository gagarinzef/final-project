const { UserProject, User, Project } = require("../models");
const invitationEmail = require("../helpers/invitationEmail");

class UserProjectController {
  static async inviteUser(req, res, next) {
    try {
      const { email, ProjectId } = req.body;
      // console.log(req.body, '<<<<<<<<<<<<<<<<<<<<<<<<<<<<< INI BODY USERPROJECT');
      const UserId = req.user.id;
      if (!email) throw { name: "notFound" };
      const findInviteUser = await User.findByPk(UserId);
      // console.log('<<<<<<<<<<>>>>>>>>>>>>>> THROW NOTFOUND UDAH LEWAT');
      const findUser = await User.findOne({ where: { email } });
      // console.log(findUser, '<<<<<<<<<<<<<< INI FINDUSER ');
      if (!findUser) throw { name: "notRegistered" };
      const findProject = await Project.findByPk(ProjectId);
      if (!findProject) throw { name: "notFound" };

      const obj = {
        name: findInviteUser.username,
        email: findUser.email,
        username: findUser.username,
        UserId: findUser.id,
        projectName: findProject.name,
        ProjectId,
      };

      await invitationEmail(obj);
      res.status(200).json({ message: "Invitation email has been sent" });
    } catch (error) {
      // console.log(error);
      next(error);
    }
  }
  static async acceptInvite(req, res, next) {
    try {
      const { UserId, ProjectId } = req.query;
      const findUserProject = await UserProject.findOne({
        where: { UserId: +UserId, ProjectId: +ProjectId },
      });
      if (findUserProject) throw { name: "alreadyEnroll" };
      const approveInvitation = await UserProject.create({
        UserId: +UserId,
        ProjectId: +ProjectId,
        role: "member",
      });
      res.status(201).json({ message: "Success join to project" });
    } catch (error) {
      // console.log(error, '<<<<<<<<<<<<<<<<<< ERROR USERPROJECT ACCEPT');
      next(error);
    }
  }
  static async getUserByProjectId(req, res, next) {
    try {
      const { ProjectId } = req.params;
      const userProject = await UserProject.findAll(
        {
          include: {
            model: User,
            attributes: ["id", "username", "email"],
          },
        },
        { where: { ProjectId } }
      );
      console.log(
        ProjectId,
        userProject[0].User,
        "<<<<<<<<<<<<< GET USERPROJECT BY ID"
      );
      // if (!userProject) throw { name: "notFound" };
      res.status(200).json(userProject);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserProjectController;
