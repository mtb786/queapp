let usermodel = require('../model/user.model');

module.exports={
    LoginVerification : function(req,res) {
        try {
            let user = usermodel();
            let id = req.id;
            let password = req.password;
            user.id  = id;
            user.password  = password;
            user.save((error) =>{
                if(error) {
                    res.status(400).send({ status : false , message: error});
                } else {
                    res.status(200).send({status : true, message:'user Login' });
                }
            })  
        }catch(err) {
            return res.status(400).send({message:error});
        }
    } 
}
