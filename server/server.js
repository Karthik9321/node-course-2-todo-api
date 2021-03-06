require('./config/config');
var express = require('express');
var bodyParser = require('body-parser');
const {ObjectID}=require('mongodb');
const _ = require('lodash');
const jwt = require('jsonwebtoken');

var {mongoose}=require('./db/mongoose');
var{Todo} = require('./models/todo');
var{User} = require('./models/user');
var {authenticate}=require('./middleware/authenticate');

var app = express();

const port = process.env.PORT; 


app.use(bodyParser.json());

app.post('/todos', (req,res)=>{
     var todo = new Todo({
        text: req.body.text
    });


    
todo.save().then((docs)=>{
    res.send(docs);
},(e)=>{
    res.status(400).send(e);
    });
});


app.get('/todos', (req,res)=>{
    Todo.find().then((todos)=>{
        res.send({todos});
    }).catch((e)=>{
    res.status(400).send(e);
});
});

app.get('/todos/:id', (req,res)=>{
    var id = req.params.id;
    
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }
    
    Todo.findById(id).then((todo)=>{
        if(!todo){
            return res.status(404).send();
        }

        res.send({todo});
    }).catch((e)=>{
        res.status(400).send();
    });
    
});

app.delete('/todos/:id', (req,res)=>{
    var id= req.params.id;
    
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }
    
    Todo.findByIdAndRemove(id).then((del)=>{
        if(!del){
            return res.status(404).send();
        }
        res.send({del});
    }).catch((e)=>{
        res.status(404).send();
    });
});


app.patch('/todos/:id', (req,res)=>{
    var id= req.params.id;
    var body = _.pick(req.body, ['text','completed']);
    
    
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }
    
    
    if(_.isBoolean(body.completed) && body.completed){
        body.completedAt=new Date().getTime();
    }else{
        body.completedAt=null;
        body.completed=false;
    }
    
    Todo.findByIdAndUpdate(id,{
        $set:body}, {new:true}
    ).then((todo)=>{
        if(!todo){
            return res.status(404).send();
        }
        res.send({todo});
    }).catch((e)=>{
        res.status(400).send();
    });
});


//POST/users


app.post('/users', (req,res)=>{
    var body = _.pick(req.body,['email','password']);
    var user =new User(body);
    
    user.save().then((user)=>{
        return user.generateAuthToken();
    }).then((token)=>{
        res.header('x-auth', token).send(user);
    }).catch((e)=>{
        res.status(400).send(e);
    });
});




app.get('/users/me', authenticate, (req,res)=>{
    res.send(req.user);
});


//POST /users/ login {email,pass}

app.post('/users/login', (req,res)=>{
    var body = _.pick(req.body,['email','password']);
    User.findByCredentials(body.email, body.password).then((user)=>{
        return user.generateAuthToken().then((token)=>{
        res.header('x-auth', token).send(user);
       })
    }).catch((e)=>{
        res.status(400).send(e);
    });
});


//delete

app.delete('/users/me/token', authenticate, (req, res) => {
  req.user.removeToken(req.token).then(() => {
    res.status(200).send();
  }, () => {
    res.status(400).send();
  });
});

app.listen(port, ()=>{
    console.log('Started on port: ' ,port);
});

module.exports = {app};