const db = require("../db/index");

// message_title 消息主题
// message_category 消息类别
// message_publish_department 消息发布部
// message_publish_name 消发布者
// message_receipt_object 消息接收者
// message_click_number 消息查看数量
// message_content 消息内容
// message_create_time 消息发布时间
// message_update_time 消息更新时间
// message_level 消息等级
// message_status 默认为0，1在回收站
// message_delete_time 消息网除时间

// 消息发布
exports.publishMessage = (req, res) => {
    const {
        message_title,
        message_category,
        message_publish_department,
        message_publish_name,
        message_receipt_object,
        message_content,
        message_level,
    } = req.body;
    const message_create_time = new Date();
    const sql = "insert into message set ?"
    db.query(sql, {
        message_title,
        message_category,
        message_publish_department,
        message_publish_name,
        message_click_number: 0,
        message_status :0,
        message_receipt_object,
        message_content,
        message_create_time,
        message_level,
    }, (err, results) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: "发布成功",
            data: results
        })
    })
};

// 获取公司公告消息
exports.getCompanyMessageList = (req, res) => {
    const sql = 'select * from message where message_category="公司公告" and message_status = 0'
    db.query(sql, (err, results) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: "获取成功",
            data: results
        })
    })
}

// 获取系统消息
exports.getSystemMessageList = (req, res) => {
    const sql = 'select * from message where message_category="系统消息" and message_status = 0'
    db.query(sql, (err, results) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: "获取成功",
            data: results
        })
    })
}

// 编辑公告
exports.editMessage = (req, res) => {
    const {
        message_title,
        message_content,
        message_receipt_object,
        message_level,
        id
    } = req.body;
    const message_update_time = new Date();
    const sql = "update message set message_title = ?,message_content = ?,message_receipt_object = ?,message_level = ?,message_update_time = ? where id = ?"
    db.query(sql, [
        message_title,
        message_content,
        message_receipt_object,
        message_level,
        message_update_time,
        id
     ], (err, results) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: "编辑消息成功",
        })
    })
};

// 通过部门进行筛选搜索
exports.searchMessageByDepartment = (req, res) => {
    const sql = 'select * from message where message_publish_department=? and message_status=0'
    db.query(sql, req.body.message_publish_department, (err, results) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: "获取成功",
            data: results
        })
    })
}

// 通过等级进行筛选搜索
exports.searchMessageByLevel = (req, res) => {
    const sql = 'select * from message where message_level=? and message_status=0'
    db.query(sql, req.body.message_level, (err, results) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: "获取成功",
            data: results
        })
    })
}

// 获取公告/系统消息
exports.getMessageList = (req, res) => {
    const sql = 'select * from message where id=?'
    db.query(sql, req.body.id, (err, results) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: "获取成功",
            data: results
        })
    })
}

// 更新点击率
exports.updateClick = (req, res) => {
    const {
        message_click_number,
        id
    } = req.body
    number = message_click_number *1 +1
    const sql = 'update message set message_click_number= ? where id = ?'
    db.query(sql, [number,id], (err, results) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: "点击率增加",
        })
    })
}

// 初次删除
exports.firstDelete = (req, res) => {
    const {
        id
    } = req.body
    const message_delete_time = new Date()
    const sql = 'update message set message_status=1,message_delete_time=? where id = ?'
    db.query(sql, [message_delete_time,req.body.id], (err, results) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: "删除成功"
        })
    })
}


// 获取回收站的列表
exports.recycleList = (req, res) => {
    const sql = 'select * from message where message_status = 1'
    db.query(sql, (err, result) => {
        if (err) return res.cc(err)
        res.send(result)
    })
}

// 还原操作
exports.recover = (req, res) => {
    const message_status = 0
    const message_update_time = new Date()
    const sql = 'update message set message_status = ? ,message_update_time = ? where id = ?'
    db.query(sql, [message_status, message_update_time, req.body.id], (err, result) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: '还原成功'
        })
    })
}

// 删除操作
exports.deleteMessage = (req, res) => {
    const sql = 'delete from message where id = ?'
    db.query(sql, req.body.id, (err, result) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: '删除消息成功'
        })
    })
}


// 获取公司公告总数
exports.getCompanyMessageLength = (req, res) => {
    const sql = 'select * from message where message_category ="公司公告"'
    db.query(sql, (err, result) => {
        if (err) return res.cc(err)
        res.send({
            length: result.length
        })
    })
}

// 获取系统消息总数
exports.getSystemMessageLength = (req, res) => {
    const sql = 'select * from message where message_category ="系统消息"'
    db.query(sql, (err, result) => {
        if (err) return res.cc(err)
        res.send({
            length: result.length
        })
    })
}

// 监听换页返回数据  公司公告列表
// limit 10 为我们要拿到数据 offset 我们跳过多少条数据
exports.returnCompanyListData = (req, res) => {
    const number = (req.body.pager - 1) * 10
    const sql =
        `select * from message where message_category ="公司公告" and message_status = 0 ORDER BY message_create_time limit 10 offset ${number} `
    db.query(sql, (err, result) => {
        if (err) return res.cc(err)
        res.send(result)
    })
}

// 监听换页返回数据  系统消息列表
exports.returnSystemListData = (req, res) => {
    const number = (req.body.pager - 1) * 10
    const sql =
        `select * from message where message_category ="系统消息"  and message_status = 0  ORDER BY message_create_time limit 10 offset ${number} `
    db.query(sql, (err, result) => {
        if (err) return res.cc(err)
        res.send(result)
    })
}