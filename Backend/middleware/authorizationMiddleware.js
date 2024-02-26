import jwt  from "jsonwebtoken";
import customAppError from "../utils/errorUtil.js";

const isLoggedIn = async  (req,res,next) => {

    const {token} = req.cookies

    if(!token){
        return next(new customAppError(500,'unauthenticated user '))
    }

    const userDetails = await jwt.verify(token,process.env.SECRET)

    req.user = userDetails

    next()
}

const  authorizedRoles = (...roles) => async (req,res,next) =>{
    const currentRole = req.user.role

    if(!roles.includes(currentRole)){
        return next(new AppError(500,`You do not the permission to access this route`))
    }

    next()
} 

export {isLoggedIn,authorizedRoles}