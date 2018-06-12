const cors = require('cors');
const DEPARTMENT_CONTROLLER = require('../controller/department.controller');



module.exports =function(app) {

    'use-strict'
    app.post('/addDepartment',cors(),DEPARTMENT_CONTROLLER.addDepartment);
} 