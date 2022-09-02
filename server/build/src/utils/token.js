"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var envConfig_1 = __importDefault(require("../../config/envConfig"));
// expire in 30s
var getToken = function (id) {
    return jsonwebtoken_1.default.sign({ id: id }, envConfig_1.default.JWT_SECRET_KEY1, {
        expiresIn: envConfig_1.default.JWT_EXPIRE_TIME
    });
};
// expire in 5m
var refreshToken = function (id) {
    return jsonwebtoken_1.default.sign({ id: id }, envConfig_1.default.JWT_SECRET_KEY2, {
        expiresIn: envConfig_1.default.JWT_REFRESH_EXPIRE_TIME
    });
};
// expire in 3m
var ForgotToken = function (id) {
    // using env value from mailType file
    return jsonwebtoken_1.default.sign({ id: id }, envConfig_1.default.JWT_SECRET_KEY3, {
        expiresIn: envConfig_1.default.JWT_FORGOT_PASSWORD_EXPIRE_TIME
    });
};
var getForgotTokenDetail = function () {
};
exports.default = { getToken: getToken, refreshToken: refreshToken, ForgotToken: ForgotToken, getForgotTokenDetail: getForgotTokenDetail };
