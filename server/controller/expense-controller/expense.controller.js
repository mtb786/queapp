const expenseType = require('../../model/expense-model/expense-type.model')
const expenseCategory = require('../../model/expense-model/expense-category.model');

module.exports = {

    ExpenseTypeAdd: function (req, res) {
        try {
            console.log('EXpense TYPE ADD');

            let expense_type = new expenseType();

            expense_type.user = req.body.userID;
            expense_type.name = req.body.name;

            expense_type.save((err) => {
                if (err) {
                    res.status(400).send({ status: false, msg: 'Expense Type Not Added' });
                } else {
                    res.status(400).send({ status: true, msg: 'Expense Type Added' });
                }
            })

        } catch (err) {
            return res.status(400).send({ message: error });
        }


    },
    ExpenseCategoryAdd: function (req, res) {
        try {
            console.log('EXpense Category ADD');
            let expensecategory = expenseCategory(); 
            expensecategory.expense_type  = req.body.expense_type;
            expensecategory.name  = req.body.name;
            
            expensecategory.save((err)=> {
                if(err) {
                    res.status(400).send({
                        status : false,
                        message : 'Expense Category Not Added'
                    });
                }else {
                    res.status(200).send({
                        status : true,
                        message : 'Expense Category Added'
                    })
                } 
            })


        }catch(errs) {
            console.log(errs);
            res.status(400).send(errs);
        }
    },
    ExpenseCategoryList : function(req,res) {
            try {
                expenseCategory.find((err,suceessData)=> {
                        if(err) {
                            res.status(400).send({status:false});
                        } else {
                            res.status(200).send({status : true,data : suceessData});    
                        } 
                });
            }catch(error) {
                res.status(400).send(error);
            }
    }

};



