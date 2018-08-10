const express = require('express');
const router = express.Router();
const expense = require('../../controller/expense-controller/expense.controller');


router.post('/expenseTypeADD',expense.ExpenseTypeAdd);
router.post('/ExpenseCategoryAdd',expense.ExpenseCategoryAdd);

module.exports= router;