const user = require('./auth/login.routes');
const department = require('./dept/department.routes'); 
const express = require('express');
const app = express();
const userdetails = require('./user/user.routes');

app.use('/api/auth',user);
app.use('/api/dept',department);
app.use('/api/profile',userdetails);
``
module.exports = app;
