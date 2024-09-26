import instance from '@/http/index'

// 注册接口
export const getUserInfor = (id) => {

    return instance({
        url: '/user/getUserInfo',
        method: 'post',
        data: {
            id
        }
    })
}
//图片地址跟账号绑定
export const bindAccount = (account, onlyId,url, ) => {
    return instance({
        url: '/user/bindAccount',
        method: 'post',
        data: {
            account,
            onlyId,
            url,
        }
    })
}
//修改密码
export const changePassword = (id,oldPassword,newPassword) => {

    return instance({
        url: '/user/changePassword',
        method: 'post',
        data: {
            id,
            oldPassword,
            newPassword
        }
    })
}
//修改姓名
export const changeName = (name,id) => {

    return instance({
        url: '/user/changeName',
        method: 'post',
        data: {
            name,
            id
        }
    })
}
//修改性别
export const changeSex = (sex,id) => {

    return instance({
        url: '/user/changeSex',
        method: 'post',
        data: {
            sex,
            id
        }
    })
}

//修改邮箱
export const changeEmail = (email,id) => {

    return instance({
        url: '/user/changeEmail',
        method: 'post',
        data: {
            email,
            id
        }
    })
}