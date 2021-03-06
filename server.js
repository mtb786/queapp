// Pre Buileded Modules
let express = require('express');
let app = express();
let mongo = require('mongoose');
let bodypareser = require('body-parser');
// Own Imports
let environment = require('./server/config/app.config');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.use(bodypareser.json());
app.use(bodypareser.urlencoded({
    extended:true
}));

// Routing File Set for controller calling
require('./server/routes/app.routes')(app);


// Mongo Setuping 
mongo.Promise = global.Promise;
mongo.connect(environment.dburl,function(err) {
// res.send(err);
})



// base root set
app.get('/',function(req,res){
res.send('Welcome To QuoteApp');
});
// var port = process.env.PORT || 8080;

// Port Setuping
app.listen(3000);


// --- Extra Api Server Code
// var jwt = require('jsonwebtoken');
// app.get('/loginuser',check()function(req,res){
//     res.send('asdsad'); 
//     // const user =
//     const tokken = jwt.sign({'id': 5},'mytokken');
//     res.send(tokken);
// });