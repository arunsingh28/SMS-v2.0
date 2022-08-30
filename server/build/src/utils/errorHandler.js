"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var logEvents_middleware_1 = __importDefault(require("../middleware/logEvents.middleware"));
var errorHandler = function (server) {
    process.on("unhandledRejection", function (err) {
        logEvents_middleware_1.default.logEvents(err.message, 'UnhandleReject.txt');
        console.log("unhanle Rejection fail: " + err);
        process.on('uncaughtException', function (err) {
            logEvents_middleware_1.default.logEvents(err.message, 'uncaughtException.txt');
            console.log("Exception Error: " + err);
            server.close(function () {
                process.exit(1);
            });
        });
    });
};
exports.default = errorHandler;
