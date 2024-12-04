import express from "express"
import cors from "cors"

//ap config
const app = express()
const port =4000

//middlewares
app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.send("API works")
})

app.listen(port,()=>{
    console.log(`listening on port htt http://localhost:${port}`)
})

//mongodb+srv://eatoid:<db_password>@cluster0.b6ruz.mongodb.net/?