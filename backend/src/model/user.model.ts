import mongoose, { mongo } from 'mongoose'

const UserSchema= new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    }
})

const USER=mongoose.model("user",UserSchema)

export default USER