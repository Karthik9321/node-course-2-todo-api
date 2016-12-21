const mongoose = require('mongoose');
var User = mongoose.model('User', {
    First_Name:{
        type:String,
        required:true,
        trim:true,
        minlength:1
    },
    Last_Name: {
    type:String,
    required : true,
    trim:true,
    minlength:1
    },
    
    email:{
      type: String,
      required:true,
      trim:true,
      minlength:5
    },
    
    
    age:{
        type:Number
    },
    
    Home_Address:{
        type:String,
        minlength: 10
    },
    
    Office_Address:{
        type:String,
        minlength:10,
    }


});


module.exports={User};