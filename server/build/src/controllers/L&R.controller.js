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
    var _ = { label: 0, sent: function () { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
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
var otpGenrator_1 = __importDefault(require("../utils/otpGenrator"));
// register api for emp
var register = function (req, res) {
    return __awaiter(void 0, void 0, void 0, function () {
        var _a, email, password, name, refreshToken_1, newUser, accesstoken, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, email = _a.email, password = _a.password, name = _a.name;
                    console.table(req.body);
                    if (!(!email || !password || !name)) return [3 /*break*/, 1];
                    return [2 /*return*/, res
                        .status(400)
                        .json({ message: "please fill all detail", code: res.statusCode })];
                case 1:
                    if (!(password.length < 6)) return [3 /*break*/, 2];
                    return [2 /*return*/, res.json({ message: "Enter more then 6 char long password" })];
                case 2: return [4 /*yield*/, token_1.default.refreshToken(email)];
                case 3:
                    refreshToken_1 = _b.sent();
                    newUser = new user_model_1.default({
                        email: email,
                        password: password,
                        name: name,
                        refresh_token: refreshToken_1
                    });
                    _b.label = 4;
                case 4:
                    _b.trys.push([4, 7, , 8]);
                    return [4 /*yield*/, token_1.default.getToken(email)];
                case 5:
                    accesstoken = _b.sent();
                    // genrate refresh token
                    return [4 /*yield*/, newUser.save()];
                case 6:
                    // genrate refresh token
                    _b.sent();
                    // send the accessToken with cookie
                    res.cookie('jwt', refreshToken_1, {
                        httpOnly: true,
                        maxAge: 24 * 60 * 60 * 1000,
                        // sameSite: 'none',
                        // secure: true
                    });
                    // start session
                    req.session.user = newUser;
                    // user created
                    return [2 /*return*/, res.status(201).json({
                        message: "account created!",
                        accesstoken: accesstoken,
                        user: {
                            name: newUser.name,
                            email: newUser.email,
                            role: newUser.role
                        },
                        code: res.statusCode,
                    })];
                case 7:
                    error_1 = _b.sent();
                    if (error_1.code == 11000) {
                        // user conflict
                        return [2 /*return*/, res.status(409).json({
                            message: "User alredy registered",
                            code: res.statusCode,
                        })];
                    }
                    return [2 /*return*/, res.status(500).json({
                        message: "account not created " + error_1.message,
                        code: res.statusCode,
                    })];
                case 8: return [2 /*return*/];
            }
        });
    });
};
// logni api for emp
var login = function (req, res) {
    return __awaiter(void 0, void 0, void 0, function () {
        var _a, email, password, user, isMatch, token, refreshToken_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, email = _a.email, password = _a.password;
                    console.log('Cookies------', JSON.stringify(req.cookies));
                    if (!email || !password) {
                        return [2 /*return*/, res.status(401).json({
                            message: "please fill all detail",
                            code: res.statusCode,
                        })];
                    }
                    return [4 /*yield*/, user_model_1.default.findOne({ email: email })
                        // if user not found
                    ];
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
                case 4: return [4 /*yield*/, token_1.default.getToken(email)];
                case 5:
                    token = _b.sent();
                    return [4 /*yield*/, token_1.default.refreshToken(email)];
                case 6:
                    refreshToken_2 = _b.sent();
                    // update the refresh token in DB
                    return [4 /*yield*/, user_model_1.default.findOneAndUpdate({ email: email }, {
                        $set: { refresh_token: refreshToken_2 }
                    })
                        // send the accessToken with cookie
                    ];
                case 7:
                    // update the refresh token in DB
                    _b.sent();
                    // send the accessToken with cookie
                    res.cookie('jwt', refreshToken_2, {
                        httpOnly: true,
                        maxAge: 24 * 60 * 60 * 1000,
                        // sameSite: 'none',
                        // secure: true
                    });
                    // start session 
                    req.session.user = user;
                    // send data to client
                    return [2 /*return*/, res.status(200).json({
                        message: "logged in",
                        data: {
                            name: user.name,
                            email: user.email,
                            role: user.role
                        },
                        accessToken: token,
                        code: res.statusCode,
                    })];
            }
        });
    });
};
// logout api 
var logout = function (req, res) {
    return __awaiter(void 0, void 0, void 0, function () {
        var cookie, foundUser;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    cookie = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.jwt;
                    if (!cookie)
                        return [2 /*return*/, res.sendStatus(204)
                            // match refresh token in DB
                        ]; //no content
                    return [4 /*yield*/, user_model_1.default.findOne({ refresh_token: cookie }).exec()];
                case 1:
                    foundUser = _b.sent();
                    if (!foundUser) {
                        res.clearCookie('jwt', {
                            httpOnly: true,
                            sameSite: 'none',
                            secure: true,
                        });
                        return [2 /*return*/, res.sendStatus(204)];
                    }
                    // delet refresh token in db
                    foundUser.refresh_token = '';
                    foundUser.save();
                    // clear the refresh token  
                    res.clearCookie('jwt', {
                        httpOnly: true,
                        smaeSite: 'none',
                        secure: true
                    });
                    return [2 /*return*/, res.sendStatus(204)];
            }
        });
    });
};
// change password for local emp
var updatePassword = function (req, res) {
    return __awaiter(void 0, void 0, void 0, function () {
        var id, _a, password, oldPassword, user, isMatch, hash, error_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    id = req.session.user;
                    _a = req.body, password = _a.pwd, oldPassword = _a.oldpwd;
                    console.table(req.body);
                    return [4 /*yield*/, user_model_1.default.findById(id)];
                case 1:
                    user = _b.sent();
                    console.log('CURRENT USER: ', user);
                    if (!password || !oldPassword) {
                        return [2 /*return*/, res
                            .status(400)
                            .json({ message: "fill all detail", code: res.statusCode })];
                    }
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 8, , 9]);
                    return [4 /*yield*/, user.comparePassword(oldPassword)];
                case 3:
                    isMatch = _b.sent();
                    if (!(isMatch === false)) return [3 /*break*/, 4];
                    return [2 /*return*/, res
                        .status(401)
                        .json({ message: "Invalid credinitals", code: res.statusCode })];
                case 4: return [4 /*yield*/, (user === null || user === void 0 ? void 0 : user.encryptPassword(password))];
                case 5:
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
                case 6:
                    // save to db
                    _b.sent();
                    _b.label = 7;
                case 7: return [3 /*break*/, 9];
                case 8:
                    error_2 = _b.sent();
                    return [2 /*return*/, res.status(500).json({
                        message: "server error"
                    })];
                case 9: return [2 /*return*/];
            }
        });
    });
};
// forgot password for local emp
var forgotPassword = function (req, res) {
    return __awaiter(void 0, void 0, void 0, function () {
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
                        try {
                            // change the otp into db
                            otpGenrator_1.default(email, res);
                            // send otp to email
                            return [2 /*return*/, res.status(200).json({
                                // send the otp to client by email serivce by Gunmail
                                otp: user.otp,
                                name: user.name,
                                email: user.email
                            })];
                        }
                        catch (error) {
                            // catch server error
                            return [2 /*return*/, res.status(500).json({
                                message: 'server error',
                                code: res.statusCode
                            })];
                        }
                    }
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
};
var module = {
    register: register,
    login: login,
    logout: logout,
    updatePassword: updatePassword,
    forgotPassword: forgotPassword
};
exports.default = module;
