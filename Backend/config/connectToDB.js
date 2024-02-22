import mongoose from "mongoose";
import { config } from "dotenv";
config()

const connectToDB = async() => {
    try {
        const {connection} = await mongoose.connect(process.env.MONGODB_URL)
        console.log(`connected to DB: ${connection.host}`);
    } catch (error) {
        console.log(`Error in connecting to Database : ${error}`);
    }
}

export default connectToDB