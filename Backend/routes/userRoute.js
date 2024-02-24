import { Router } from "express";
import { getProfile, login, logout, register } from "../controllers/userController.js";
import { isLoggedIn } from "../middleware/authorizationMiddleware.js";


// taking instance of router
const router = Router()

// routes
router.post('/register',register)
router.post('/login',login)
router.get('/logout',logout)
router.get('/my-profile',isLoggedIn,getProfile)

export default router