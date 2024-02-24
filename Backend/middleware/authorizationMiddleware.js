import jwt  from "jsonwebtoken";
import customAppError from "../utils/errorUtil.js";

const isLoggedIn = async  (req,res,next) => {

    console.log(`req: ${req}`);
    console.log(`REQ.COOKIES: ${req.cookies}`);
    const {token} = req.cookies
    console.log(`token is: ${token}`);

    if(!token){
        return next(new customAppError(500,'unauthenticated user '))
    }

    const userDetails = await jwt.verify(token,process.env.SECRET)

    req.user = userDetails
    console.log(`REQQ.USER: ${req.user}`);

    next()
}

export {isLoggedIn}