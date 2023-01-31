const mongoose = require('mongoose')

const userModel = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        min:3,
        max:20,
    },
    position:{
        type:String,
        required:true,
        max:10,
    },
    
    password:{
        type:String,
        required:true,
        min:6,
    },
    
},
{ versionKey: false }
)
const codeBlockModel = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        min:3,
        max:20,
    },
    code:{
        type:String,
        required:true,
        },
    exercise:{
        type:String,
        required:true,
        },
    solution:{
        type:String,
        required:true,
        },
    
},
{ versionKey: false }
)


const users = mongoose.model('User',userModel)
const codes = mongoose.model('Cod',codeBlockModel)


module.exports ={
    users,
    codes
}