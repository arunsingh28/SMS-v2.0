import { Express } from "express";
import adminController from "../controllers/admin.controller";
import authorization from "../middleware/shield.middleware";

export default function (router: Express) {
  router.post("/admin/v1/login", adminController.Login);
  router.post("/admin/v1/register", adminController.Register);
  router.post(
    "/admin/v1/accountTerminate",
    authorization,
    adminController.AccountTerminate
  );
}
