"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var allowedOrigin_1 = __importDefault(require("./allowedOrigin"));
var corsOption = {
    origin: function (origin, callback) {
        console.log('ORIGIN______', origin);
        // remove !origin it just for dev otherwise it allow all the other origin to access the route
        if (allowedOrigin_1.default.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionSuccessStatus: 200,
};
exports.default = corsOption;