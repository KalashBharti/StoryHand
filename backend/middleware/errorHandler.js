const {constants}=require("../constant")
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;

    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({ title: "validation failed", message: err.message, stackTrace: err.stack })

            break;
        case constants.NOT_FOUND:
            res.json({ title: "Not found", message: err.message, stackTrace: err.stack })
            break
        case constants.UNAUTHORIZED:
            res.json({ title: "Unauthorized", message: err.message, stackTrace: err.stack })
            break
        case constants.FORBIDDEN:
            res.json({ title: "ForBidden", message: err.message, stackTrace: err.stack })
            break
        case constants.SERVER_ERROR:
            res.json({ title: "ForBidden", message: err.message, stackTrace: err.stack })
            break
        default:
            console.log("everythings fine");
            break;
    }
}

module.exports = errorHandler;