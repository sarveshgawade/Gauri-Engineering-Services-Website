import { Router } from "express";
import { register } from "../controllers/userController.js";


// taking instance of router
const router = Router()

// routes
router.post('/register',register)

export default router