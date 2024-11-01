//系统设置路由
const express = require("express");
//使用express.Router()方法创建一个路由实例
const router = express.Router();
//路由处理模块
const productHandler = require("../routerController/product");

// 创建产品
router.post("/createProduct", productHandler.createProduct);

// 删除产品 id
router.post("/deleteProduct", productHandler.deleteProduct);

// 编辑产品
router.post("/editProduct", productHandler.editProduct);

// 获取产品列表
router.post("/getProductList", productHandler.getProductList);

// 申请产品出库
router.post("/applyOutProduct", productHandler.applyOutProduct);

// 再次申请产品出库
router.post("/applyOutProductAgin", productHandler.applyOutProductAgin);

// 产品审核列表
router.post("/applyProductList", productHandler.applyProductList);

// 产品审核
router.post("/audioProduct", productHandler.audioProduct);

// // 用户对产品进行撤回申请
router.post("/withdrawApplyProduct", productHandler.withdrawApplyProduct);

// 通过入库编号对产品进行搜索
router.post("/searchProductForId", productHandler.searchProductForId);

// 通过出库申请编号对产品进行搜索
router.post("/searchProductForApplyId", productHandler.searchProductForApplyId);

// 通过出库编号对产品进行搜索
router.post("/searchProductForOutId", productHandler.searchProductForOutId);

// 获取产品总数
router.post("/getProductLength", productHandler.getProductLength);

// 获取申请出库产品总数
router.post("/getApplyProductLength", productHandler.getApplyProductLength);

// 出库产品列表
router.post("/auditProductList", productHandler.auditProductList);

// 监听换页返回数据
router.post("/returnProductListData", productHandler.returnProductListData);

// 监听换页返回数据
router.post("/returnApplyProductListData", productHandler.returnApplyProductListData);

// 监听换页返回数据
router.post("/returnOutProductListData", productHandler.returnOutProductListData);

module.exports = router;
