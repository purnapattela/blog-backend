import { Router } from 'express'
import {signupController,loginController,profileController,logoutController} from "../controllers/user.controller.js"
import AuthenticationMiddleware from "../middlewares/Authentication.middleware.js"

const userRoutes = Router()

userRoutes.post("/signup",signupController)
userRoutes.post("/login", loginController)
userRoutes.get("/profile",AuthenticationMiddleware,profileController)
userRoutes.post("/logout", AuthenticationMiddleware, logoutController)

export default userRoutes