import Product from "../models/productModel.js"
import customAppError from '../utils/errorUtil.js'

const getAllProducts = async (req,res,next) => {
    try {
        const products = await Product.find() 

        if(!products){
            return next(new customAppError(500,'error in fetching products'))
        }

        res.status(200).json({
            success: true ,
            message: 'fetched all products sucessfully !',
            products
        })
    } catch (error) {
        return new customAppError(500,error.message)
    }
}

const addProduct = async(req,res,next) => {
    try {
        const {productId,productName,description,thumbnail} = req.body

        if(!productId || !productName || !description){
            return next(new customAppError(500,'All fields are required'))
        }

        const productExists = await Product.findOne({productId})

        if(productExists){
            return next(new customAppError(500,'Product already exists'))
        }

        const newProduct = await Product.create({
            productId,
            productName,
            description,
            // thumbnail
        })

        if(!newProduct){
            return next(new customAppError(500,'AError in creating new product'))
        }

        await newProduct.save()

        res.status(200).json({
            success: true ,
            message: 'new product created successfully !',
            newProduct
        })


    } catch (error) {
        return next(new customAppError(500,error.message))
    }
}


export {getAllProducts,addProduct}