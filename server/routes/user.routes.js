let cors = require('cors')
let USER_CONTROLLER = require('./../controller/user.controller');


module.exports = function(app) {
    app.post('/user',cors(),USER_CONTROLLER.LoginVerification);
}