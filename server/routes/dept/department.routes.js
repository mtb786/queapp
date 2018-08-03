const cors = require('cors');
const DEPARTMENT_CONTROLLER = require('../../controller/department.controller');
const express = require('express');
const router = express.Router();


router.post('/addDepartment',cors(),DEPARTMENT_CONTROLLER.addDepartment);


module.exports = router  