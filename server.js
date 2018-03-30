// Pre Buileded Modules
let express = require('express');
let app = express();
let mongo = require('mongoose');

// Own Imports
let environment = require('./server/config/app.config');


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


// Port Setuping
app.listen(environment.serverport);


// --- Extra Api Server Code
// var jwt = require('jsonwebtoken');
// app.get('/loginuser',check()function(req,res){
//     res.send('asdsad'); 
//     // const user =
//     const tokken = jwt.sign({'id': 5},'mytokken');
//     res.send(tokken);
// });