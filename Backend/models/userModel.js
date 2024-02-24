import mongoose, { model } from "mongoose";
import jwtToken from 'jsonwebtoken'
import bcrypt from  'bcrypt'
import {config} from 'dotenv'
config()

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true,'Name is a required field !']
    },
    email:{
        type: String,
        required: [true,'Email is a required field !'],
        trim : true,
        unique: true ,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please fill in a valid email address'
          ]
    },
    password: {
        type:'String',
        required: [true,`Password is a required field`] ,
        trim: true ,
        select : false   ,
        minLength : [6,`Password must be atleast of 6 characters`]
        
        // select: false => whenever a user requests data don't give password with the data by default, only give if it is explicitly required
    },
    role: {
        type: String,
        enum: ['USER','ADMIN'],
        default: 'USER'
    }

},{
     timestamps:true
})

// PASSWORD ENCRYPTION
userSchema.pre('save', async function(next) {
    if(!this.isModified('password')){
        return next()
    }
    this.password =  await bcrypt.hash(this.password,7)
})

// TOKEN GENERATION CUSTOM METHODS
userSchema.methods = {
    generateJWTtoken :  function(){
        return  jwtToken.sign(
            {
                id : this._id ,
                email : this.email ,
                fullName : this.fullName,
                role: this.role ,
            },
            process.env.SECRET,
            {
                expiresIn: process.env.JWT_EXPIRY
            }
        )
    },
    comparePassword: async function(plaintextPassword){
        return await bcrypt.compare(plaintextPassword,this.password)
    }
}

const user = model('USER',userSchema)

export default user