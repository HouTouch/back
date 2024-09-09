// 引入express框架，并使用express
const express = require('express')
const app = express()

//解析表单数据的中间件
//方式req.body 等于underfined
//以及被express内置的中间件解析
// const bodyParser = require('body-parser')
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())


const cors = require('cors')
app.use(cors())

app.listen(3001, () => {
    console.log('http://127.0.0.1:3001')
})