const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

const SOCKET_SECRET_KEY = "kGFHCuUoOlRyoBgRis5y9KfDKvKWpO66";

const authentication = async (req, res, next) => {
  try {
    const { access_token, socket_key } = req.headers;

    // if (socket_key === SOCKET_SECRET_KEY) {
    // console.log("socket here")
    //   next();
    // } else {
    if (!access_token) throw { name: "nullToken" };
    const payload = verifyToken(access_token);
    if (!payload.id) throw { name: "unauthorized" };
    const user = await User.findByPk(payload.id);
    req.user = {
      id: user.id,
      role: user.role,
    };
    //   next();
    // }
    if (socket_key === SOCKET_SECRET_KEY || req.user) next();
  } catch (error) {
    next(error);
  }
};

module.exports = authentication;
