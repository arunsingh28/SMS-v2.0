"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var logEvents_middleware_1 = __importDefault(require("../middleware/logEvents.middleware"));
var errorHandler = function (server, app) {
    app.use('*', function (req, res) {
    });
    process.on("unhandledRejection", function (err) {
        logEvents_middleware_1.default.logEvents(err.message, 'UnhandleReject.txt');
        console.log("unhanle Rejection fail: " + err);
        app.use('*', function (req, res) {
            res.status(500).json({ message: "Maintenance work going on" });
        });
        process.on('uncaughtException', function (err) {
            logEvents_middleware_1.default.logEvents(err.message, 'uncaughtException.txt');
            console.log("Exception Error: " + err);
            app.use('*', function (req, res) {
                res.status(500).json({ message: "Maintenance work going on" });
            });
            server.close(function () {
                process.exit(1);
            });
        });
    });
};
exports.default = errorHandler;
