interface Task{
    id:Number,
    task:String,
    complete:boolean
    date:Date
}



let TODO:Array<Task>=[]

export const gettodo:any=()=>{
    return TODO
}
