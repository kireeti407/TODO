import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()

const DB=async()=>{
    try{
        await mongoose.connect(process.env.URI!) 
        console.log("DB connected....")
        
    }
    catch(err){
        console.log("error during DB connection",err)
    }
}

export default DB
