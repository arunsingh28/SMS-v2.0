"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var logger_1 = __importDefault(require("../config/logger"));
var DB_1 = require("./utils/DB");
var router_1 = __importDefault(require("./routes/router"));
var admin_1 = __importDefault(require("./routes/admin"));
var cors_1 = __importDefault(require("cors"));
var session_middleware_1 = __importDefault(require("./middleware/session.middleware"));
var corsOption_1 = __importDefault(require("../config/corsOption"));
var errorHandler_1 = __importDefault(require("./utils/errorHandler"));
var credentials_1 = __importDefault(require("./middleware/credentials"));
var logEvents_middleware_1 = __importDefault(require("./middleware/logEvents.middleware"));
var config_1 = __importDefault(require("../config/config"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// init express variable to app =====================
var app = express_1.default();
// databse connection =================================
DB_1.connectDB();
// logger for file ====================================
app.use(logEvents_middleware_1.default.logger);
var NAMESPACE = "server";
// body parser =======================================
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(credentials_1.default);
// cookie parser =======================================
app.use(cookie_parser_1.default());
// Policy ============================================
app.use(cors_1.default(corsOption_1.default));
// logger for console =================================
app.use(function (req, res, next) {
    logger_1.default.info(NAMESPACE, "METHOD - [" + req.method + "], URL - [" + req.url + "], IP - [" + req.socket.remoteAddress + "]");
    res.on("finish", function () {
        logger_1.default.info(NAMESPACE, "METHOD - [" + req.method + "], URL - [" + req.url + "], IP - [" + req.socket.remoteAddress + "], STATUS - [" + res.statusCode + "]");
    });
    next();
});
// session ============================================
session_middleware_1.default(app);
// Public router ======================================
router_1.default(app);
// Admin router =======================================
admin_1.default(app);
// invalid url handling ===============================
app.use('*', function (req, res, next) {
    var error = new Error("invalid url");
    return res
        .status(404)
        .send(error.message);
});
var server;
// handle server crash ===============================
errorHandler_1.default(server);
app.use(function (err, res) {
    console.log(err.message);
    logEvents_middleware_1.default.logEvents(err.message, 'serverInternalError.txt');
    return res.status(500).json(err.message);
});
server = app.listen(config_1.default.port, function () {
    console.log("------ Server start on port " + config_1.default.port + " ------");
});
