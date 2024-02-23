import user from "../models/userModel.js";
import customAppError from "../utils/errorUtil.js"; 

const register = async (req,res,next) => {
    const {fullName,email,password,role} = req.body

    if(!fullName || !email || !password){
        return next(new customAppError(500,'Please provide all details'))
    }

    const userExists = await user.findOne({email})

    if(userExists){
        return next(new customAppError(500,'User already exists'))
    }

    const newUser = await user.create({
        fullName,
        email,
        password,
        role
    })

    if(!newUser){
        return next(new customAppError(500,'Error in creating new user'))
    }

    await newUser.save()

    newUser.password = undefined
    
    res.status(200).json({
        success: true ,
        message: 'New user registered succesfully !',
        newUser
    })
}

export {register}
