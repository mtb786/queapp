    let usermodel = require('../model/user.model');
    let jwt = require('jsonwebtoken');
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
                                return res.status(200).send({ 'status': true, 'login': true, 'message': 'Valid Login', data: jwttokken });
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
                var modetype = req.query.modetpye;
                
                usermodel.find({$or: [{'type' : reqType} , {'modetype' : modetype}] }).then(function(findres,finderr){
                    if(finderr) {
                    res.status(400).send({message: finderr});    
                    } else {
                    res.status(200).send({data : findres });     
                    }
                });
            }
            catch(err) {
                console.error(err);
            }
        }
    }
