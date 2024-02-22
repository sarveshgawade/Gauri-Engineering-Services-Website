import user from "../models/userModel.js";

const register = async (req,res,next) => {
    const {fullName,email,password,role} = req.body

    if(!fullName || !email || !password){
        res.status(500).json({
            success: false ,
            message: 'Please provide all details'
        })
    }

    const userExists = await user.findOne({email})

    if(userExists){
        res.status(500).json({
            success: false ,
            message: 'User already exists'
        })
    }

    const newUser = await user.create({
        fullName,
        email,
        password,
        role
    })

    if(!newUser){
        res.status(500).json({
            success: false ,
            message: 'Error in creating new user !'
        })
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
