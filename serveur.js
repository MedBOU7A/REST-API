const express= require("express")
const app =express()
const connectDB = require("./config/connectDB")
const user = require("./models/user")
require("dotenv").config({path:'./config/.env'})

app.use(express.json())
connectDB()
const port = process.env.port || 5000 


app.post("/add",async(req,res)=>{
    const {firstName,lastName,email,phone,passWord}=req.body
try {
    const newUser = new user({
        firstName,
        lastName,
        email,
        phone,
        passWord
    })
    await newUser.save()
    res.send(newUser)
} catch (error) {
    console.log(error.message)
}
})


app.get('/getUsers',async(req,res)=>{
    try {
        const users  = await user.find()
        res.send(users)
    } catch (error) {
    console.log(error.message)
        
    }
})

app.delete("/deleteUser/:id",async(req,res)=>{
    try {
        const specificUser = await user.findByIdAndDelete(req.params.id)
        res.send(`${specificUser.firstName} has been deleted!`)
    } catch (error) {
    console.log(error.message)
        
    }
})

app.put("/edit/:id",async(req,res)=>{
    try {
        const editedUser = await user.findByIdAndUpdate(req.params.id,{...req.body},{new:true})
        res.send(editedUser)
    } catch (error) {
    console.log(error.message)
        
    }
})


app.listen(port, (err) =>
  err ? console.error(err) : console.log(`server is running on port ${port}`)
);