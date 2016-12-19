const mongoose=require('mongoose');

mongoose.Promise=global.Promise;

mongoose.connect('mongodb://localhost:27017/TodoApp');

var Todo = mongoose.model('Todo',{
    text: {
        type:String,
        required: true,
        minlength: 1,
        trim: true
    },
    
    completed:{
        type:Boolean,
        default: false
    },
    
    completedAt:{
        type:Number,
        default:null
    }
});

var newTodo= new Todo({
   text:"Cook Dinner" 
});


newTodo.save().then((result)=>{
    console.log(result);
}).catch((e)=>{
   console.log('Unable to save todo'); 
});

var Todo2= new Todo({
    text: 'Buy movie tickets',
    completed: true,
    completedAt: 123
});

Todo2.save().then((result)=>{
    console.log(result);
});