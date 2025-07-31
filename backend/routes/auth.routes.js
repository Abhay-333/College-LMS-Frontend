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
authRouter.post("/api/signup", signUp);
authRouter.post("/api/login", login);
authRouter.post("/api/logout", logout);
authRouter.get("/api/getUser", checkAuth, getUserData);

export default authRouter;