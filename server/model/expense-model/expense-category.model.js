const mongo = require('mongoose');
const Schema = mongo.Schema;

let expenseCategory = new Schema({
   expense_type : {
    type : Schema.Types.ObjectId,
    ref : 'expense_type'
   },
   name : {
       type : String,
       required : true
   } 
})


module.exports = EXPENSETYPE= mongo.model('expense_category',expenseCategory);
