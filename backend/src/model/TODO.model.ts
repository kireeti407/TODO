import mongoose from "mongoose";

const TodoSchema=new mongoose.Schema({
    task:{
        type:String,
        require:true
    },
    complete:{
        type:Boolean,
        default:false
    },
    date:{
        type:Date,
        default:new Date().toISOString()
    },
    email:{
        type:String,
        require:true
    }
})

const TODO=mongoose.model("TODO",TodoSchema)

export default TODO