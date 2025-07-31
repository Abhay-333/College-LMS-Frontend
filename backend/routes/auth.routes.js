import express, { Router } from "express";
import {
  getUserData,
  Home,
  login,
  logout,
  signUp,
} from "../controllers/auth.controller.js";
import { checkAuth } from "../middlewares/checkAuth.js";

const authRouter = express(Router());

authRouter.get("/", Home);
authRouter.post("/signup", signUp);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.get("/getUser", checkAuth, getUserData);

export default authRouter;