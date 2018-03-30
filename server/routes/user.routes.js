let USER_CONTROLLER = require('./../controller/user.controller');


module.exports = function(app) {
    app.post('/user',USER_CONTROLLER.LoginVerification);
}