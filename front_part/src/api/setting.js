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
// 部门设置 数组
export const setDepartment = data => {
    return instance({
        url: '/set/setDepartment',
        method: 'post',
        data: {
            set_value: data
        }
    })
}
// 获取部门
export const getDepartment = () => {
    return instance({
        url: '/set/getDepartment',
        method: 'post',
    })
}

// 产品设置 数组
export const setProduct = data => {
    return instance({
        url: '/set/setProduct',
        method: 'post',
        data: {
            set_value: data
        }
    })
}
// 获取产品
export const getProduct = () => {
    return instance({
        url: '/set/getProduct',
        method: 'post',
    })
}