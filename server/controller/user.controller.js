let usermodel = require('../model/user.model');

module.exports = {
    LoginVerification: function (req, res) {

        try {
            let user = usermodel();
            let id = req.body.id;
            let password = req.body.password;
            let modetype = req.body.modetype;
            let type = req.body.type;

            user.id = id
            user.password = password;
            user.modetype = modetype;
            user.type = type;
            user.save((error) => {
                if (error) {
                    res.status(400).send({ status: false, message: error });
                } else {
                    res.status(200).send({ status: true, message: 'User Added Sucessfully' });
                }
            })
        } catch (err) {
            return res.status(400).send({ message: error });
        }
    },
    UserDetails: function (req, res) {
        try {
            usermodel.find().exec().then(function (collectionResponse, collectionError) {
                if (collectionError) {
                    res.status(400).send({ status: false, message: collectionError });
                } else {
                    res.status(200).send({ status: true, data: collectionResponse });
                }
            })
        } catch (err) {
            return res.status(200).send({ message: error })
        }
    },
    UserUpdate: function (req, res) {
        try {
            var query = { 'id': req.body.id };
            if(query['id'] !== undefined) {
                var data = { 'modetype' : req.body.modetype } ;
                usermodel.findOneAndUpdate(query, data, function (err, doc) {
                    console.log(doc);
                    if (err) { return res.send(500, { error: err });
                } else {
                    return res.send(200,{status : true , message : 'User is updated' });
                }
                });    
            } else {
                return res.send(200,{status : true, message : 'User id is missing'});
            }
            
        } catch (err) {

        }
    } ,
    UserLogin : function(req, res) {
        try {
           
              usermodel.findOne({'id' : req.body.id ,'password' : req.body.password }, function (errs,obj) {
                  if(errs) {
                      return res.status(400).send({'message' : errs});
                  } else {
                      if(!obj) {
                        return res.status(200).send({ 'login' : false, 'message' : 'Not Valid Login','errs' : errs });   
                      } else {
                          if(obj['modetype'] === 'active') {
                        return res.status(200).send({'status' : true , 'login' : true , 'message' : 'Valid Login' });   
                          } else {
                            return res.status(200).send({'status' : false , 'login' : true , 'message' : 'User Is Not In Active Mode ' });     
                          }
                      }
                  }
                })  
        } catch(err) {
            return res.status(400).send({'message' : err});
        }
    }

}
