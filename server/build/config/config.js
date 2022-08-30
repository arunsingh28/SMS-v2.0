"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || "localhost";
var SERVER_PORT = process.env.PORT || 8080;
var server = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT,
};
exports.default = server;
