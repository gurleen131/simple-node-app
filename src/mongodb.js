const mongoose=require("mongoose")

mongoose.connect("mongodb://localhost:27017/login-signup-db")
.then(()=>{
    console.log('mongoose connected');
})
.catch((e)=>{
    console.log('failed');
})

const logInSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const LogInCollection = mongoose.model('LogInCollection', logInSchema, 'LogInCollection');

module.exports = LogInCollection; 