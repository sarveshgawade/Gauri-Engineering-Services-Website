import user from "../models/userModel.js";
import customAppError from "../utils/errorUtil.js"; 


const cookieOptions = {
    maxAge: 1*24*60*60*1000,
    httpOnly: true,
    secure: false
}

const register = async (req,res,next) => {
    try {
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

        // generate token
        const token = await newUser.generateJWTtoken()

        // insert token into cookie
        res.cookie('generated-token',token,cookieOptions)

        newUser.password = undefined
        
        res.status(200).json({
            success: true ,
            message: 'New user registered succesfully !',
            newUser
        })
    } catch (error) {
        return next(new customAppError(500,error.message))
    }
}

const login = async (req,res,next) => {
    try {
        const {email,password} = req.body

        if(!email || !password){
            return next(new customAppError(500,'All fields are required'))
        }

        const existingUser = await user.findOne({email})
        .select('+password')

        if(!existingUser || ! (await existingUser.comparePassword(password))){
            return next(new customAppError(500,'email or password does not match !'))
        }

        const token = await existingUser.generateJWTtoken()

        res.cookie('generated-token',token,cookieOptions)

        existingUser.password = undefined

        res.status(200).json({
            success: true ,
            message: 'logged in successfully' ,
            existingUser
        })

    } catch (error) {
        return next(new customAppError(500,error.message))
    }
}

const logout = async (req,res) => {
    res.cookie('generated-token',null,{
        secure: true,
        maxAge: 0 ,
        httpOnly: true
    })

    res.status(200).json({
        success: true ,
        message: 'Logged out successfully !'
    })
}


export {register,login,logout}
