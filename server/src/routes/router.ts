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

  // test of file uplaod
  router.post('/api/v1/addProfile/:id', authorization, awsFile.uploadImage.single('pro_img'), fileControllers.addProfileImage)
  router.delete('/api/v1/removeProfile/:id', authorization, fileControllers.deleteProfileImage)

  /**
   * @public routes
   * @method post
   *
   * for login without token
   *
   */
  router.post("/api/login", register_contollers.login);


  /**
   * @public routes
   * @method post
   *
   * for register new user
   *
   */
  router.post("/api/register", register_contollers.register);

  /**
   * @public routes
   * @method get
   *
   * logout and destroy token
   *
   */
  router.get("/api/logout", register_contollers.logout);

  /**
   * @public routes
   * @method post
   *
   * verify user token and send back user data
   *
   */
  router.get("/api/verify", authorization);

  /**
   * @private routes
   * @method 
   *
   * for checking user? recovery :  create new password
   *
   */
  router.put("/api/forgot-password", register_contollers.forgotPassword);

  /**
   * @private routes
   * @method patch
   *
   * for updating password
   *
   */
  router.put(
    "/api/reset-password",
    authorization,
    register_contollers.resetPassword
  );


  router.post("/api/student/detail", authorization, student.Detail);

  /**
   * @public routes
   * @method post
   *
   * for query or contact-us
   *
   */
  router.post("/api/contact-us", contact.newQuery);

  router.get('/api/refreshToken', jwtRefreshToken)

  router.post('/api/otp/forgot/:email', register_contollers.verifyForgotOTP)

}
