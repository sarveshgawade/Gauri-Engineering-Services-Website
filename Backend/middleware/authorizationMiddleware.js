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

export {isLoggedIn}