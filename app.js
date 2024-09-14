// 引入express框架，并使用express
const express = require('express')
const app = express()

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


const cors = require('cors')
app.use(cors())

const loginRouter = require('./router/login')
app.use('/api', loginRouter)

const jwtConfig = require('./jwt_config/index')
const {expressjwt:jwt} = require('express-jwt')
app.use(jwt({
    secret: jwtConfig.secretKey,
    algorithms: ['HS256']
}).unless({path: [/^\/api\//]}))


//joi验证对不符合joi规则的请求进行拦截报错
app.use((req, res, next) => {
    if(err instanceof Joi.ValidationError){
        res.cc(err)
    }
})

app.listen(3001, () => {
    console.log('http://127.0.0.1:3001')
})