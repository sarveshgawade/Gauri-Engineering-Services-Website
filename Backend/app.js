import express from 'express'

const app = express()

app.use('/',(req,res) => {
    res.status(200).send('home-page')
})

export default app