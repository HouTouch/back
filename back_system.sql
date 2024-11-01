/*
 Navicat Premium Data Transfer

 Source Server         : Back
 Source Server Type    : MySQL
 Source Server Version : 50726
 Source Host           : localhost:3306
 Source Schema         : back_system

 Target Server Type    : MySQL
 Target Server Version : 50726
 File Encoding         : 65001

 Date: 01/11/2024 19:37:38
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for files
-- ----------------------------
DROP TABLE IF EXISTS `files`;
CREATE TABLE `files`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `file_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `file_url` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `file_size` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `upload_person` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `upload_time` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `download_number` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 9 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of files
-- ----------------------------
INSERT INTO `files` VALUES (7, '1.jpg', 'http://127.0.0.1:3001/uploads/1.jpg', '25.2265625', '韩佳融', '2024-10-31 15:11:44.738', 0);

-- ----------------------------
-- Table structure for image
-- ----------------------------
DROP TABLE IF EXISTS `image`;
CREATE TABLE `image`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `image_url` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `account` int(255) NULL DEFAULT NULL,
  `onlyId` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 29 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of image
-- ----------------------------
INSERT INTO `image` VALUES (23, 'http://localhost:3001/uploads/2.jpg', 123456, '9e14ce04-5d80-4662-aac0-467a5a4d837e');
INSERT INTO `image` VALUES (24, 'http://localhost:3001/uploads/2.jpg', NULL, 'e6974b9e-c975-4028-b2c2-f390a139db67');
INSERT INTO `image` VALUES (25, 'http://localhost:3001/uploads/swiper1.jpg', 123456, 'e7a22f5d-4297-41d9-b54a-5fa63accc1cd');
INSERT INTO `image` VALUES (26, 'http://localhost:3001/uploads/2.jpg', NULL, '313a73f1-d5a9-4d4a-852b-7d41c992d1de');
INSERT INTO `image` VALUES (27, 'http://localhost:3001/uploads/2.jpg', NULL, '2eb77c66-4de5-4e84-8e0d-2fc9634b2442');
INSERT INTO `image` VALUES (28, 'http://localhost:3001/uploads/2.jpg', 123456, '1e7a62ed-8494-443d-84ba-5845692a483f');

-- ----------------------------
-- Table structure for login_log
-- ----------------------------
DROP TABLE IF EXISTS `login_log`;
CREATE TABLE `login_log`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account` int(11) NULL DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `login_time` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of login_log
-- ----------------------------
INSERT INTO `login_log` VALUES (1, 123456, '韩佳融', '1', '2024-10-31 17:19:47.099');
INSERT INTO `login_log` VALUES (2, 123456, '韩佳融', '1', '2024-10-25 17:19:47.099');
INSERT INTO `login_log` VALUES (3, 123456, '韩佳融', '1', '2024-10-31 20:06:44.281');
INSERT INTO `login_log` VALUES (4, 123456, '韩佳融', '1', '2024-11-01 18:30:22.211');

-- ----------------------------
-- Table structure for message
-- ----------------------------
DROP TABLE IF EXISTS `message`;
CREATE TABLE `message`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `message_title` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `message_category` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `message_publish_department` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `message_publish_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `message_receipt_object` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `message_click_number` int(11) NULL DEFAULT NULL,
  `message_content` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `message_create_time` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `message_update_time` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `message_level` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `message_status` int(11) NULL DEFAULT NULL,
  `message_delete_time` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 26 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of message
-- ----------------------------
INSERT INTO `message` VALUES (12, '下班后开会12', '公司公告', '总裁办', '韩总', '总裁办', 0, '下班后开会', '2024-10-30 16:47:43.886', '2024-10-30 17:31:32.419', '一般', 0, NULL);
INSERT INTO `message` VALUES (13, '下午放假休息', '公司公告', '总裁办', '韩总', '全体成员', 0, '下午下班后全体成员开会', '2024-10-30 17:20:15.276', NULL, '重要', 0, NULL);
INSERT INTO `message` VALUES (11, '无1q', '系统消息', '', '韩总', '总裁办', 2, '不想弄', '2024-10-30 16:02:33.561', '2024-10-30 17:31:39.382', '一般', 0, NULL);
INSERT INTO `message` VALUES (14, '下午放假休息1', '公司公告', '总裁办', '韩总', '全体成员', 0, '下午下班后全体成员开会', '2024-10-30 17:20:51.617', NULL, '重要', 0, NULL);
INSERT INTO `message` VALUES (15, '下午放假休息12', '公司公告', '总裁办', '韩总', '全体成员', 0, '下午下班后全体成员开会', '2024-10-30 17:20:53.879', NULL, '重要', 0, NULL);
INSERT INTO `message` VALUES (16, '下午放假休息123', '公司公告', '总裁办', '韩总', '全体成员', 0, '下午下班后全体成员开会', '2024-10-30 17:20:55.184', NULL, '重要', 0, NULL);
INSERT INTO `message` VALUES (17, '下午放假休息1234', '公司公告', '总裁办', '韩总', '全体成员', 0, '下午下班后全体成员开会', '2024-10-30 17:20:56.309', NULL, '重要', 0, NULL);
INSERT INTO `message` VALUES (18, '下午放假休息12345', '公司公告', '总裁办', '韩总', '全体成员', 0, '下午下班后全体成员开会', '2024-10-30 17:20:57.383', NULL, '重要', 0, NULL);
INSERT INTO `message` VALUES (19, '下午放假休息123456', '公司公告', '总裁办', '韩总', '全体成员', 0, '下午下班后全体成员开会', '2024-10-30 17:20:58.475', NULL, '重要', 0, NULL);
INSERT INTO `message` VALUES (20, '下午放假休息1234567', '公司公告', '总裁办', '韩总', '全体成员', 0, '下午下班后全体成员开会', '2024-10-30 17:20:59.628', NULL, '重要', 0, NULL);
INSERT INTO `message` VALUES (21, '下午放假休息12345678', '公司公告', '总裁办', '韩总', '全体成员', 0, '下午下班后全体成员开会', '2024-10-30 17:21:00.691', NULL, '重要', 0, NULL);
INSERT INTO `message` VALUES (22, '下午放假休息123456789', '公司公告', '总裁办', '韩总', '全体成员', 1, '下午下班后全体成员开会', '2024-10-30 17:21:02.999', NULL, '重要', 0, NULL);
INSERT INTO `message` VALUES (23, '下午放假休息10', '公司公告', '总裁办', '韩总', '全体成员', 0, '下午下班后全体成员开会', '2024-10-30 17:21:07.123', NULL, '重要', 0, NULL);
INSERT INTO `message` VALUES (24, '下午放假休息11', '公司公告', '总裁办', '韩总', '全体成员', 0, '下午下班后全体成员开会', '2024-10-30 17:21:10.041', NULL, '重要', 0, NULL);
INSERT INTO `message` VALUES (25, '更新系统', '系统消息', '', '韩佳融', '', 1, '', '2024-11-01 19:35:37.062', NULL, '', 0, NULL);

-- ----------------------------
-- Table structure for operation_log
-- ----------------------------
DROP TABLE IF EXISTS `operation_log`;
CREATE TABLE `operation_log`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `operation_person` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `operation_content` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `operation_level` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `operation_time` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of operation_log
-- ----------------------------
INSERT INTO `operation_log` VALUES (1, '韩佳融', '对产品\'蟠桃1\'进行了出库操作，审核结果为\'审核产品成功\'', '高级', '2024-10-31 18:24:32.763');

-- ----------------------------
-- Table structure for outproduct
-- ----------------------------
DROP TABLE IF EXISTS `outproduct`;
CREATE TABLE `outproduct`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_out_id` int(11) NULL DEFAULT NULL,
  `product_out_number` int(11) NULL DEFAULT NULL,
  `product_out_price` int(11) NULL DEFAULT NULL,
  `product_out_apply_person` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `product_audit_time` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `product_out_audit_person` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `audit_memo` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 12 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of outproduct
-- ----------------------------
INSERT INTO `outproduct` VALUES (6, 1000, 100, 500, '韩佳融', '2024-10-26 16:32:31.982', NULL, NULL);
INSERT INTO `outproduct` VALUES (7, 1001, 20, 100, '韩佳融', '2024-10-31 18:11:56.848', '韩佳融', NULL);
INSERT INTO `outproduct` VALUES (8, 123, 1, 5, '韩佳融', '2024-10-31 18:12:52.371', '韩佳融', NULL);
INSERT INTO `outproduct` VALUES (9, 1, 1, 5, '韩佳融', '2024-10-31 18:13:22.666', '韩佳融', NULL);
INSERT INTO `outproduct` VALUES (10, 123123, 1, 5, '韩佳融', '2024-10-31 18:23:08.206', '韩佳融', NULL);
INSERT INTO `outproduct` VALUES (11, 1, 1, 5, '韩佳融', '2024-10-31 18:24:32.756', '韩佳融', NULL);

-- ----------------------------
-- Table structure for product
-- ----------------------------
DROP TABLE IF EXISTS `product`;
CREATE TABLE `product`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NULL DEFAULT NULL,
  `product_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `product_category` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `product_unit` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `product_in_warehouse_number` int(11) NULL DEFAULT NULL,
  `product_single_price` int(11) NULL DEFAULT NULL,
  `product_all_price` int(11) NULL DEFAULT NULL,
  `product_status` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `product_create_person` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `product_create_time` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `product_update_time` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `in_memo` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `product_out_id` int(11) NULL DEFAULT NULL,
  `product_out_number` int(11) NULL DEFAULT NULL,
  `product_out_price` int(11) NULL DEFAULT NULL,
  `product_out_apply_person` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `product_apply_time` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `apply_memo` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `product_out_status` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `product_audit_time` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `product_out_audit_person` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `audit_memo` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 9 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of product
-- ----------------------------
INSERT INTO `product` VALUES (6, 1001, '蟠桃1', '食品类', '个', 26, 5, 130, NULL, '韩佳融', '2024-10-25 16:35:40.577', '2024-10-26 14:57:30.766', '无', 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `product` VALUES (8, 1002, '水果1', '食品类', '个', 400, 5, 2000, NULL, '韩佳融', '2024-10-26 15:41:53.995', '2024-10-26 15:45:43.443', '无', 1000, NULL, NULL, NULL, NULL, NULL, NULL, '2024-10-26 15:46:50.906', NULL, NULL);

-- ----------------------------
-- Table structure for setting
-- ----------------------------
DROP TABLE IF EXISTS `setting`;
CREATE TABLE `setting`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `set_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `set_value` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `set_text` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 14 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of setting
-- ----------------------------
INSERT INTO `setting` VALUES (1, 'swiper1', 'http://127.0.0.1:3001/uploads/swiper1_1.jpg', NULL);
INSERT INTO `setting` VALUES (2, 'swiper2', 'http://127.0.0.1:3001/uploads/2.jpg', NULL);
INSERT INTO `setting` VALUES (3, 'swiper3', 'http://127.0.0.1:3001/uploads/swiper1_1.jpg', NULL);
INSERT INTO `setting` VALUES (4, 'swiper4', 'http://127.0.0.1:3001/uploads/2.jpg', NULL);
INSERT INTO `setting` VALUES (5, 'swiper5', 'http://127.0.0.1:3001/uploads/swiper1_1.jpg', NULL);
INSERT INTO `setting` VALUES (6, 'swiper6', 'http://127.0.0.1:3001/uploads/2.jpg', NULL);
INSERT INTO `setting` VALUES (7, '公司名称', '改变之1', NULL);
INSERT INTO `setting` VALUES (8, '公司介绍', '这是公司介绍的内容', '<p>欢迎来到我们的公司介绍!</p><p>我们是一家专业的动漫设计公司，致力于为客户提供高质量的动漫产品设计和制作服务。我们的团队由一群富有创意和热情的美术设计师、动画师和音效师组成，我们能够灵活地应对各种动漫产品设计需求，为客户提供定制化的服务。我们成立于 2023年，总部位于中国济南，目前拥有超过200 名员工，业务遍及全球多个国家和地区，</p><p>我们的动漫设计作品涵盖多个领域，包括动画、漫画、插画、游戏等，受到了客户和社会的广泛好评。我们秉承着“创息、专业、品质、服务”的理念，始终保持着高度的创作热情和专业精神，为客户提供最好的动漫设计作</p><p>如果您需要专业的动漫产品设计和制作服务，我们期待与您的合作。11</p>');
INSERT INTO `setting` VALUES (9, '公司架构', NULL, '<p><strong>m没有 &nbsp;m没有 &nbsp;m没有 &nbsp;m没有 &nbsp;m没有 &nbsp;m没有 &nbsp;m没有 &nbsp;m没有 &nbsp;m没有 &nbsp;m没有 &nbsp;m没有 &nbsp;m没有 &nbsp;m没有 &nbsp;m没有 &nbsp;m没有 &nbsp;m没有 &nbsp;m没有 &nbsp;m没有 &nbsp;m没有 &nbsp;m没有 &nbsp;m没有 &nbsp;m没有 &nbsp;m没有 &nbsp;m没有 &nbsp;m没有 &nbsp;</strong></p>');
INSERT INTO `setting` VALUES (10, '公司战略', NULL, '<p><strong>m没有 &nbsp;m没有 &nbsp;m没有 &nbsp;m没有 &nbsp;m没有 &nbsp;m没有 &nbsp;m没有 &nbsp;m没有 &nbsp;m没有 &nbsp;m没有 &nbsp;m没有 &nbsp;m没有 &nbsp;m没有 &nbsp;m没有 &nbsp;m没有 &nbsp;m没有 &nbsp;m没有 &nbsp;m没有 &nbsp;m没有 &nbsp;m没有 &nbsp;m没有 &nbsp;m没有 &nbsp;m没有 &nbsp;m没有 &nbsp;m没有 &nbsp;</strong></p>');
INSERT INTO `setting` VALUES (11, '公司高层', NULL, '<p><strong>m没有 &nbsp;m没有 &nbsp;m没有 &nbsp;m没有 &nbsp;m没有 &nbsp;m没有 &nbsp;m没有 &nbsp;</strong></p>');
INSERT INTO `setting` VALUES (12, '部门设置', '[\"总裁办\",\"组织部\"]', NULL);
INSERT INTO `setting` VALUES (13, '产品设置', '[\"食品类\",\"水果类\"]', NULL);

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `identity` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `department` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `sex` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `image_url` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `create_time` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `update_time` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `status` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 18 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, '123456', '$2b$10$VtjO40PdsJxCvLbOT4iphexfzZhkxsJ1auv/iheeMDvsS7kKLK0TS', '用户', '总裁办', '韩佳融', '男', '12345@qq.com', 'http://localhost:3001/uploads/2.jpg', '2024-09-13 16:36:31.886', '2024-10-31 18:02:34.302', '0');
INSERT INTO `users` VALUES (2, '1234567', '$2b$10$7KTyJq81QaOnJLe8RPQXvuD9BOxGG7MpFNzMtOXf6PrsM5.fZhe96', '用户', '总裁办', '123', '男', '12345qq@qq.com', NULL, '2024-09-15 15:37:28.129', '2024-10-23 12:02:16.847', '0');
INSERT INTO `users` VALUES (3, '123456555', '$2b$10$5hR3tfioiDwyA7D08499eOg7fv.OiejbRXcHc6KRjniSuNT2hnG2m', '用户', '总裁办', '345', '女', NULL, NULL, '2024-10-13 15:52:57.179', '2024-10-23 12:02:23.907', '0');
INSERT INTO `users` VALUES (5, '12345678', '$2b$10$pxHcXLOgaSXuOZGbcpExRuqmY29ouWD9OT1/t3mhS8fatlL9zT6Ja', '产品管理员', '总裁办', '章生', '女', '1234567@qq.com', NULL, '2024-10-18 13:58:02.177', '2024-10-18 14:24:03.565', '0');
INSERT INTO `users` VALUES (6, '123321', '$2b$10$AzMda7ioEqAcB4UWO88bh.PRMdsSov0m/9Us4/ACUG8D/X0y772oC', '产品管理员', '总裁办', 'eqweqwq', '女', '1234@qq.com', NULL, '2024-10-18 14:21:20.261', '2024-10-31 18:08:38.489', '0');
INSERT INTO `users` VALUES (7, '1233211', '$2b$10$wGuoM5NE0eQkI2/ZBVy4fOjzSkI2nMRvfeWUAjgqJ/SL9f2fIFQm2', '用户', '总裁办', 'eqweqw4', '男', '123443@qq.com', NULL, '2024-10-18 14:21:54.839', NULL, '0');
INSERT INTO `users` VALUES (16, '123', '$2b$10$LMhlvQrnA9NPpE49KNfotOJaWxIaN/txCzWKqrCPnk2lPXr0r3Zna', '用户', '总裁办', '123', '男', '12345qeqwq@qq.com', NULL, '2024-10-31 18:05:24.696', NULL, '0');
INSERT INTO `users` VALUES (13, '3123123', '$2b$10$kYVrP94aYqqFPOS.7ZBV/un4m0e9SiqPIp/Qcgku6XJH2B6ddGdY.', '消息管理员', '总裁办', 'bhgfvh', '男', '12qeqwq@qq.com', NULL, '2024-10-23 12:31:08.248', NULL, '0');
INSERT INTO `users` VALUES (10, '12312321', '$2b$10$.PD/CpURUR33O6UxjmdiYeFftnVbfmxj4bOteNA55S4YL06rh1Nj6', '用户', '总裁办', 'eqweqweqw', '男', '12345qeqweqwq@qq.com', NULL, '2024-10-23 12:08:25.414', NULL, '0');
INSERT INTO `users` VALUES (11, '12312312', '$2b$10$6KMdPIiOjs1uNAMlEhq7J.C/hL3JcwODVPJHhrvikzhBz.DHDrec6', '用户管理员', '总裁办', 'eqweqdasweqw', '男', '123d45qeqweqwq@qq.com', NULL, '2024-10-23 12:14:41.259', NULL, '0');
INSERT INTO `users` VALUES (12, '123123', '$2b$10$Lr80LK61wtzuFBzkpw59hes7ayFwIAgY1m4vQU1YcysNMtExDGCla', '消息管理员', '组织部', 'eqweqw', '男', '1qeqweqwq@qq.com', NULL, '2024-10-23 12:15:01.336', NULL, '0');
INSERT INTO `users` VALUES (14, '31231', '$2b$10$6Pp5HhMNsmg/GgkaGxsGBOns39DReXJljkpyrmqtZM7DmJTx87xoi', '用户', '总裁办', 'zhw', '男', '1qeqdaseqwq@qq.com', NULL, '2024-10-23 12:31:46.249', '2024-10-23 12:38:53.993', '0');
INSERT INTO `users` VALUES (15, '8765', '$2b$10$JnHZ9wNbSQLeHwHf.t.CuuSiYnEnM2kel30bl5QviZrI5kUiWnp/O', '用户', '总裁办', 'eqweqwwe', '男', '12345qeqwq@qq.com', NULL, '2024-10-23 12:35:44.172', '2024-10-23 12:38:58.749', '0');
INSERT INTO `users` VALUES (17, '1234', '$2b$10$RwjwDgWk2QI2VyoJ/NYw3ewl7uV8vhK9q4qi/IFglp13dNYWGML0q', '用户', '总裁办', '123', '男', '12345qeqwq@qq.com', NULL, '2024-10-31 18:08:21.504', NULL, '0');

SET FOREIGN_KEY_CHECKS = 1;
