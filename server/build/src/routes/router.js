"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var L_R_controller_1 = __importDefault(require("../controllers/L&R.controller"));
var contact_us_1 = __importDefault(require("../controllers/contact-us"));
var student_1 = __importDefault(require("../controllers/student"));
var auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
var jwtRefreshToken_1 = __importDefault(require("../middleware/jwtRefreshToken"));
var file_controller_1 = __importDefault(require("../controllers/file.controller"));
var aws_1 = __importDefault(require("../utils/aws"));
// base routes
function default_1(router) {
    // test of file uplaod
    router.put('/api/file/:id', aws_1.default.upload.single('pro_img'), file_controller_1.default.addProfileImage);
    router.delete('/api/v1/removeProfile/:id', file_controller_1.default.deleteProfileImage);
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
    router.get("/api/verify", auth_middleware_1.default);
    /**
     * @private routes
     * @method
     *
     * for checking user? recovery :  create new password
     *
     */
    router.put("/api/forgot-password", L_R_controller_1.default.forgotPassword);
    /**
     * @private routes
     * @method patch
     *
     * for updating password
     *
     */
    router.put("/api/reset-password", auth_middleware_1.default, L_R_controller_1.default.resetPassword);
    router.post("/api/student/detail", auth_middleware_1.default, student_1.default.Detail);
    /**
     * @public routes
     * @method post
     *
     * for query or contact-us
     *
     */
    router.post("/api/contact-us", contact_us_1.default.newQuery);
    router.get('/api/refreshToken', jwtRefreshToken_1.default);
    router.post('/api/otp/forgot/:email', L_R_controller_1.default.verifyForgotOTP);
}
exports.default = default_1;
