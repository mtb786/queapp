const mongo = require('mongoose');
const Schema = mongo.Schema;

let expenseType = new Schema({
    user : {
        type : Schema.Types.ObjectId,
        ref : 'userinfo'
    },
    name : {
        type : String,
        required : true
    }
});

module.exports = ExpenseCategory = mongo.model('expense_type',expenseType);
