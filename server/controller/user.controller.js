let usermodel = require('../model/user.model');

module.exports={
    LoginVerification : function(req,res) {

        try {
            let user = usermodel();
            let id = req.body.id;
            let password = req.body.password;
            let modetype = req.body.modetype;
            let type = req.body.type;
            
            user.id  =id
            user.password  = password;
            user.modetype = modetype;
            user.type = type;
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
    },
    UserDetails : function(req, res) {
        try {
            usermodel.find().exec().then(function(collectionResponse,collectionError){
                if(collectionError) {
                    res.status(400).send({status : false , message :collectionError });
                } else {
                    res.status(200).send({status: true , data : collectionResponse});
                }
            })
        }catch(err) {
            return res.status(200).send({message : error})
        }
    } 

}
