const mongo = require('mongoose');
const sch = mongo.Schema;  
let userinfo = require('../model/user.model');
let leadSales = mongo.Schema({
    id:{
        type : sch.Types.ObjectId, 
        ref:'userinfo' 
    },
    leadTotal : {
        type : Number,
        required : true,
    }
});

module.exports = mongo.model('leadsales',leadSales);
