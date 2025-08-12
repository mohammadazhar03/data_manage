const { type } = require('express/lib/response');
const mongoose=require('mongoose');
const enquirySchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:4,
        maxlength:20
        
    },
    password:{
        type:String,
        required:true,
        unique:true  
    },
    email:{
        type:String,
        required:true, 
        unique:true   
    },
    address:{
        type:String,
        required:true,
        
    },
    city:{
        type:String,
        required:true,
    }
    
    
})
const enquiryModel= mongoose.model('enquiryCollection',enquirySchema);
module.exports=enquiryModel;