import { Express } from "express";
import adminController from "../controllers/admin.controller";
import authorization from "../middleware/auth.middleware";
import Detail from '../controllers/student'
import sms from '../utils/SMS'

export default function async(router: Express) {
  router.post("/admin/v1/login", adminController.Login);
  router.post("/admin/v1/register", adminController.Register);
  router.post(
    "/admin/v1/accountTerminate",
    authorization,
    adminController.AccountTerminate
  );
  router.get('/all', Detail.Detail)
  router.get('/count', Detail.CountUser)
  router.get('/sms', sms)
}
