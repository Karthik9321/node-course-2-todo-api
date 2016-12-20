//
//app.post('/user', (req,res)=>{
//    var user=new User({
//        name: req.body.name,
//        email:req.body.email,
//        age: req.body.age
//        
//    });
//    
//    user.save().then((docs)=>{
//        res.send(docs);
//    }).catch((e)=>{
//        res.status(400).send(e);
//    });
//});