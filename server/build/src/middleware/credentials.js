"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var allowedOrigin_1 = __importDefault(require("../../config/allowedOrigin"));
var credentials = function (req, res, next) {
    var origin = req.headers.origin;
    // if (allowedOrigin.indexOf(origin) !== -1 || !origin) {
    if (allowedOrigin_1.default.includes(origin)) {
        res.header("Access-Control-Allow-Origin", origin);
    }
    next();
};
exports.default = credentials;
