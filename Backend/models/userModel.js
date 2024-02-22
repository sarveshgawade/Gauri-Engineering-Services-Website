import mongoose, { model } from "mongoose";

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

const user = model('USER',userSchema)

export default user