const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const profileSchema = new Schema({
 user :{
     type : Schema.Types.ObjectId,
     ref : 'userinfo',
     unique : true
 },
 firstname : {
     type : String,
     required : true
 },
 middlename : {
        type : String,
        required : false
 }, 
 lastname : {
    type : String,
    required : true
},
 country : {
     type : String,
     required : true
 } ,
 created_on : {
     type : Date,
     default : Date.now
 },
 created_by : {
    type : Date,
    default : Date.now
},
created_by : {
    type : Schema.Types.ObjectId,
    ref : 'userinfo'
}

});

module.exports= UserProfile = mongoose.model("userprofile",profileSchema);
