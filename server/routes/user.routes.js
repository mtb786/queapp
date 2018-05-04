let cors = require('cors')
let USER_CONTROLLER = require('./../controller/user.controller');


module.exports = function(app) {
    app.post('/user',cors(),USER_CONTROLLER.LoginVerification);
    app.get('/userinfo',cors(),USER_CONTROLLER.UserDetails);
    app.post('/userdelete',cors(),USER_CONTROLLER.UserDelete);
    app.post('/useredit',cors(),USER_CONTROLLER.UserEdit);
    app.post('/userupdate', cors(), USER_CONTROLLER.UsersUpdate);
    app.post('/login',cors(), USER_CONTROLLER.UserLogin);
    app.get('/usersearch',cors(),USER_CONTROLLER.UserSearch);
    app.post('/forgetpassword',cors(),USER_CONTROLLER.UserForgetPassword)
}                                                                                                                                 