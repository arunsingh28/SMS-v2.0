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
var user_model_1 = __importDefault(require("../models/user.model"));
var aws_1 = __importDefault(require("../utils/aws"));
// profile photo controllers ===========================
var addProfile = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, file, key, location, isUpload, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.session.user;
                file = req.file;
                if (!file) {
                    return [2 /*return*/, res
                            .status(203)
                            .json({ message: "plese provide image", code: res.statusCode })];
                }
                key = file.key;
                location = file.location;
                return [4 /*yield*/, user_model_1.default
                        .findOneAndUpdate({ _id: id }, {
                        // set recent image
                        $set: {
                            profile: {
                                key: key,
                                location: location,
                            },
                        },
                    })
                        .catch(function () { return false; })];
            case 1:
                isUpload = _a.sent();
                data = {
                    location: location,
                    key: key,
                };
                // if any error happen
                if (isUpload === false) {
                    return [2 /*return*/, res
                            .status(500)
                            .json({ message: "server error try again", code: res.statusCode })];
                }
                return [2 /*return*/, res
                        .status(200)
                        .json({ message: "image uploaded", data: data, code: res.statusCode })];
        }
    });
}); };
var removeProfile = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, user, key, isDelete;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = req.session.user;
                return [4 /*yield*/, user_model_1.default.findById(id)];
            case 1:
                user = _b.sent();
                key = (_a = user.profile[0]) === null || _a === void 0 ? void 0 : _a.key;
                // if there is not image to delete
                if (!key) {
                    return [2 /*return*/, res
                            .status(400)
                            .json({ message: "Please upload profile image", code: res.statusCode })];
                }
                return [4 /*yield*/, aws_1.default(key)
                        .then(function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, user_model_1.default
                                        .updateOne({ _id: id }, {
                                        $pull: {
                                            profile: {
                                                key: key,
                                            },
                                        },
                                    })
                                        .catch(function () { return false; })];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); })
                        .catch(function () { return false; })];
            case 2:
                isDelete = _b.sent();
                if (isDelete === false) {
                    return [2 /*return*/, res
                            .status(203)
                            .json({ message: "server error try again", code: res.statusCode })];
                }
                else {
                    return [2 /*return*/, res
                            .status(200)
                            .json({ message: "Profile Image deleted.", code: res.statusCode })];
                }
                return [2 /*return*/];
        }
    });
}); };
var updateProfile = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, file, key, location, user, _key, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.session.user;
                file = req.file;
                if (!file) {
                    return [2 /*return*/, res
                            .status(203)
                            .json({ message: "plese provide image", code: res.statusCode })];
                }
                key = file.key;
                location = file.location;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, user_model_1.default.findById(id)];
            case 2:
                user = _a.sent();
                _key = user.profile[0].key;
                return [4 /*yield*/, aws_1.default(_key).then(function () { return __awaiter(void 0, void 0, void 0, function () {
                        var isUpdate;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, user_model_1.default
                                        .findOneAndUpdate({ _id: id }, {
                                        // set recent image
                                        $set: {
                                            profile: {
                                                key: key,
                                                location: location,
                                            },
                                        },
                                    })
                                        .catch(function () { return false; })];
                                case 1:
                                    isUpdate = _a.sent();
                                    if (isUpdate === false) {
                                        return [2 /*return*/, res
                                                .status(500)
                                                .json({ message: "server error", code: res.statusCode })];
                                    }
                                    else {
                                        return [2 /*return*/, res
                                                .status(200)
                                                .json({ message: "Profile Image updated.", code: res.statusCode })];
                                    }
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            case 3:
                _a.sent();
                return [3 /*break*/, 5];
            case 4:
                error_1 = _a.sent();
                return [2 /*return*/, res
                        .status(500)
                        .json({ message: "server error", code: res.statusCode })];
            case 5: return [2 /*return*/];
        }
    });
}); };
var module = {
    addProfile: addProfile,
    removeProfile: removeProfile,
    updateProfile: updateProfile,
};
exports.default = module;
