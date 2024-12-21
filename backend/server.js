import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRoute.js"
import 'dotenv/config.js'

//ap config
const app = express()
const port =process.env.PORT || 4001

//middlewares
app.use(express.json())
app.use(cors())

//DB Connection
connectDB()
//api endpoint
app.use("/api/food", foodRouter)
app.use("/images",express.static('uploads'))
app.use("/api/user",userRouter)


app.get("/", (req, res) => {
    res.send("API works")
})

app.listen(port,()=>{
    console.log(`listening on port  http://localhost:${port}`)
})
 
  