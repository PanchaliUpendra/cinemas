const express = require('express');
const { userRegisterController, userLoginController, checkAuthController, userLogoutController } = require('./users.controller');
const usersRouter = express.Router();
usersRouter.post('/registeruser',userRegisterController);
usersRouter.post('/login',userLoginController);
usersRouter.get('/checkauth',checkAuthController)
usersRouter.post('/logout',userLogoutController);
module.exports = usersRouter;