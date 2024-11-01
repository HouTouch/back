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

//-------------------------------用户管理-----------------------------
//添加管理员
export const createAdmin = data => {
    const {account,...identity}=data
    return instance({
        url: '/user/createAdmin',
        method: 'post',
        data: {
            account,
            ...identity
        }
    })
}

// 获取管理员列表
export const getAdminList = identity => {
    return instance({
        url: '/user/getAdminList',
        method: 'post',
        data: {
            identity
        }
    })
}

// 编辑管理员信息
export const editAdmin = data => {
    const { id, ...department } = data
    return instance({
        url: '/user/editAdmin',
        method: 'post',
        data: {
            id,
            ...department
        }
    })
}

// 取消管理员
export const changeIdentityToUser = id => {
    return instance({
        url: '/user/changeIdentityToUser',
        method: 'post',
        data: {
            id
        }
    })
}

// 提升为管理员
export const changeIdentityToAdmin = (id,identity) => {
    return instance({
        url: '/user/changeIdentityToAdmin',
        method: 'post',
        data: {
            id,
            identity
        }
    })
}

// 对帐号进行搜索
export const searchUser = account => {
    return instance({
        url: '/user/searchUser',
        method: 'post',
        data: {
            account
        }
    })
}

// 对部门进行搜索
export const searchUserByDepartment = department => {
    return instance({
        url: '/user/searchUserByDepartment',
        method: 'post',
        data: {
            department
        }
    })
}

// 冻结用户
export const banUser = id => {
    return instance({
        url: '/user/banUser',
        method: 'post',
        data: {
            id
        }
    })
}

// 解冻用户
export const unBanUser = id => {
    return instance({
        url: '/user/unbanUser',
        method: 'post',
        data: {
            id
        }
    })
}

// 获取冻结用户列表
export const getBanUserList = () => {
    return instance({
        url: '/user/getBanUserList',
        method: 'post',
    })
}

// 删除用户
export const deleteUser = (id,account) => {
    return instance({
        url: '/user/deleteUser',
        method: 'post',
        data: {
            id,
            account
        }
    })
}

// 获取对应身份的总人数 identity
export const getAdminListLength = identity => {
    return instance({
        url: '/user/getAdminListLength',
        method: 'post',
        data: {
            identity
        }
    })
}

// 监听换页返回数据 pager identity
export const returnListData = (pager,identity) => {
    return instance({
        url: '/user/returnListData',
        method: 'post',
        data: {
            pager,
            identity
        }
    })
}