const { User } = require("../models");
const verifyMail = require("../helpers/verifyEmail");
const jwt = require("jsonwebtoken");
const { comparePassword } = require("../helpers/bcryptjs");
const { createToken } = require("../helpers/jwt");
const { use } = require("../routes");

class UserController {
  // Find User Data
  static async findAllUser(req, res, next) {
    try {
      const user = await User.findAll({
        attributes: {
          exclude: ["password", "createdAt", "updatedAt", "token"],
        },
      });
      console.log(user, '<<<<<<<<<<<<<<<<<< INI ALL USER LIST');
      res.status(200).json(user);
    } catch (error) {
      // next(error)
    }
  }

  // Register User
  static async registerUser(req, res, next) {
    try {
      const { username, email, password } = req.body;
      if (!username || !email || !password) throw { name: "invalidInput" };
      const token = jwt.sign({ email, password }, "generateToken", {
        expiresIn: "1d",
      });
      const register = await User.create({
        username,
        email,
        password,
        token,
        status: "Inactive",
      });

      // Send Email Verification
      await verifyMail({
        email: register.email,
        username: register.username,
        token,
      });

      res.status(201).json({
        message: "Verify email has been sent",
      });
    } catch (error) {
      next(error);
    }
  }

  // Verify User
  static async verifyUser(req, res, next) {
    try {
      const { token } = req.params;
      if (!token) throw { name: "invalidToken" };
      const user = await User.findOne({ where: { token } });
      if (!user) throw { name: "userNotFound" };
      if (user.status === "Active") throw { name: "activated" };

      // Update user status
      await User.update({ status: "Active" }, { where: { id: user.id } });

      res.status(200).json({ message: "Success Verify Email" });
    } catch (error) {
      switch (error.name) {
        case "invalidToken":
          // Delete User when Status Invalid / Verify Failed
          await User.destroy({ where: { status: "Inactive" } });
          break;
        case "userNotFound":
          // Delete User when Status Invalid / Verify Failed
          await User.destroy({ where: { status: "Inactive" } });
          break;
        default:
          next(error);
          break;
      }
      next(error)
    }
  }

  // Login User
  static async loginUser(req, res, next) {
    console.log(req.body);
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw { name: "loginInvalid" };
      }
      if (user.status === "Inactive") {
        throw { name: "userInvalid" };
      }
      const isPassValid = comparePassword(password, user.password);
      if (!isPassValid) throw { name: "loginInvalid" };
      const payload = {
        id: user.id,
      };
      const token = createToken(payload);
      res.status(200).json({
        access_token: token,
        username: user.username,
        userId: user.id,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
