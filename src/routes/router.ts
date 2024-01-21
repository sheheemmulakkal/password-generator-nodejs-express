import { Router } from "express";
import controller from "../controllers/controller";

const router = Router();

router.post("/generate-password", controller.generatePassword);
router.get("/get-my-passwords", controller.getMyPasswords);
router.post("/send-mail", controller.sendMail);

export default router;
