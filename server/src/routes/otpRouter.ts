import { Express } from "express";
import otpController from "../controllers/sendOtp";
import authorization from "../middleware/auth.middleware";

export default function (router: Express) {
    router.get("/api/v1/resetpassword/otp", authorization, otpController.sendOtpforResetPassword);
    router.post("/api/v1/forgotpassword/otp", otpController.sendOtpForForgotPassword);
    router.post("/api/v1/m/message", otpController.sendMessage)
}
