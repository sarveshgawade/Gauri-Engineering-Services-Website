import express from 'express'
import connectToDB from './config/connectToDB.js'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import userRoute from './routes/userRoute.js'

// taking instance of express
const app = express()

// connecting to DB
connectToDB()

// middlewares
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(morgan('dev'))

// routes
app.use('/user',userRoute)

export default app