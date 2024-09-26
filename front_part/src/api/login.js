import instance from '@/http/index'

// 注册接口
export const register = (data) => {
    const {
        account,
        password
    } = data
  return instance({
    url: '/api/register',
    method: 'post',
      data: {
          account,
          password
    }
  })
}

// 登录接口
export const login = (data) => {
    const {
        account,
        password
    } = data
    return instance({
        url: '/api/login',
        method: 'post',
        data: {
            account,
            password
        }
    })
}

//忘记密码 验证账号邮箱
export const verifyAccountEmaiil = data => {
    const {
        account,
        email
    } = data
    return instance({
        url: '/user/verifyAccountEmaiil',
        method: 'post',
        data: {
            account,
            email
        }
    })
}

//忘记密码 重置密码
export const resetPassword = (id, newPassword) => {
    return instance({
        url: '/user/changePasswordInLogin',
        method: 'post',
        data: {
            id,
            newPassword
        }
    })
}