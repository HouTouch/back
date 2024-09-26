const db = require('../db/index');
//导入bcryptjs模块加密中间建

fs = require('fs');

//上传轮播图图片接口
exports.uploadSwipers = (req, res) => {

    // 用于拼接data的数据，因为上传的为swiper:[1,2,3.....]
    
    let oldName = req.files[0].filename
    let newName = Buffer.from(req.files[0].originalname, 'latin1').toString('utf8')
    fs.renameSync('./public/uploads/' + oldName, './public/uploads/' + newName)
    
    // res.send('1')
    const sql = 'update setting set set_value = ? where set_name = ?'
    db.query(sql, [`http://127.0.0.1:3001/uploads/${newName}`, req.body.name], (err, result) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: '上传轮播图成功'
        })
    })

}

//获取所有轮播图的接口
exports.getAllSwipers = (req, res) => {
    const sql = "select * from setting where set_name like 'swiper%'"
    db.query(sql, (err, result) => {
        if (err) return res.cc(err)
        let array = []
        result.forEach(e => {
            array.push(e.set_value)
        });
        res.send(array)
    })
}


//获取公司名称
exports.getComponyName = (req, res) => {
    const sql = 'select * from setting where set_name = "公司名称"'
    db.query(sql, req.body.id, (err, result) => {
        if (err) return res.cc(err)
        if (result.length !== 1) return res.cc('获取公司名称失败')
        res.send(result[0].set_value)
    })
}

//修改公司名称
exports.changeComponyName = (req, res) => {
    const sql = 'update setting set set_value = ? where set_name = "公司名称"'
    db.query(sql, req.body.set_value, (err, result) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: '修改公司名称成功'
        })
    })
}

//编辑公司介绍   set_text set_name
exports.changeComponyIntroduce = (req, res) => {
    const sql = 'update setting set set_text = ? where set_name = ?'
    db.query(sql, [req.body.set_text, req.body.set_name], (err, result) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: '修改公司介绍成功'
        })
    })
}

//获取公司的介绍  set_name
exports.getComponyIntroduce = (req, res) => {
    const sql = 'select * from setting where set_name = ?'
    db.query(sql, req.body.set_name,(err, result) => {
        if (err) return res.cc(err)
        res.send(result[0].set_text)
    })
}

//获取所有于公司有关的信息  set_name
exports.getAllComponyIntroduce = (req, res) => {
    const sql = 'select * from setting where set_name like "公司%"'
    db.query(sql, (err, result) => {
        if (err) return res.cc(err)
        res.send(result)
    })
}
