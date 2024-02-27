import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
    // productId: {
    //     type: String ,
    //     required: [true,`Product ID is required`],
    //     unique: true
    // },
    productName: {
        type: String ,
        required: [true,`Product Name is required`],
    },
    description:{
        type: String,
        required: [true,`Description is required`]
    },
    // thumbnail:{
    //     public_id: {
    //         type: String,
    //         required: true
    //     },
    //     secure_url: {
    //         type: String,
    //         required: true
    //     }
    // },
},{
    timestamps:true
})

const Product = mongoose.model('Products',productSchema)

export default Product