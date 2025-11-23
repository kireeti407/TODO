import mongoose from "mongoose";

const DB=async()=>{
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/TASK") //env
        console.log("DB connected....")
        
    }
    catch(err){
        console.log("error during DB connection",err)
    }
}

export default DB
