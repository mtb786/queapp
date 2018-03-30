let mongo = require('mongoose');

let user = mongo.Schema({
id : {
    type : String,
    required : true,
    unique : true
},
password : {
    type : String,
    required : true,
    unique : true
}

});
module.exports = mongo.model('user', user);