const db = require('../db/index');
//导入bcryptjs模块加密中间建
const bcryt = require('bcryptjs');
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
    res.sned('1')
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

//---------------------------------用户管理

//新增管理员
exports.createAdmin = (req, res) => {
    const {
        account,
        password,
        name,
        sex,
        department,
        email,
        identity
    } = req.body
    // 判断账号是否存在与数据库中
    const sql = 'select * from users where account = ?'
    db.query(sql, account, (err, results) => {
        // 判断账号是否存在
        if (results.length > 0) {
            return res.send({
                status: 1,
                message: '账号已存在'
            })
        }
        const hashpassword = bcryt.hashSync(password, 10)
        // 第四步,把账号跟密码插入到users表里面
        const sql1 = 'insert into users set ?'
        // 创建时间
        const create_time = new Date()
        db.query(sql1, {
            account,
            password: hashpassword,
            name,
            sex,
            department,
            email,
            // 身份
            identity,
            // 创建时间
            create_time,
            // 初始未冻结状态为0
            status: 0,
        }, (err, results) => {
            // 第一个,插入失败
            // affectedRows为影响的行数，如果插入失败，那么就没有影响到行数，也就是行数不为1
            if (results.affectedRows !== 1) {
                return res.send({
                    status: 1,
                    message: '添加管理员失败'
                })
            }
            res.send({
                status: 0,
                message: '添加管理员成功'
            })
        })
    })
}

//获取管理员列表 identity
exports.getAdminList = (req, res) => {
    const sql = 'select * from users where identity=?'
    db.query(sql, req.body.identity, (err, result) => {
        if (err) return res.cc(err)
        result.forEach(e => {
                e.password = '',
                e.create_time = '',
                e.image_url = '',
                e.status = ''
        });
        res.send({
           result
        })
    })
}

//编辑管理员信息账号 id department
exports.editAdmin = (req, res) => {
    const { id, name, sex, email, department } = req.body
    const data = new Date()
    const updateContent = { id, name, sex, email, department, update_time: data }
    const sql = 'update users set ? where id=?'
    db.query(sql, [updateContent, updateContent.id], (err, result) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: '修改管理员信息成功'
        })
    })
}

//取消管理员权限  参数 id
exports.changeIdentityToUser = (req, res) => {
    const identity = '用户'
    const sql = 'update users set identity=? where id=?'
    db.query(sql, [identity,req.body.id], (err, result) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: '降级成功'
        })
    })
}

//添加管理员权限  参数 id identity
exports.changeIdentityToAdmin = (req, res) => {
    const date = new Date()
    const sql = 'update users set identity=? ,update_time=? where id=?'
    db.query(sql, [req.body.identity,date, req.body.id], (err, result) => {
        if (err) return res.cc(err)
        res.send({
            status: 1,
            message: '赋权成功'
        })
    })
}

//搜索用户（通过账号） 参数 account
exports.searchUser = (req, res) => {
    const sql = 'select * from users where account=?'
    db.query(sql, req.body.account, (err, result) => {
        if (err) return res.cc(err)
        result.forEach(e => {
            e.password = '',
                e.create_time = '',
                e.image_url = '',
                e.status = ''
        });
        res.send({
            status: 1,
            message: '查询成功',
            result
        })
    })
}
//搜索用户（通过部门） 参数 department
exports.searchUserByDepartment = (req, res) => {
    const sql = 'select * from users where department=? and identity="用户"'
    db.query(sql, req.body.department, (err, result) => {
        if (err) return res.cc(err)
        result.forEach(e => {
                e.password = '',
                e.image_url = ''
        });
        res.send({
            status: 1,
            message: '查询成功',
            result
        })
    })
}

//冻结用户 把数据库中的status 设置为1 即是冻结
exports.banUser = (req, res) => {
    const status = 1 
    const sql = 'update users set status=? where id=?'
    db.query(sql, [status, req.body.id], (err, result) => {
        if (err) return res.cc(err)
        res.send({
            status: 1,
            message: '冻结成功'
        })
    })
}

// 解冻用户
exports.unbanUser = (req, res) => {
    const status = 0
    const sql = 'update users set status=? where id=?'
    db.query(sql, [status, req.body.id], (err, result) => {
        if (err) return res.cc(err)
        res.send({
            status: 1,
            message: '解冻成功'
        })
    })
}

// 获取冻结用户列表
exports.getBanUserList = (req, res) => {
    const sql = 'select * from users where status="1"'
    db.query(sql, (err, result) => {
        if (err) return res.cc(err)
        res.send({
            status: 1,
            message: '查询成功',
            result
        })
    })
}

// 删除用户 id account
exports.deleteUser = (req, res) => {
    const sql = 'delete from users where id=?'
    db.query(sql, req.body.id, (err, result) => {
        const sql1 = 'delete from image where account = ?'
        db.query(sql1, req.body.account, (err, result) => {
            if (err) return res.cc(err)
            res.send({
                status: 1,
                message: '删除成功'
            })
        })
    })
}

// 获取对应身份的总人数 identity
exports.getAdminListLength = (req,res) => {
    const sql = `select * from users where identity=?`
    db.query(sql,req.body.identity, (err, result) => {
        if (err) return res.cc(err)
        res.send({
            length:result.length
        })
    })
}

// 监听换页返回数据 pager identity
exports.returnListData = (req, res) => {
    const number = (req.body.pager-1)*5
    const sql = `select * from users where identity=? limit 5 offset ${number} `
    db.query(sql, req.body.identity, (err, result) => {
        if (err) return res.cc(err)
        res.send({
            result
        })
    })
}

