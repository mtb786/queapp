const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const profileSchema = new Schema({
 user :{
     type : Schema.Types.ObjectId,
     ref : 'userinfo'
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
 } 

});

module.exports= UserProfile = mongoose.model("userprofile",profileSchema);
