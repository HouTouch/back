const db = require('../db/index');
//导入bcryptjs模块加密中间建
const bcryt = require('bcrypt');

// 导入jwt生成token
const jwt = require('jsonwebtoken');
// 导入jwt配置文件用于加密解密
const jwtConfig = require('../jwt_config/index');

exports.register = (req, res) => {
    //req是前端传递的数据，request
    //res是返回给前端的数据，response
    const reginfo = req.body
    //判断传递的数据是否为空
    if (!reginfo.account || !reginfo.password) {
        return res.send({status: 1, message: '用户名或密码不能为空'})
    }
    //判断用户名是否被占用
    const sqlStr = 'select * from users where account=?';
    db.query(sqlStr, reginfo.account, (err, results) => {
        if (err) return res.cc(err)  
        // if (err) return res.send({ status: 1, message: '账号或莫玛不能为空' });
        if (results.length > 0) return res.send({ status: 1, message: '用户名已被占用' });
        //对密码进行加密
        //需要使用中间件 bcryt
        reginfo.password = bcryt.hashSync(reginfo.password, 10);
        //把账号密码插入到数据表中
        const sql1 = 'insert into users set ?'
        //初始化身份
        const identity = 'user'
        const create_time = new Date()
        db.query(sql1, {
            account: reginfo.account,
            password: reginfo.password,
            identity: identity,
            create_time: create_time,
            //初始未冻结状态为0
            status:0
        }, (err, results) => {
            if (err) return res.cc(err) 
            //affectedRows受影响的行数，如果插入失败，则affectedRows为0
            if(results.affectedRows !== 1) return res.send({ status: 1, message: '注册失败' });
            res.send({ status: 1, message: '注册成功' })
        })
    })
}

exports.login = (req, res) => {
    const loginfo = req.body;
    //1.判断用户名和密码是否为空
    const sql = 'select * from users where account=?'
    db.query(sql, loginfo.account, (err, results) => {
        // 执行sql语句失败的情况，一般为数据库断开的情况会执行失败
        // res.status(500).send(err.message)
        if (err) return res.cc(err)
        // 查看是否有值
        if (results.length !== 1) return res.cc('登录失败')
        //对传递的密码进行加密
        console.log(loginfo.password)
        const compareRrsult = bcryt.compareSync(loginfo.password, results[0].password)
        if (!compareRrsult) return res.cc('登录失败1')
  
        //检查账号是否冻结
        if (results[0].state === 1) return res.cc('账号已被冻结')
        //生成返回给前端的token
        // 剔除加密后的密码，头像，创建时间，更新时间
        const user = {
            ...results[0],
            password: '',
            avatar: '',
            create_time: '',
            update_time: ''
        }
        //设置token的有效时长,有效时间为七个小时
        const tokenStr = jwt.sign(user, jwtConfig.secretKey, {
            expiresIn:'7h'
        })
        res.send({
            results:results[0],
            status: 0,
            message: '登录成功',
            //内部的token使用Bearer开头，后面是空格，然后放token数据
            token: 'Bearer ' + tokenStr
        })
    })
}
