import { Router } from "express";
import { login, register } from "../controllers/userController.js";


// taking instance of router
const router = Router()

// routes
router.post('/register',register)
router.post('/login',login)
router.post('/login',login)

export default router