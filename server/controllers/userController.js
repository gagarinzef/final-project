const { User } = require("../models");
const mail = require("../helpers/welcomeEmail");
const verifyMail = require("../helpers/verifyEmail");
const jwt = require("jsonwebtoken");
const { comparePassword } = require("../helpers/bcryptjs");
const { createToken } = require("../helpers/jwt");

class UserController {
  // Find User Data
  static async findAllUser(req, res, next) {
    try {
      const user = await User.findAll({
        attributes: {
          exclude: ["password", "createdAt", "updatedAt", "token"],
        },
      });
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: "internal server error" });
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
        token,
      });
      console.log(email, password, "&&&&&&&&&&&");
      res.status(201).json({
        message: "Verify email has been sent",
      });
    } catch (error) {
      console.log(error, '<<<<< error regis');
      next(error)
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

      // Send Email Verify Success
      await mail({
        username: user.username,
        email: user.email,
      });

      res.status(200).json({ message: "Success Verify Email" });
    } catch (error) {
      switch (error.name) {
        case "invalidToken":
          // Delete User when Status Invalid / Verify Failed
          await User.destroy({ where: { status: "Inactive" } });
          res.status(400).json({ message: "Token invalid" });
          break;
        case "userNotFound":
          // Delete User when Status Invalid / Verify Failed
          await User.destroy({ where: { status: "Inactive" } });
          res.status(404).json({ message: "User Not Found" });
          break;
        default:
          next(error)
          break;
      }
    }
  }

  // Login User
  static async loginUser(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      console.log(user, "<<<<<<< CEK USER MASUK TIDAK");
      if (!user) {
        console.log("<<<<<<<<<<< ini user not found");
        throw { name: "userNotFound" };
      }
      if (user.status === "Inactive") {
        console.log("<<<<<<<<<<< ini inactive");
        throw { name: "userInvalid" };
      }
      const isPassValid = comparePassword(password, user.password);
      if (!isPassValid) throw { name: "loginInvalid" };
      const payload = {
        id: user.id,
      };
      const token = createToken(payload);
      res.status(200).json({ access_token: token });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
