    let usermodel = require('../model/user.model');
    let jwt = require('jsonwebtoken');
    const nodemailer = require('nodemailer');
    module.exports = {
        LoginVerification: function (req, res) {

            try {
                let user = usermodel();
                let id = req.body.id;
                let password = req.body.password;
                let modetype = req.body.modetype;
                let type = req.body.type;
                let location =req.body.location;
                let createdby =req.body.createdby;
                

                user.id = id
                user.password = password;
                user.modetype = modetype;
                user.type = type;
                user.location = location;
                user.createdby = createdby;
                
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
                usermodel.find().sort({"id" : 1}).then(function (collectionResponse, collectionError) {
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
                if (query['id'] !== undefined) {
                    const tokken = req.headers['tokken'];
                    console.log(tokken);
                    var data = { 'modetype': req.body.modetype };
                    if (tokken) {
                        jwt.verify(tokken, 'A22', function (err, doc) {
                            if (err) {
                                return res.status(500).send({ message: 'Tokken Expired' });
                            } else {
                                usermodel.findOneAndUpdate(query, data, function (err, doc) {
                                    if (err) {
                                        return res.send(500, { error: err });
                                    } else {
                                        return res.status(200).send({ message: 'User Is Updated' });
                                    }
                                });
                            }
                        });
                    } else {
                        return res.status(200).send({ status: true, message: 'Please Provide Tokken' });
                    }
                } else {
                    return res.send(200, { status: true, message: 'UserId Is Missing' })
                }
            } catch (err) {

            }
        },
        UserLogin: function (req, res) {
            try {
                usermodel.findOne({ 'id': req.body.id, 'password': req.body.password }, function (errs, obj) {
                    if (errs) {
                        return res.status(400).send({ 'message': errs });
                    } else {
                        if (!obj) {
                            return res.status(200).send({ 'login': false, 'message': 'Not Valid Login', 'errs': errs });
                        } else {
                            if (obj['modetype'] === 'active') {
                                var jwttokken = jwt.sign({ id: req.body.id }, 'A22', {
                                    expiresIn: 86400
                                });
                                
                                const data = {'tokken' :jwttokken , 'user_id' : req.body.id }
                                return res.status(200).send({ 'status': true, 'login': true, 'message': 'Valid Login', data: data });
                            } else {
                                return res.status(200).send({ 'status': false, 'login': true, 'message': 'User Is Not In Active Mode ' });
                            }
                        }
                    }
                })
            } catch (err) {
                return res.status(400).send({ 'message': err });
            }
        },
        UserSearch : function(req,res) {
            try {
                var reqType = req.query.type;
                var modetype = req.query.modetype; 
                usermodel.find({$or: [{'type' : reqType} , {'modetype' : modetype}] }).then(function(findres, err){
                    console.log(findres)
               
                    if(findres) {
                    res.status(200).send({message: findres});    
                    } else {
                    
                    res.status(400).send({ message :err });     
                    }
                });
            }
            catch(err) {
                console.error(err);
            }
        },
        UserEdit : function (req,res) { 
            const id =req.body.id;
            if(id) {
            return res.send({data : id});
            } else {
            return res.send({message : 'Id is missing'});    
            }
           
         },
         UserDelete : function(req,res) {
       
            const id = req.body.id;
            usermodel.deleteOne({"id" : id}).then(function(delResponse,delError) {

            if(delResponse) {
              return res.status(200).send({message : 'User is deleted'});
            } else {
              return res.status(400).send({message : 'Something went wrong'});
            }
            })
         },
        UserForgetPassword : function (req,res) {
            const id = req.body.id;
            console.log(id);
            if(id) {
                usermodel.find({'id' :req.body.id}).then(function(forgetresponse,forgeterror){ 
                    if(forgetresponse.length >0) {
                        nodemailer.createTestAccount((err,account) => {
                            let transporter = nodemailer.createTransport({
                                host: 'smtp.gmail.com',
                                port: 465,
                                secure: true, 
                                auth: {
                                    user: "grammeranalysis@gmail.com", 
                                    pass: "Qwerty@1001"  
                                }
                            });
                            let registerMailOptions = {
                                from: '"Bhavnani Manish"<grammeranalysis@gmail.com>', 
                                to: id, 
                                subject: 'Registerd Mail', 
                                text: 'Thanks For Registration', 
                                html: '<a href="http://localhost:4200">Reset Link</a>'
                            };
                            transporter.sendMail(registerMailOptions, (error, info) => {
                                if (error) {
                                    return console.log(error);
                                } else {                                        
                                // return res.status(200).send({ status : true,data : user});
                                return res.send({message : 'Reset link is sended to your register email id'});
                                }
                            });			
                        }); 
                    } else if(forgeterror) {
                      return res.status(500).send({message : 'Someting went wrong', data :forgeterror })
                    } 
                    else {
                      return res.status(200).send({message : 'Email is not registerd'})     
                    }
                  });
            } else {
                return res.status(200).send({message : 'Provide email id'})
            }
            
          }
    }
