const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const morgan = require("morgan")
const route = require("./routes/routes")
const categoryRoute = require("./routes/categoryRoute")
const productRoutes= require("./routes/productRoutes")
const cors = require("cors")



const app = express()

//middlewares
app.use(cors())
app.use(express.json())
app.use(morgan("dev"))


dotenv.config()

//CONNECTION TO DB
mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("mongoDB is connected"))
.catch((err)=>console.log(err))

app.use("/", route)
app.use("/category", categoryRoute)
app.use("/product", productRoutes)




const PORT = process.env.PORT

app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`)})