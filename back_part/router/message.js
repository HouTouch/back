//登录注册路由
const express = require('express');
//使用express.Router()方法创建一个路由实例
const router = express.Router();

const messageHeandler = require('../routerController/message');

// 消息发布
router.post('/publishMessage', messageHeandler.publishMessage);

// 获取公司公告消息
router.post('/getCompanyMessageList', messageHeandler.getCompanyMessageList);

// 获取系统消息
router.post('/getSystemMessageList', messageHeandler.getSystemMessageList);

// 编辑公告
router.post('/editMessage', messageHeandler.editMessage);

// 通过部门进行筛选搜索
router.post('/searchMessageByDepartment', messageHeandler.searchMessageByDepartment);

// 通过等级进行筛选搜索
router.post('/searchMessageByLevel', messageHeandler.searchMessageByLevel);


// 获取公告/系统消息
router.post('/getMessageList', messageHeandler.getMessageList);

// 更新点击率
router.post('/updateClick', messageHeandler.updateClick);

// 初次删除
router.post('/firstDelete', messageHeandler.firstDelete);


// 获取回收站的列表
router.post('/recycleList', messageHeandler.recycleList);

// 还原操作
router.post('/recover', messageHeandler.recover);

// 删除操作
router.post('/deleteMessage', messageHeandler.deleteMessage);


// 获取公司公告总数
router.post('/getCompanyMessageLength', messageHeandler.getCompanyMessageLength);


// 获取系统消息总数
router.post('/getSystemMessageLength', messageHeandler.getSystemMessageLength);

// 监听换页返回数据  公司公告列表
// limit 10 为我们要拿到数据 offset 我们跳过多少条数据
router.post('/returnCompanyListData', messageHeandler.returnCompanyListData);


// 监听换页返回数据  系统消息列表
router.post('/returnSystemListData', messageHeandler.returnSystemListData);

//将路由实例作为模块导出
module.exports = router;