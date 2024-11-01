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

//添加管理员
router.post('/createAdmin', userInfohender.createAdmin);

//获取管理员列表
router.post('/getAdminList', userInfohender.getAdminList);

//修改管理员信息
router.post('/editAdmin', userInfohender.editAdmin);

//管理原降级
router.post('/changeIdentityToUser', userInfohender.changeIdentityToUser);

//用户升级为管理员
router.post('/changeIdentityToAdmin', userInfohender.changeIdentityToAdmin);

//通过账号对用户搜索
router.post('/searchUser', userInfohender.searchUser);

//通过部门对用户搜索
router.post('/searchUserByDepartment', userInfohender.searchUserByDepartment);

// 冻结用户
router.post('/banUser', userInfohender.banUser);

// 解冻用户
router.post('/unbanUser', userInfohender.unbanUser);

// 获取冻结用户列表
router.post('/getBanUserList', userInfohender.getBanUserList);

// 删除用户
router.post('/deleteUser', userInfohender.deleteUser);

// 获取对应身份的总人数 identity
router.post('/getAdminListLength', userInfohender.getAdminListLength);

// 监听换页返回数据 pager identity
router.post('/returnListData', userInfohender.returnListData);




module.exports = router;
