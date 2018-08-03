let mongo = require('mongoose');

let user = mongo.Schema({
id : {
    type : String,
    required : true,
    unique : true
},
name : {
    type : String,
    required : true
},
password : {
    type : String,
    required : true
},
modetype: {
	type : String,
    required :true,
    enum :["active","inactive"]
} ,
type: {
	type : String, 
	required: true ,
	enum :["admin","primary","super","secondary"]
},
created: {
	type : String, 
	required: true
}

});
module.exports = mongo.model('userinfo', user);