const { UserProject, User, Project } = require("../models");
const invitationEmail = require("../helpers/invitationEmail");

class UserProjectController {
  static async inviteUser(req, res, next) {
    try {
      const { email, ProjectId } = req.body;
      const UserId = req.user.id;
      if (!email) throw { name: "notFound" };
      const findInviteUser = await User.findByPk(UserId);
      const findUser = await User.findOne({ where: { email } });
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
      next(error);
    }
  }
}

module.exports = UserProjectController;
