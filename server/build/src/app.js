"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var config_1 = __importDefault(require("../config/config"));
var logger_1 = __importDefault(require("../config/logger"));
var DB_1 = require("./utils/DB");
var router_1 = __importDefault(require("./routes/router"));
var cors_1 = __importDefault(require("cors"));
// import session from 'express-session'
var session_middleware_1 = __importDefault(require("./middleware/session.middleware"));
// init express variable to app =====================
var app = express_1.default();
var NAMESPACE = "server";
// body parser =======================================
app.use(express_1.default.json());
app.use(express_1.default.text());
app.use(express_1.default.urlencoded({ extended: false }));
// databse connection =================================
DB_1.connectDB();
// Policy =================================
app.use(cors_1.default());
// logger =============================================
app.use(function (req, res, next) {
    logger_1.default.info(NAMESPACE, "METHOD - [" + req.method + "], URL - [" + req.url + "], IP - [" + req.socket.remoteAddress + "]");
    res.on("finish", function () {
        logger_1.default.info(NAMESPACE, "METHOD - [" + req.method + "], URL - [" + req.url + "], IP - [" + req.socket.remoteAddress + "], STATUS - [" + res.statusCode + "]");
    });
    next();
});
// app.use((req, res, next) => {
//   res.append("Access-Control-Allow-Origin", ["*"]);
//   res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
//   res.append("Access-Control-Allow-Headers", "Content-Type");
//   next();
// });
// proxy ==============================================
// app.set("trust proxy", 1);
// session ============================================
session_middleware_1.default(app);
// inti router ========================================
router_1.default(app);
// invalid url handling ===============================
app.use(function (req, res, next) {
    var error = new Error("Page not found");
    return res
        .status(404)
        .json({ message: error.message, statusCode: res.statusCode });
});
// server start ======================================
var server = app.listen(config_1.default.port, function () {
    console.log("Server started on port " + config_1.default.port);
});
// handle server crash ===============================
// process.on("unhandledRejection", (err, promise) => {
//   console.log(`logged Error: ${err}`);
//   server.close(() => process.exit(1));
// });
