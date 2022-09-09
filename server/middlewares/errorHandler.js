const errorHandler = async (error, req, res, next) => {
    if (error.name == "SequelizeValidationError" || error.name == "SequelizeUniqueConstraintError") {
        const errMsg = error.errors[0].message;
        res.status(400).json({
            statusCode: 400,
            error: {
                message: errMsg
            }
        });
    } else if (error.name == "SequelizeForeignKeyConstraintError") {
        res.status(404).json({
            statusCode: 404,
            error: {
                message: "Data not Found"
            }
        });
    } else if (error.name == "forbidden") {
        res.status(401).json({
            message: "User not Authorized"
        });
    } else if (error.name == "false") {
        res.status(401).json({
            statusCode: 401,
            message: "Invalid Username/Password"
        });
    } else if (error.name == "unauthorized" || error.name == "JsonWebTokenError") {
        res.status(403).json({
            statusCode: 403,
            message: "Invalid Token"
        });
    } else if (error.name == "nullToken") {
        res.status(403).json({
            statusCode: 403,
            message: "Please Login"
        });
    } else if (error.name == "userNotFound") {
        res.status(404).json({
            statusCode: 404,
            error: {
                message: "Invalid Username/Password"
            }
        });
    } else if (error.name == "notFound") {
        res.status(404).json({
            statusCode: 404,
            error: {
                message: "Data not Found"
            }
        });
    } else {
        res.status(500).json({
            statusCode: 500,
            error: {
                message: "Internal Server Error"
            }
        });
    }
}

module.exports = errorHandler;