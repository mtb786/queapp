const mongo = require('mongoose');
const user = require('../model/user.model');
const schema = mongo.Schema;

let department = mongo.Schema({
'dep_Id' : {
    type : Number,
    required : true,
    unique : true
},
'dep_Name' : {
    type : String,
    required : true
},
'dep_Location' : {
    type : String,
    required : true
},
'dep_Description' : {
    type : String,
    required : false
},
'created_By' : {
   type : schema.Types.ObjectId,
   ref : 'userinfo'
}
});


module.exports = mongo.model('department',department);