const express = require('express');
const { resolve } = require('path');
const mongoose=require("mongoose")
const UserModel=require("./schema")
const cors=require("cors")

const app = express();
require('dotenv').config()
const PORT=8014

app.use(cors())


let connection= mongoose.connect(process.env.mongoURL)

app.use(express.static('static'));

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});


app.post("/menu",async(req,res) => {

  const {name,description,price}=req.body
  payload={name,description,price}


  try {
    let newItem=UserModel(payload)
    await newItem.save()
    res.send({"message":"Menu item added!"})

    if(!name || !price){
      return res.send({error:"Name and price are required."})
    }
  } catch (error) {
    console.log(error)
    res.send({error:"error"})
    
  }
})



app.get("/menu",async(req,res)=> {
  try {
    const items=await UserModel.find()
    res.send(items)
  } catch (error) {
    console.log(error)
    res.send({error:"Failed to fetch menu items "})
    
  }
})



app.listen(PORT,async()=>{
  try{
    await connection;
      console.log("Successfully connected to mongoDb")
  }
  catch(error){
      console.log(error)
}
  console.log(`Server is running on port ${PORT}`)
})