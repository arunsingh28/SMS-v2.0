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
  router.post('/api/v1/addProfile',
    authorization,
    awsFile.uploadObject.single('pro_img'),
    fileControllers.addProfileImage)

  // profile image delete
  router.delete('/api/v1/removeProfile',
    authorization,
    fileControllers.deleteProfileImage)

  // profile image update
  router.put('/api/v1/updateProfile',
    authorization,
    awsFile.uploadObject.single('pro_img'),
    fileControllers.updateProfileImage)

  // login route
  router.post("/api/v1/login", register_contollers.login);

  // register route
  router.post("/api/v1/register", register_contollers.register);

  // logout rotue
  router.get("/api/v1/logout", register_contollers.logout);

  // refresh token 
  router.get('/api/v1/refreshToken', jwtRefreshToken)

  // password forgot 
  router.put("/api/v1/forgot-password", register_contollers.forgotPassword);

  // password reset
  router.put(
    "/api/reset-password",
    authorization,
    register_contollers.resetPassword
  );
  // student details
  router.post("/api/v1/student/detail",
    authorization,
    student.Detail);

  // contact us
  router.post("/api/v1/contact-us", contact.newQuery);

  // verify Account with OTP
  router.post('/api/v1/verify/account',
    authorization,
    register_contollers.verifyAccount)

}
