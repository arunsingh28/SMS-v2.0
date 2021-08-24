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
var crypto_1 = __importDefault(require("crypto"));
var register = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, confirmPassword, name, newUser, token, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password, confirmPassword = _a.confirmPassword, name = _a.name;
                if (!email || !password || !confirmPassword || !name) {
                    return [2 /*return*/, res
                            .status(400)
                            .json({ message: "please fill all detail", code: res.statusCode })];
                }
                if (!(password != confirmPassword)) return [3 /*break*/, 1];
                return [2 /*return*/, res
                        .status(401)
                        .json({ message: "password not matching", code: res.statusCode })];
            case 1:
                newUser = new user_model_1.default({
                    email: email,
                    password: password,
                    name: name,
                });
                _b.label = 2;
            case 2:
                _b.trys.push([2, 5, , 6]);
                return [4 /*yield*/, token_1.default(email)];
            case 3:
                token = _b.sent();
                return [4 /*yield*/, newUser.save()];
            case 4:
                _b.sent();
                return [2 /*return*/, res.status(200).json({
                        message: "account created!",
                        data: newUser,
                        token: token,
                        code: res.statusCode,
                    })];
            case 5:
                error_1 = _b.sent();
                return [2 /*return*/, res.status(501).json({
                        message: "account not created",
                        data: error_1.message,
                        code: res.statusCode,
                    })];
            case 6: return [2 /*return*/];
        }
    });
}); };
var login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, user, isMatch, token;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password;
                console.log(email, password);
                if (!email || !password) {
                    return [2 /*return*/, res.status(401).json({
                            message: "please fill all detail",
                            code: res.statusCode,
                        })];
                }
                return [4 /*yield*/, user_model_1.default.findOne({ email: email })];
            case 1:
                user = _b.sent();
                if (!!user) return [3 /*break*/, 2];
                return [2 /*return*/, res
                        .status(203)
                        .json({ message: "User not found", code: res.statusCode })];
            case 2: return [4 /*yield*/, user.comparePassword(password)];
            case 3:
                isMatch = _b.sent();
                if (!(isMatch === false)) return [3 /*break*/, 4];
                return [2 /*return*/, res
                        .status(401)
                        .json({ message: "Invalid credinitals", code: res.statusCode })];
            case 4: return [4 /*yield*/, token_1.default(email)];
            case 5:
                token = _b.sent();
                // send data to client
                return [2 /*return*/, res.json({
                        message: "logged in",
                        data: user,
                        token: token,
                        code: res.statusCode,
                    })];
        }
    });
}); };
var logout = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var token, destroyToken;
    return __generator(this, function (_a) {
        try {
            token = crypto_1.default.randomBytes(20).toString("hex");
            destroyToken = crypto_1.default
                .createHash("sha256")
                .update(token)
                .digest("hex");
            res.set("newtoken", destroyToken);
            console.log(req.headers);
            return [2 /*return*/, res
                    .status(200)
                    .json({ message: "you are logged out", token: destroyToken })];
        }
        catch (error) {
            return [2 /*return*/, res.status(200).json({ message: "server error please try again" })];
        }
        return [2 /*return*/];
    });
}); };
var updatePassword = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, password, confirmPassword, oldPassword, user, isMatch, hash, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = req.session.user;
                _a = req.body, password = _a.password, confirmPassword = _a.confirmPassword, oldPassword = _a.oldPassword;
                return [4 /*yield*/, user_model_1.default.findById(id)];
            case 1:
                user = _b.sent();
                if (!password || !confirmPassword || !oldPassword) {
                    return [2 /*return*/, res
                            .status(400)
                            .json({ message: "fill all detail", code: res.statusCode })];
                }
                _b.label = 2;
            case 2:
                _b.trys.push([2, 9, , 10]);
                if (!(password != confirmPassword)) return [3 /*break*/, 3];
                return [2 /*return*/, res
                        .status(401)
                        .json({ message: "password not matching", code: res.statusCode })];
            case 3: return [4 /*yield*/, user.comparePassword(oldPassword)];
            case 4:
                isMatch = _b.sent();
                if (!(isMatch === false)) return [3 /*break*/, 5];
                return [2 /*return*/, res
                        .status(401)
                        .json({ message: "Invalid credinitals", code: res.statusCode })];
            case 5: return [4 /*yield*/, (user === null || user === void 0 ? void 0 : user.encryptPassword(password))];
            case 6:
                hash = _b.sent();
                // save to db
                return [4 /*yield*/, (user === null || user === void 0 ? void 0 : user.updateOne({
                        $set: {
                            password: hash,
                        },
                    }).then(function () {
                        return res.status(200).json({
                            message: "password change successfully",
                            code: res.statusCode,
                        });
                    }))];
            case 7:
                // save to db
                _b.sent();
                _b.label = 8;
            case 8: return [3 /*break*/, 10];
            case 9:
                error_2 = _b.sent();
                return [3 /*break*/, 10];
            case 10: return [2 /*return*/];
        }
    });
}); };
var forgotPassword = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var email, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                email = req.body.email;
                if (!!email) return [3 /*break*/, 1];
                return [2 /*return*/, res
                        .status(401)
                        .json({ message: "please enter your email", code: res.statusCode })];
            case 1: return [4 /*yield*/, user_model_1.default.findOne({ email: email })];
            case 2:
                user = _a.sent();
                // if user not found in db
                if (!user) {
                    return [2 /*return*/, res.status(401).json({
                            message: "no account found with this email",
                            code: res.statusCode,
                        })];
                }
                else {
                    // if user found in db
                    /**
                           * send otp to registered mail
                           * reapir this code for mail cause nodemail not working with it
                          await mailGun('arun.singh28aug@gmail.com','forgot password','hi this testing')
                          */
                    /**
                     *@override send otp to register mobile number
                     *
                     */
                    return [2 /*return*/, res
                            .status(500)
                            .json({ message: "server error v1.0 dont try again." })];
                }
                _a.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); };
var module = {
    register: register,
    login: login,
    logout: logout,
    updatePassword: updatePassword,
    forgotPassword: forgotPassword,
};
exports.default = module;
