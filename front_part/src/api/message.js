import instance from '@/http/index'

//消息发布
export const publishMessage = data => {
    const {
        message_title,
        ...message_level
    } = data
    return instance.post('/message/publishMessage', {
        message_title,
        ...message_level
    })
}

//获取公司公告消息
export const getCompanyMessageList = () => {
    return instance.post('/message/getCompanyMessageList')
}

//编辑公告
export const editMessage = data => {
    const {
        message_title,
        ...id
    } = data
    return instance.post('/message/editMessage', {
        message_title,
        ...id
    })
}

// 获取系统消息
export const getSystemMessageList = () => {
    return instance.post('/message/getSystemMessageList')
}

//通过部门进行筛选搜索
export const searchMessageByDepartment = message_publish_department => {
    return instance.post('/message/searchMessageByDepartment', {
        message_publish_department
    })
}

//通过等级进行筛选搜索
export const searchMessageByLevel = (message_level) => {
    return instance.post('/message/searchMessageByLevel', {
        message_level
    })
}

//获取公告/系统消息
export const getMessageList = id => {
    return instance.post('/message/searchMessageByLevel', {
        id
    })
}

// 更新点击率
export const updateClick = data => {
    const {
        message_click_number,
        id
    } = data
    return instance.post('/message/updateClick', {
        message_click_number,
        id
    })
}

//初次删除
export const firstDelete = id => {
    return instance.post('/message/firstDelete', {
        id
    })
}

// 获取回收站的列表
export const recycleList = () => {
    return instance.post('/message/recycleList')
}


// 还原操作
export const recover = id => {
    return instance.post('/message/recover', {
        id
    })
}

// 删除操作
export const deleteMessage = id => {
    return instance.post('/message/deleteMessage', {
        id
    })
}
// 获取公司公告总数
export const getCompanyMessageLength = () => {
    return instance({
        url: '/message/getCompanyMessageLength',
        method: 'POST',
    })
}

// 获取系统消息总数
export const getSystemMessageLength = () => {
    return instance({
        url: '/message/getSystemMessageLength',
        method: 'POST',
    })
}

// 监听换页返回数据  公司公告列表
export const returnCompanyListData = (pager) => {
    return instance({
        url: '/message/returnCompanyListData',
        method: 'POST',
        data: {
            pager
        }
    })
}

// 监听换页返回数据  系统消息列表
export const returnSystemListData = (pager) => {
    return instance({
        url: '/message/returnSystemListData',
        method: 'POST',
        data: {
            pager
        }
    })
}