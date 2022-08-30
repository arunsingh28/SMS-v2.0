"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var token_1 = __importDefault(require("../utils/token"));
var user_model_1 = __importDefault(require("../models/user.model"));
var Login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, password, token, isUser, isMatch;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, username = _a.username, password = _a.password;
                return [4 /*yield*/, token_1.default.getToken(username)];
            case 1:
                token = _b.sent();
                return [4 /*yield*/, user_model_1.default.findOne({ email: username })];
            case 2:
                isUser = _b.sent();
                if (!isUser) return [3 /*break*/, 4];
                return [4 /*yield*/, isUser.comparePassword(password)];
            case 3:
                isMatch = _b.sent();
                if (isMatch == true) {
                    return [2 /*return*/, res.status(200).json({
                            message: "Logged in",
                            type: "success",
                            token: token,
                        })];
                }
                else {
                    return [2 /*return*/, res.status(201).json({
                            message: "Invalid Credentials",
                            type: "error",
                        })];
                }
                return [3 /*break*/, 5];
            case 4: return [2 /*return*/, res.status(201).json({
                    message: "Email not exist",
                    type: "error",
                })];
            case 5: return [2 /*return*/];
        }
    });
}); };
var Register = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, name, role, newAdmin, token, user, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password, name = _a.name, role = _a.role;
                newAdmin = new user_model_1.default({
                    password: password,
                    name: name,
                    email: email,
                    role: role
                });
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                if (!email || !password || !name || !role) {
                    return [2 /*return*/, res.status(203).json({
                            message: "Please fill all fields",
                            type: "error",
                        })];
                }
                return [4 /*yield*/, token_1.default.getToken(email)];
            case 2:
                token = _b.sent();
                return [4 /*yield*/, newAdmin.save()];
            case 3:
                user = _b.sent();
                return [2 /*return*/, res.status(200).json({
                        message: "Account Created.",
                        user: user,
                        token: token,
                        type: "success",
                    })];
            case 4:
                error_1 = _b.sent();
                if (error_1.code === 11000) {
                    return [2 /*return*/, res.status(203).json({
                            message: "Email already exist" || error_1.message,
                            type: "error",
                        })];
                }
                return [2 /*return*/, res.status(501).json({
                        message: "server error " + error_1.message,
                        code: res.statusCode,
                        type: "error",
                    })];
            case 5: return [2 /*return*/];
        }
    });
}); };
var AccountTerminate = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, code, isUser;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, code = _a.code;
                if (!(code === "@apple1397000")) return [3 /*break*/, 2];
                return [4 /*yield*/, user_model_1.default.findOneAndDelete(email)];
            case 1:
                isUser = _b.sent();
                if (isUser === null) {
                    return [2 /*return*/, res.json({ message: "Account not exist.", type: "error" })];
                }
                else {
                    return [2 /*return*/, res.json({ message: "Account deleted.", type: "success" })];
                }
                return [3 /*break*/, 3];
            case 2: return [2 /*return*/, res.status(203).json({
                    message: "Invalid Code.",
                    type: "error",
                })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.default = { Login: Login, Register: Register, AccountTerminate: AccountTerminate };
