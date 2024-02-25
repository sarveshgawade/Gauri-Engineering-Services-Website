import user from "../models/userModel.js";
import customAppError from "../utils/errorUtil.js"; 
import sendEmail from '../utils/sendMail.js'

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
        res.cookie('token',token,cookieOptions)

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

        res.cookie('token',token,cookieOptions)

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
    res.cookie('token',null,{
        secure: true,
        maxAge: 0 ,
        httpOnly: true
    })

    res.status(200).json({
        success: true ,
        message: 'Logged out successfully !'
    })
}

const getProfile = async (req,res,next) => {
    try {
        const userId = req.user.id 

        const userFromDB = await user.findById(userId)

        res.status(200).json({
            success:true,
            message: 'user found !',
            userFromDB
        })
    } catch (error) {
        return next(new customAppError(500,'failed to fetch profile'))
    }
}

const forgotPassword = async (req,res,next) => {
    const {email} = req.body

    if(!email){
        return next(new customAppError(500,'Please provide email !'))
    }

    const userFromDB = await user.findOne({email})

    if(!userFromDB){
        return next(new customAppError(500,'user not found !'))
    }

    const resetToken = await userFromDB.generatePasswordResetToken()

    // save user in DB along with resetToken
    await userFromDB.save()

    const resetPasswordURL = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`

    const subject = 'Reset Password'

    const message = `You can reset your password by clicking <a href=${resetPasswordURL} target="_blank">Reset your password</a>\nIf the above link does not work for some reason then copy paste this link in new tab ${resetPasswordURL}.\n If you have not requested this, kindly ignore.`;

    try {
         await sendEmail(email,subject,message) 

         res.status(200).json({
            success : true,
            message: `Reset password token has been sent to ${email} successfully`
         })
    } catch (error) {
        user.forgotPasswordExpiry = undefined
        user.forgotPasswordToken = undefined

        await userFromDB.save() 

        return next(new customAppError(500,error.message))
    }
}

export {register,login,logout,getProfile,forgotPassword}
