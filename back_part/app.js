// 引入express框架，并使用express
const express = require('express')
const app = express()
const Joi = require('joi')
//解析表单数据的中间件
//方式req.body 等于underfined
//以及被express内置的中间件解析
const bodyParser = require('body-parser')
//当extended为false时，值为数组或者字符串，当为true时，值为任意类型
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use((req, res, next) => {
    res.cc = (err, status = 1) => {
        // state 0成功 1失败
        res.send({
            status,
            message: err instanceof Error ? err.message : err
        })
    }
    next()
})


//用于处理maultipart/form-data格式的数据，主要用于上传文件
const multer = require("multer");
// 在server服务端下新建一个public文件，在public文件下新建uploads文件用于存放图片
const upload = multer({
    dest: './public/uploads'
})
app.use(upload.any())

const cors = require('cors')
app.use(cors())

const loginRouter = require('./router/login')
app.use('/api', loginRouter)

const userRouter = require('./router/userInfo')
app.use('/user', userRouter)

const setRouter = require('./router/setting')
app.use('/set', setRouter)

const productRouter = require('./router/product')
app.use('/product', productRouter)

const messageRouter = require('./router/message')
app.use('/message', messageRouter)


const fileRouter = require('./router/file')
app.use('/file', fileRouter)

const loginLogRouter = require('./router/login_log')
app.use('/llog', loginLogRouter)

const operationLogRouter = require('./router/operation_log')
app.use('/olog', operationLogRouter)

const overviewRouter = require('./router/overview')
app.use('/overview', overviewRouter)
// const jwtConfig = require('./jwt_config/index')
// const {expressjwt:jwt} = require('express-jwt')
// app.use(jwt({
//     secret: jwtConfig.secretKey,
//     algorithms: ['HS256']
// }).unless({path: [/^\/api\//]}))




//静态托管
app.use(express.static('./public'))

//joi验证对不符合joi规则的请求进行拦截报错
app.use((err, req, res, next) => {
    if (err instanceof Joi.ValidationError) {
        res.send({
            status: 1,
            message: '输入的数据不符合验证规则'
        })
    }
})
app.listen(3001, () => {
    console.log('http://127.0.0.1:3001')
})