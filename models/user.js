const mongoose =require('mongoose')
const Schema =mongoose.Schema


const userSchema = new Schema({
    firstName:String,
    lastName:String,
    email:String,
    phone:String,
    passWord:String,
    
})

module.exports= mongoose.model('user',userSchema)