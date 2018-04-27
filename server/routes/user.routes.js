let cors = require('cors')
let USER_CONTROLLER = require('./../controller/user.controller');


module.exports = function(app) {
    app.post('/user',cors(),USER_CONTROLLER.LoginVerification);
    app.get('/userinfo',cors(),USER_CONTROLLER.UserDetails);
    app.post('/userupdate', cors(), USER_CONTROLLER.UserUpdate);
    app.post('/login',cors(), USER_CONTROLLER.UserLogin);
    app.get('/usersearch',cors(),USER_CONTROLLER.UserSearch);
}