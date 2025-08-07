import { Router } from "express";
import { getUsers, login, register, sendmail, verifyemail } from "../controller/auth.controller.js";

const authRouter = Router();

authRouter.get("/", getUsers);
authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/sendmail", sendmail);
authRouter.post("/verifyemail",verifyemail)

export default authRouter;
