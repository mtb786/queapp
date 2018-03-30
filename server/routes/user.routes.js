let USER_CONTROLLER = require('./../controller/user.controller');


module.exports = function(app) {
    app.get('/user',USER_CONTROLLER.LoginVerification);
}