import express from "express";
import {router as UserRouter} from "./routes/user.js"
import { router as ProductRouter } from "./routes/product.js";
import { router as orderRouter } from "./routes/order.js";
import { main as Database } from "./Database.js";
import cors from 'cors'

const port=3001;
const app=express();
app.use(cors())

app.use(express.json())
app.use(UserRouter)
app.use(ProductRouter)
app.use(orderRouter)

app.get("/",(req,res)=>{
    res.send("HEy fucker !! I am running here")
})

app.listen(port,()=>{
    console.log("Hey!! Fucker")
})