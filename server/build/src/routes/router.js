"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var L_R_controller_1 = __importDefault(require("../controllers/L&R.controller"));
var user_private_1 = __importDefault(require("../controllers/user.private"));
var shield_middleware_1 = __importDefault(require("../middleware/shield.middleware"));
var multer_1 = __importDefault(require("multer"));
var multer_s3_1 = __importDefault(require("multer-s3"));
var aws_sdk_1 = __importDefault(require("aws-sdk"));
var s3 = new aws_sdk_1.default.S3({
    accessKeyId: process.env.AWS_ACESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
});
var upload = multer_1.default({
    storage: multer_s3_1.default({
        s3: s3,
        bucket: process.env.AWS_BUCKET_NAME,
        acl: "public-read",
        metadata: function (req, file, cb) {
            cb(null, { fielName: file.fieldname });
        },
        key: function (req, file, cb) {
            cb(null, Date.now().toString() + "-" + file.originalname);
        },
    }),
});
// base routes
function default_1(router) {
    /**
     * @public routes
     * @method post
     *
     * for login without token
     *
     */
    router.post("/api/login", L_R_controller_1.default.login);
    /**
     * @public routes
     * @method post
     *
     * for register new user
     *
     */
    router.post("/api/register", L_R_controller_1.default.register);
    /**
     * @public routes
     * @method get
     * @use not in use
     *
     * logout and destroy token
     *
     */
    router.get("/api/logout", L_R_controller_1.default.logout);
    /**
     * @public routes
     * @method post
     *
     * verify user token and send back user data
     *
     */
    router.get("/api/verify", shield_middleware_1.default);
    /**
     * @private routes
     * @method post
     *
     * for checking user? recovery :  create new password
     *
     */
    router.post("/api/forgot-password", L_R_controller_1.default.forgotPassword);
    /**
     * @private routes
     * @method post
     *
     * for updating password
     *
     */
    router.post("/api/update-password", shield_middleware_1.default, L_R_controller_1.default.updatePassword);
    /**
     * @private routes
     * @method post
     *
     * for add profile imgage
     *
     */
    router.post("/api/user/add-profile", shield_middleware_1.default, upload.single("file"), user_private_1.default.addProfile);
    /**
     * @private routes
     * @method post
     *
     * for deleteing profile imgage
     *
     */
    router.get("/api/user/delete-profile", shield_middleware_1.default, user_private_1.default.removeProfile);
    /**
     * @private routes
     * @method post
     *
     * for update profile imgage
     *
     */
    router.post("/api/user/update-profile", shield_middleware_1.default, upload.single("file"), user_private_1.default.updateProfile);
}
exports.default = default_1;
