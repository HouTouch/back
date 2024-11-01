//系统设置路由
const express = require('express');
//使用express.Router()方法创建一个路由实例
const router = express.Router();
//路由处理模块
const settingHandler = require('../routerController/setting');


//上传轮播图
router.post('/uploadSwiper', settingHandler.uploadSwipers);


//获取所有轮播图
router.post('/getAllSwipers', settingHandler.getAllSwipers);

//获取公司名称
router.post('/getComponyName', settingHandler.getComponyName);

//修改公司名称
router.post('/changeComponyName', settingHandler.changeComponyName);

//修改公司介绍
router.post('/changeComponyIntroduce', settingHandler.changeComponyIntroduce);

//获取公司介绍
router.post('/getComponyIntroduce', settingHandler.getComponyIntroduce);

//获取公司所有信息
router.post('/getAllComponyIntroduce', settingHandler.getAllComponyIntroduce);

// 部门设置 数组
router.post('/setDepartment', settingHandler.setDepartment);

// 获取部门
router.post('/getDepartment', settingHandler.getDepartment);


// 食品类别设置 数组
router.post('/setProduct', settingHandler.setProduct);

// 获取食品类别
router.post('/getProduct', settingHandler.getProduct);


//将路由实例作为模块导出
module.exports = router; 