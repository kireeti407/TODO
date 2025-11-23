import express from "express";
import todoRouter from "./router/Todo.route";
import cors from 'cors'
import DB from "./config/DB.config";
import userRouter from "./router/user.route";
import dotenv from "dotenv";

dotenv.config();

const app=express()

app.use(express.json())

app.use(cors());

DB()
app.use('/TODO',todoRouter)

app.use('/TODO',userRouter)

app.get('/test',(req:any,res:any)=>{
    try{
        res.status(200).send("server is running")
    }
    catch(err){
        res.status(400).send("somthing went wrong")
    }
})

const port = process.env.PORT || 3000;

app.listen(port,()=>{
    console.log(`server run on port no ${port}`)
})


