//导入joi对账号密码进行验证
const Joi = require('joi')

const name = Joi.string().pattern(/^[A-Za-z0-9\u4e00-\u9fa5]{2,10}$/).required()

const id = Joi.required()

const email = Joi.string().pattern(/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/).required()

const oldPassword = Joi.string().pattern(/^(?![0-9]+$)[a-z0-9]{1,50}$/).min(6).max(12).required()
const newPassword = Joi.string().pattern(/^(?![0-9]+$)[a-z0-9]{1,50}$/).min(6).max(12).required()

exports.name_limit = {
    body: {
        id,
        name
    }
}

exports.email_limit = {
    body: {
        id,
        email
    }
}
exports.password_limit = {
    body: {
        id,
        oldPassword,
        newPassword
    }
}
exports.fotgetPassword_limit = {
    body: {
        id,
        newPassword
    }
}