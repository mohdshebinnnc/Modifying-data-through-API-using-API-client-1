const mongoose=require("mongoose")
const { type } = require("os")

const menuSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    price:{
        type:Number,
        required:true
    }
},{
    timestamps:true
})

const Menu=mongoose.model("menu",menuSchema)
module.exports=Menu 
