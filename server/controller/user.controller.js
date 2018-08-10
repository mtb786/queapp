let usermodel = require('../model/user.model');
let jwt = require('jsonwebtoken');
const UserProfile = require('../model/userprofile.model');
const json2csv = require('json2csv').parse;
const fs = require('fs');
const nodemailer = require('nodemailer');
module.exports = {
    LoginVerification: function (req, res) {

        try {
            let user = usermodel();
            let id = req.body.id;
            let name = req.body.name;
            let password = req.body.password;
            let modetype = req.body.modetype;
            let type = req.body.type;



            user.id = id
            user.name = name;
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
            const userID = req.decoded.id;
                usermodel.findOne({ id: userID }).then(function (collectionResponse, collectionError) {
                    if (collectionError) {
                        res.status(400).send({ status: false, message: collectionError });
                    } else {
                        let query={};

                        if (collectionResponse['type'] === 'superadmin') {

                            query ={};
                        } else if (collectionResponse['type'] === 'admin') {

                            query= {$or :[{type: 'admin'},{type : 'user'}]};
                        }
                        usermodel.find(query).then((finddata,finderror)=> {
                            res.status(200).send({'status' : true, data : finddata });
                        });
                    }
                })
                

        } catch(err) {
        console.log(err);
        return res.status(200).send({ message: err })
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
                    console.log(obj['modetype']);
                    if (obj['modetype'] === 'active') {
                        var jwttokken = jwt.sign({ id: req.body.id }, 'A22', {
                            expiresIn: 86400
                        });

                        const data = { 'tokken': jwttokken, 'user_id': req.body.id }
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
UserSearch: function (req, res) {
    try {
        var reqType = req.query.type;
        var modetype = req.query.modetype;
        usermodel.find({ $or: [{ 'type': reqType }, { 'modetype': modetype }] }).then(function (findres, err) {
            console.log(findres)

            if (findres) {
                res.status(200).send({ message: findres });
            } else {
                res.status(400).send({ message: err });
            }
        });
    }
    catch (err) {
        console.error(err);
    }
},
UserEdit: function (req, res) {
    const id = req.body.id;
    const modetype = req.body.modetype;
    if(modetype === 'active' || modetype === 'inactive') {
        var newvalues = { $set: {modetype: modetype } };
        usermodel.updateOne({'id' :id },newvalues, (err,resUpdate) => {
            if(err) {
                res.status(400).send({status : false ,message :'Something went wrong'});
            } else {
                res.status(200).send({status : true,message : 'User updated  sucessfully'});
            }
        });
    
    } else {
        res.status(400).send({status : false ,message :'please provide valid modetype'});           
    }
  
},
UserDelete: function (req, res) {

    const id = req.body.id;
    usermodel.deleteOne({ "id": id }).then(function (delResponse, delError) {

        if (delResponse) {
            return res.status(200).send({ message: 'User is deleted' });
        } else {
            return res.status(400).send({ message: 'Something went wrong' });
        }
    })
},
UserFilterObject: function (req, res) {
    var data = [{ 'name': 'a', 'age': 10 }, { 'name': 'b', 'age': 15 }, { 'name': 'c', 'age': 20 }, { 'name': 'd', 'age': 40 }]

    var filterdData = data.filter(data => data.age > 25);
    console.log(filterdData);
    res.send({ data: filterdData });
    return res.status()

},

convertUserCSv: function (req, res) {
    console.log('scs');
    var fields = ['car.make', 'car.model', 'price', 'color'];
    var myCars = [

        {
            "car": {
                "make": "Hundai", "model": "sonata"
            },
            "price": 30000,
            "color": "white"
        },
        {
            "car": {
                "make": "Audi", "model": "A3"
            },
            "price": 40000,
            "color": "blue"
        }, {
            "car": { "make": "BMW", "model": "F20" },
            "price": 35000,
            "color": "black"
        }, {
            "car": { "make": "Porsche", "model": "9PA AF1" },
            "price": 60000,
            "color": "green"
        }
    ];
    var csv = json2csv.pa({ data: myCars, fields: fields });
    usermodel.findOne({}, function (err, obj) {

    });
    fs.writeFile('file.csv', csv, function (err) {
        if (err) throw err;
        console.log('fileed');
    });

},


UserForgetPassword: function (req, res) {
    const id = req.body.id;
    console.log(id);
    if (id) {
        usermodel.find({ 'id': req.body.id }).then(function (forgetresponse, forgeterror) {
            if (forgetresponse.length > 0) {
                nodemailer.createTestAccount((err, account) => {
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
                            return res.send({ message: 'Reset link is sended to your register email id' });
                        }
                    });
                });
            } else if (forgeterror) {
                return res.status(500).send({ message: 'Someting went wrong', data: forgeterror })
            }
            else {
                return res.status(200).send({ message: 'Email is not registerd' })
            }
        });
    } else {
        return res.status(200).send({ message: 'Provide email id' })
    }

},
UserProfile: (req, res) => {


    usermodel.findOne({ _id: req.body.user }, function (err, obj) {
        if (err) {
            res.status(400).send({ status: false, message: 'user not registerd' });
        } else {

            let profilemodel = UserProfile();

            profilemodel.user = req.body.user;
            profilemodel.firstname = req.body.firstname;
            profilemodel.middlename = req.body.middlename;
            profilemodel.lastname = req.body.lastname;
            profilemodel.country = req.body.country;


            profilemodel.save((err) => {
                if (err) {
                    res.status(400).send({
                        status: false,
                        message: 'User Profile Not Saved',
                        error: JSON.stringify(err)
                    })
                } else {
                    res.status(200).send({
                        status: true,
                        message: 'User Profile  Saved'
                    });
                }
            });


        }

    });


}
}
