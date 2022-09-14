const errorHandler = async (error, req, res, next) => {
  let errMsg;
  switch (error.name) {
    case "SequelizeValidationError":
      errMsg = error.errors[0].message;
      res.status(400).json({
        message: errMsg,
      });
      break;
    case "SequelizeUniqueConstraintError":
      errMsg = error.errors[0].message;
      res.status(400).json({
        message: errMsg,
      });
      break;
    case "activated":
      res.status(400).json({
        message: "User is already Active, please login",
      });
      break;
    case "forbidden":
      res.status(403).json({
        message: "User not Authorized",
      });
      break;
    case "invalidInput":
      res.status(400).json({
        message: "You must input all form before submit",
      });
      break;
    case "userInvalid":
      res.status(400).json({
        message: "Please activate your account by checking your email",
      });
      break;
    case "loginInvalid":
      res.status(400).json({
        message: "Email/Password Invalid",
      });
      break;
    case "unauthorized":
      res.status(403).json({
        message: "Invalid Token",
      });
      break;
    case "JsonWebTokenError":
      res.status(403).json({
        message: "Invalid Token",
      });
      break;
    case "nullToken":
      res.status(403).json({
        message: "Please Login",
      });
      break;
    case "notFound":
      res.status(404).json({
        message: "Data not Found",
      });
      break;
    case "notRegistered":
      res.status(404).json({
        message: "User not Registered",
      });
      break;
    case "alreadyEnroll":
      res.status(400).json({
        message: "User already enrolled in this project",
      });
      break;
    case "userNotFound":
      res.status(404).json({
        message: "User Not Found",
      });
      break;
    default:
      res.status(500).json({
        message: "Internal Server Error",
      });
      break;
  }
};
module.exports = errorHandler;
