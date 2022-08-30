"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_session_1 = __importDefault(require("express-session"));
function default_1(app) {
    app.use(express_session_1.default({
        secret: 'sce',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: true, maxAge: 60000 }
    }));
    app.set('trust proxy', 1);
}
exports.default = default_1;
