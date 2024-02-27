import {Router} from 'express'
import { authorizedRoles, isLoggedIn } from '../middleware/authorizationMiddleware.js'
import {addProduct, getAllProducts, removeProduct,getProductById} from '../controllers/productController.js'

// getting instance of router
const router = Router()

// routes
router.get('/',getAllProducts)
router.post('/add-product',isLoggedIn,authorizedRoles('ADMIN'),addProduct)
router.delete('/remove-product',isLoggedIn,authorizedRoles('ADMIN'),removeProduct)
router.get('/view-product/:productId',getProductById)


export default router
