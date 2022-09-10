const errorHandler = async (error, req, res, next) => {
  if (
    error.name == "SequelizeValidationError" ||
    error.name == "SequelizeUniqueConstraintError"
  ) {
    const errMsg = error.errors[0].message;
    res.status(400).json({
      message: errMsg,
    });
    // } else if (error.name == "SequelizeForeignKeyConstraintError") {
    //     res.status(404).json({
    //         statusCode: 404,
    //         error: {
    //             message: "Data not Found"
    //         }
    //     });
  } else if (error.name == "activated") {
    res.status(400).json({ message: "User is already Active, please login!" });
  } else if (error.name == "forbidden") {
    res.status(401).json({
      message: "User not Authorized",
    });
  } else if (error.name == "invalidInput") {
    res.status(400).json({ message: "You must input all form before submit" });
  } else if (error.name == "userInvalid") {
    res.status(400).json({
      message: "Please activate your account, by checking your email!",
    });
  } else if (error.name == "loginInvalid") {
    res.status(400).json({ message: "Email/Password Invalid" });
  } else if (
    error.name == "unauthorized" ||
    error.name == "JsonWebTokenError"
  ) {
    res.status(403).json({
      statusCode: 403,
      message: "Invalid Token",
    });
  } else if (error.name == "nullToken") {
    res.status(403).json({
      statusCode: 403,
      message: "Please Login",
    });
  } else if (error.name == "userNotFound") {
    res.status(404).json({ message: "User Not Found" });
  } else if (error.name == "notFound") {
    res.status(404).json({
      statusCode: 404,
      error: {
        message: "Data not Found",
      },
    });
  }
  //   if (error.name === "invalidInput") {
  //     res
  //       .status(400)
  //       .json({ message: "You must input all form before submit" });
  //   } else {
  //     res.status(500).json({ message: "internal server error" });
  //   }
  else {
    res.status(500).json({
      statusCode: 500,
      error: {
        message: "Internal Server Error",
      },
    });
  }
};

module.exports = errorHandler;
