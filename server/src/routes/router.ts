import register_contollers from "../controllers/L&R.controller";
import student from "../controllers/student";
import { Express } from "express";
import authorization from "../middleware/auth.middleware";
import jwtRefreshToken from '../middleware/jwtRefreshToken'
import fileControllers from '../controllers/file.controller'
import notification from "../controllers/notification";
import awsFile from '../utils/aws'
import _user from '../models/user.model'
import otpVerifyer from '../controllers/sendOtp'
import authContoller from "../controllers/auth.contoller";

// base routes
export default function (router: Express) {
  // profile image uplaod update
  router.put('/api/v1/updateProfile',
    authorization,
    awsFile.uploadObject.single('pro_img'),
    fileControllers.addProfileImage)

  // profile image delete
  router.delete('/api/v1/removeProfile', authorization, fileControllers.deleteProfileImage)

  // login route
  router.post("/api/v1/login", authContoller.login);
  // logout rotue
  router.get("/api/v1/logout", authContoller.logout);

  // register route
  router.post("/api/v1/register", register_contollers.register);


  // refresh token 
  router.get('/api/v1/refreshToken', jwtRefreshToken)

  // password forgot 
  router.put("/api/v1/forgot-password", register_contollers.forgotPassword);

  // password reset
  router.put("/api/reset-password", authorization, register_contollers.resetPassword);
  // student details
  router.post("/api/v1/student/detail", authorization, student.Detail);

  // verify Account with OTP
  router.post('/api/v1/verify/account', authorization, register_contollers.verifyAccount)

  router.put("/api/v1/otp/forgot", otpVerifyer.verifyOtp)

  /**
   * NOTIFICATION ROUTER
   * 
   * send all notification and register new notification
   */

}
