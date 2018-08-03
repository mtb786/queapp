const cors = require('cors')
const USER_CONTROLLER = require('../../controller/user.controller')
const LEAD_CONTROLLER = require('../../controller/lead.controller');
const express = require('express');
const router = express.Router();

'use-strict'


router.post('/user',cors(),USER_CONTROLLER.LoginVerification);
router.get('/userinfo',cors(),USER_CONTROLLER.UserDetails);
router.post('/userdelete',cors(),USER_CONTROLLER.UserDelete);
router.post('/useredit',cors(),USER_CONTROLLER.UserEdit);
// app.post('/userupdate', cors(), USER_CONTROLLER.UsersUpdate);


// @type  POST
// @route /api/auth/login
// @desc  user authentication
// @access public
router.post('/login',cors(), USER_CONTROLLER.UserLogin);
router.get('/usersearch',cors(),USER_CONTROLLER.UserSearch);
router.post('/forgetpassword',cors(),USER_CONTROLLER.UserForgetPassword)
router.get('/filter',cors(),USER_CONTROLLER.UserFilterObject);
router.get('/usercsv',cors(),USER_CONTROLLER.convertUserCSv)  

// lead controller export

router.post('/lead',cors(),LEAD_CONTROLLER.lead)
router.get('/leadinfo',cors(),LEAD_CONTROLLER.leadInfo);


module.exports = router;