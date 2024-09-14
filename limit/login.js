//导入joi对账号密码进行验证
const Joi = require('joi')

//账号的验证String只能为字符串，alphanum只能为字母和数字，min最小长度为6，max最大长度为12，required必须填写
const account = Joi.string().alphanum().min(6).max(12).required()
//密码的验证
const password = Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,12}$')).required();

exports.login_limit = {
    //对req.body进行验证
    body:{
        account,
        password
    }
}