import register_contollers from "../controllers/L&R.controller";
import contact from "../controllers/contact-us";
import student from "../controllers/student";
import { Express } from "express";
import authorization from "../middleware/auth.middleware";
import jwtRefreshToken from '../middleware/jwtRefreshToken'
import fileControllers from '../controllers/file.controller'
import awsFile from '../utils/aws'


// base routes
export default function (router: Express) {

  // profile image uplaod
  router.post('/api/v1/addProfile', authorization, awsFile.uploadObject.single('pro_img'), fileControllers.addProfileImage)
  // profile image delete
  router.delete('/api/v1/removeProfile', authorization, fileControllers.deleteProfileImage)
  // profile image update
  router.put('/api/v1/updateProfile', authorization, awsFile.uploadObject.single('pro_img'), fileControllers.updateProfileImage)

  router.post("/api/login", register_contollers.login);

  router.post("/api/register", register_contollers.register);

  router.get("/api/logout", register_contollers.logout);

  // router.get("/api/verify", authorization);
  router.get('/api/refreshToken', jwtRefreshToken)

  router.put("/api/forgot-password", register_contollers.forgotPassword);

  router.put(
    "/api/reset-password",
    authorization,
    register_contollers.resetPassword
  );

  router.post("/api/student/detail", authorization, student.Detail);

  router.post("/api/contact-us", contact.newQuery);


  router.post('/api/otp/forgot/:email', register_contollers.verifyForgotOTP)

}
