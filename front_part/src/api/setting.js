import instance from '@/http/index'

// 获取所有轮播图
export const getAllSwipers = () => {
    return instance({
        url: '/set/getAllSwipers',
        method: 'post',
    })
}


// 获取公司名称
export const getComponyName = () => {
    return instance({
        url: '/set/getComponyName',
        method: 'post',
    })
}

// 修改公司名称
export const changeComponyName = (set_value) => {
    return instance({
        url: '/set/changeComponyName',
        method: 'post',
        data: {
            set_value
        }
    })
}

// 编辑公司介绍
export const changeComponyIntroduce = (set_text,set_name) => {
    return instance({
        url: '/set/changeComponyIntroduce',
        method: 'post',
        data: {
            set_text,
            set_name
        }
    })
}

//获取公司介绍
export const getComponyIntroduce = (set_name) => {
    return instance({
        url: '/set/getComponyIntroduce',
        method: 'post',
        data: {
            set_name
        }
    })
}

//获取所有公司介绍
export const getAllComponyIntroduce = () => {
    return instance({
        url: '/set/getAllComponyIntroduce',
        method: 'post',

    })
}
