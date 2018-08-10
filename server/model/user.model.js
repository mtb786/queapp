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
	enum :["admin","user","superadmin"]
},
created_on :  {
        type: Date,
        required : true,
        default: Date.now
},
modified_on : {
    type: Date,
    required : true,
    default: Date.now
}

});
module.exports = mongo.model('userinfo', user);