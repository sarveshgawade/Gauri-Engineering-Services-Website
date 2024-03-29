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
        const {productName,description,thumbnail} = req.body

        if( !productName || !description){
            return next(new customAppError(500,'All fields are required'))
        }

        // const productExists = await Product.findOne({productId})

        // if(productExists){
        //     return next(new customAppError(500,'Product already exists'))
        // }

        const newProduct = await Product.create({
            // productId,
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

const removeProduct = async (req,res,next) => {
    try {
        const {id} = req.params

        // if(!productId){
        //     return next(new customAppError(500,'please provide productId'))
        // }

        const productExists = await Product.findById(id)

        if(!productExists){
            return next(new customAppError(500,'product with given productId does not exists'))
        }

        const deletedProduct = await Product.findByIdAndDelete(id)

        if(!deletedProduct){
            return next(new customAppError(500,'error in deleting product'))
        }

        res.status(200).json({
            success: true,
            message: 'product deleted sucessfully !',
        })

    } catch (error) {
        return next(new customAppError(500,error.message))
    }
}


const getProductById = async (req,res,next) => {
    try {
        const {id} = req.params

        const product = await Product.findById(id)

        if(!product){
            return next(new customAppError(500,'product not found'))
        }

        res.status(200).json({
            success : true ,
            message: 'product found',
            product
        })
    } catch (error) {
        return next(new customAppError(500,error.message))
    }
}

export {getAllProducts,addProduct,removeProduct,getProductById}