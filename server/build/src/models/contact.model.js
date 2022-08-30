"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var userQuerySchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    school: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
});
var newQuery = mongoose_1.default.model("query", userQuerySchema);
exports.default = newQuery;
