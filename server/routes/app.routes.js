let user = require('./user.routes');
let department = require('./department.routes'); 
module.exports= function(app) {
user(app);
department(app);
}