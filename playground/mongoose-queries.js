const {mongoose} = require('./../server/db/mongoose');
const {Todo}=require('./../server/models/todo');
const {User}=require('./../server/models/user');

const{ObjectID}=require('mongodb');

//var id= '5858a8c5f79a1d1ae722815d'; 
//if(!ObjectID.isValid(id)){
//    console.log('ID not valid');
//}


//Todo.find({
//    _id: id
//}).then((todos)=>{
//    console.log('Todos', todos);
//});
//
//
//Todo.findOne({
//    _id: id
//}).then((todo)=>{
//    console.log('Todo', todo);
//});
//
//
//Todo.findById(id).then((todo)=>{
//    if(!todo){
//        console.log('id not found');
//    }
//    console.log('Todo by ID', todo);
//}).catch((e)=>{
//    console.log(e)
//});

User.findById('5858b76f5b56e222df4cefac').then((user)=>{
  if(!user){
      return console.log('Unable to find user');
  }  

     console.log(JSON.stringify(user, undefined, 2));                                        
}).catch((e)=>{
    console.log(e);
});