const express  = require('express');
const router = express.Router();
const user = require('../../controller/user.controller');
// User Details

router.post('/userinfo',user.UserProfile);

module.exports = router;

