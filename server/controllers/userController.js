const { User } = require("../models");
const mail = require("../helpers/welcomeEmail");
const verifyMail = require("../helpers/verifyEmail");
const jwt = require("jsonwebtoken");
const { comparePassword } = require("../helpers/bcryptjs");
const { createToken } = require("../helpers/jwt");

class UserController {
  // Find User Data
  static async findAllUser(req, res) {
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
  static async registerUser(req, res) {
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

      res.status(201).json({
        message: "Verify email has been sent",
      });
    } catch (error) {
      if (error.name === "invalidInput") {
        res
          .status(400)
          .json({ message: "You must input all form before submit" });
      } else {
        res.status(500).json({ message: "internal server error" });
      }
    }
  }

  // Verify User
  static async verifyUser(req, res) {
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
        case "activated":
          res
            .status(400)
            .json({ message: "User is already Active, please login!" });
          break;
        case "userNotFound":
          // Delete User when Status Invalid / Verify Failed
          await User.destroy({ where: { status: "Inactive" } });
          res.status(404).json({ message: "User Not Found" });
          break;
        default:
          res.status(500).json({ message: "Internal Server Error" });
          break;
      }
    }
  }

  // Login User
  static async loginUser(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user) throw { name: "userNotFound" };
      if (user.status === "Inactive") throw { name: "userInvalid" };
      const isPassValid = comparePassword(password, user.password);
      if (!isPassValid) throw { name: "loginInvalid" };
      const payload = {
        id: user.id,
      };
      const token = createToken(payload);
      res.status(200).json({ access_token: token });
    } catch (error) {
      switch (error.name) {
        case "loginInvalid":
          res.status(400).json({ message: "Email/Password Invalid" });
          break;
        case "userInvalid":
          res.status(400).json({
            message: "Please activate your account, by checking your email!",
          });
          break;
        case "userNotFound":
          res.status(404).json({ message: "User Not Found" });
          break;
        default:
          res.status(500).json({ message: "Internal Server Error" });
          break;
      }
    }
  }
}

module.exports = UserController;
