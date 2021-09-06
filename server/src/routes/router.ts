import register_contollers from "../controllers/L&R.controller";
import user_contollers from "../controllers/user.private";
import student from "../controllers/student";
import { Express } from "express";
import authorization from "../middleware/shield.middleware";

import multer from "multer";
import multerS3 from "multer-s3";
import AWS from "aws-sdk";

declare var process: {
  env: {
    AWS_ACESS_KEY: string;
    AWS_SECRET_KEY: string;
    AWS_BUCKET_NAME: string;
  };
};

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});

const upload = multer({
  storage: multerS3({
    s3,
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
export default function (router: Express) {
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
   * @use not in use
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
   * @method post
   *
   * for checking user? recovery :  create new password
   *
   */
  router.post("/api/forgot-password", register_contollers.forgotPassword);

  /**
   * @private routes
   * @method post
   *
   * for updating password
   *
   */
  router.post(
    "/api/update-password",
    authorization,
    register_contollers.updatePassword
  );

  /**
   * @private routes
   * @method post
   *
   * for add profile imgage
   *
   */
  router.post(
    "/api/user/add-profile",
    authorization,
    upload.single("file"),
    user_contollers.addProfile
  );

  /**
   * @private routes
   * @method post
   *
   * for deleteing profile imgage
   *
   */
  router.get(
    "/api/user/delete-profile",
    authorization,
    user_contollers.removeProfile
  );

  /**
   * @private routes
   * @method post
   *
   * for update profile imgage
   *
   */
  router.post(
    "/api/user/update-profile",
    authorization,
    upload.single("file"),
    user_contollers.updateProfile
  );

  router.post("/api/student/detail", authorization, student.Detail);
}
