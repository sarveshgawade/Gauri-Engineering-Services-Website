import express from 'express'
import connectToDB from './config/connectToDB.js'

// taking instance of express
const app = express()

// connecting to DB
connectToDB()

export default app