const express = require('express');
//使用express.Router()方法创建一个路由实例
const router = express.Router();

//导入expressjoi
const expressJoi = require('@escook/express-joi');

//导入userInfo的验证规则
const userInfohender = require('../routerController/userInfo');

const { name_limit, email_limit, password_limit, fotgetPassword_limit } = require('../limit/users')

router.post('/uploadAvatar', userInfohender.uploadAvatar);

// 绑定账号
router.post('/bindAccount', userInfohender.bindAccount);

//获取用户信息
router.post('/getUserInfo', userInfohender.getUserInfo);

//修改用户名称
router.post('/changeName', expressJoi(name_limit),userInfohender.changeName);

//修改用户性别
router.post('/changeSex', userInfohender.changeSex);

//修改用户邮箱
router.post('/changeEmail', expressJoi(email_limit), userInfohender.changeEmail);

//修改用户密码
router.post('/changePassword', expressJoi(password_limit), userInfohender.changePassword);

//验证账号邮箱是否一直
router.post('/verifyAccountEmaiil', userInfohender.verifyAccountEmaiil);

//忘记密码 修改密码
router.post('/changePasswordInLogin', expressJoi(fotgetPassword_limit) ,userInfohender.changePasswordInLogin);
module.exports = router;
