import app from "./app.js"
import { config } from "dotenv";
config()

const PORT = process.env.PORT || 5250

app.listen(PORT,()=>{
    console.log(`Server started at port:${PORT} `);
})

