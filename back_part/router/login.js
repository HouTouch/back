//登录注册路由
const express = require('express');
//使用express.Router()方法创建一个路由实例
const router = express.Router();
//路由处理模块
const loginHandler = require('../routerController/login');

//导入expressjoi
const expressJoi = require('@escook/express-joi');
//导入登录的验证规则
const { login_limit} = require('../limit/login');

router.post('/login', expressJoi(login_limit), loginHandler.login);

router.post('/register', expressJoi(login_limit), loginHandler.register);

//将路由实例作为模块导出
module.exports = router;