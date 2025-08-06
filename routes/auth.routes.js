import { Router } from "express";
import { login, register, sendmail } from "../controller/auth.controller.js";

const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/sendmail", sendmail);


export default authRouter;
