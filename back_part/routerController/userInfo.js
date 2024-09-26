const db = require('../db/index');
//导入bcryptjs模块加密中间建
const bcryt = require('bcrypt');
// 用来生成uid
const crypto = require('crypto');

fs = require('fs');

//上传头像
exports.uploadAvatar = (req, res) => {
    //生成uuid

    const onlyId = crypto.randomUUID();
    let oldName = req.files[0].filename
    let newName = Buffer.from(req.files[0].originalname, 'latin1').toString('utf8')
    fs.renameSync('./public/uploads/' + oldName, './public/uploads/' + newName)
    const sql = 'insert into image set ?'
    db.query(sql, {
        image_url: `http://localhost:3001/uploads/${newName}`,
        onlyId
    }, (err, result) => {
        if (err) return res.cc(err)
        res.send({
            onlyId,
            status: 0,
            url:'http://localhost:3001/uploads/' + newName
        })
    })
}

//绑定账号 onlyid account url
exports.bindAccount = (req, res) => {
    const { account, onlyId, url } = req.body
    const sql = 'update image set account = ? where onlyId = ?'
    db.query(sql, [account, onlyId], (err, result) => {
        if (err) return res.cc(err)
        if (result.affectedRows !== 1) {
            return res.cc('绑定失败')
        } else {
            const sql1 = 'update users set image_url = ? where account = ?'
            db.query(sql1, [url, account], (err, result) => {
                if (err) return res.cc(err)
                if (result.affectedRows !== 1) {
                    return res.cc('修改失败')
                } else {
                    res.sned({
                        status: 0,
                        message: '修改成功'
                    })
                }
            })
        }
            
        res.send({
            status: 0,
            message: '绑定成功'
        })
    })
}


//获取用户信息
exports.getUserInfo = (req, res) => {
    const sql = 'select * from users where id=?'
    db.query(sql, req.body.id, (err, results) => {
        if (err) return res.cc(err)
        if (results.length !== 1) return res.cc('获取用户信息失败')
        results[0].password = ' '
        res.send(results[0])
    })
}

//修改用户名字  id name
exports.changeName = (req, res) => {

    const sql = 'update users set name=? where id=?'
    db.query(sql, [req.body.name,req.body.id], (err, results) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: '修改用户信息成功',
        })
    })
}

//修改性别 id sex
exports.changeSex = (req, res) => {
    const sql = 'update users set sex=? where id=?'
    db.query(sql, [req.body.sex,req.body.id], (err, results) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: '修改用户性别成功',
        })
    })
}

//修改邮箱
exports.changeEmail = (req, res) => {
    const sql = 'update users set email=? where id=?'
    db.query(sql, [req.body.email, req.body.id], (err, results) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: '修改用户邮箱成功',
        })
    })
}

// 修改用户密码，输入旧密码 oldpassword 新密码 newpaSSWORD id
exports.changePassword = (req, res) => {
    const sql = 'select password from users where id=?'
    db.query(sql, req.body.id, (err, result) => {
        if (err) return res.cc(err)
        const compareResult = bcryt.compareSync(req.body.oldPassword, result[0].password)
        if (!compareResult) {
            res.sned({
                status: 1,
                message: '原密码错误'
            })
        }
        req.body.newPassword = bcryt.hashSync(req.body.newPassword, 10)
        const sql = 'update users set password=? where id=?'
        db.query(sql, [req.body.newPassword, req.body.id], (err, result) => {
            if (err) return res.cc(err)
            if (result.affectedRows !== 1) return res.cc('修改密码失败')
            res.send({
                status: 0,
                message: '修改密码成功'
            })
        })
    })
}

//忘记密码接口 验证账号邮箱是否一致account email 
exports.verifyAccountEmaiil = (req, res) => {
    const sql = 'select * from users where account=?'
    db.query(sql, req.body.account, (err, result) => {
        if (err) return res.cc(err)
        if (result[0].email !== req.body.email) return res.cc('账号或邮箱错误')
        res.send({
            status: 0,
            message: '验证成功',
            id: result[0].id
        })
    })
}

//忘记密码接口  修改密码 参数 newpassword id
exports.changePasswordInLogin = (req, res) => {
    req.body.newPassword = bcryt.hashSync(req.body.newPassword, 10)
    const sql = 'update users set password=? where id=?'
    db.query(sql, [req.body.newPassword, req.body.id], (err, result) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: '修改密码成功'
        })
    })
}