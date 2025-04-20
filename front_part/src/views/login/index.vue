<script setup>
import { number } from 'echarts';
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router';
import forget from './components/forge_password.vue'

import {
    login,
    register
} from '@/api/login'
import { loginLog } from '@/api/log';
import  useUserInfor  from '@/store/userInfor';
const userInfor = useUserInfor()
// 注册
const handleRegister = async() => {
    const res = await register(registerData)
    if (registerData.password === registerData.repssword) {
        if (res.data.message === "注册成功") {
            ElMessage({
                message: "注册成功",
                type: 'success'
            })
            activeName.value = 'first'
        } else {
            ElMessage.error('Oops, this is a error message.')
        }
        console.log(res)
    } else {
        ElMessage.error("注册失败，两次密码不一致")
    }
}
// 登录
const router = useRouter()
const hanleLogin = async () => {
    login(loginData).then(async(res)=>{
        const { token } = res.data
        const { name, id, account } = res.data.results
        if (res.data.message === "登录成功") {
            ElMessage({
                message: "登录成功",
                type: 'success'
            })
            console.log('success')
            localStorage.setItem('token', token)//本地化存储token
            localStorage.setItem('name', name)
            const res = await loginLog(account, name, id)
            console.log(res)
            userInfor.userInforData(id)
            router.push('/home')
        } else {
            ElMessage.error('登录失败，请检查您的账号密码')
        }
    }).catch(()=>{
        ElMessage.error('登录失败，请检查您的账号密码/冻结状态')
    })
    
}
const activeName = ref('first')
const loginData = reactive({
    account: null,
    password: ''
})
const registerData = reactive({
    account: null,
    password: '',
    repssword: ''
})
// interface formData{
//     account: number;
//     password: string;
//     repssword?: string;//?的作用就是当其他数据调用这个接口时，不适用这个数据时，这个数据可以不传
// }
//忘记面膜弹窗
const forgetP = ref()
// 打开忘记密码弹窗
const openForgetPassword = () => {
    forgetP.value.open()
}

</script>

<template>
    <div class="common-layout">
        <el-container>
            <el-header class="header-wrapped">
                <div class="header-content">
                    <h3>通用后台管理系统</h3>
                    <span class="welcome">欢迎您的登录</span>
                </div>
            </el-header>
            <el-main>
                <div class="login-wrapped">
                    <el-card style="max-width: 480px">
                        <el-tabs v-model="activeName" class="demo-tabs" stretch>
                            <el-tab-pane label="登录" name="first">
                                <el-form class="login-form">
                                    <el-form-item label="登录">
                                        <el-input v-model="loginData.account" placeholder="请输入账号" />
                                    </el-form-item>
                                    <el-form-item label="注册">
                                        <el-input v-model="loginData.password" placeholder="请输入密码" type="password" />
                                    </el-form-item>
                                    <div class="footer-wrapped">
                                        <div class="forget-password">
                                            <span class="forget-password-button" @click="openForgetPassword">忘记密码?</span>
                                        </div>
                                        <div class="footer-button">
                                            <el-button type="primary" @click="hanleLogin">登录</el-button>
                                        </div>
                                        <div class="footer-go-register">
                                            还没有账号？<span class="go-register-button">马上注册</span>
                                        </div>
                                    </div>
                                </el-form>
                            </el-tab-pane>
                            <el-tab-pane label="注册" name="second">
                                <el-form>
                                    <el-form-item label="账号">
                                        <el-input v-model="registerData.account" placeholder="请输入账号（ 6-12位 ）纯数字" />
                                    </el-form-item>
                                    <el-form-item label="密码">
                                        <el-input v-model="registerData.password" placeholder="请输入密码（ 6-12位 含字母数字）" type="password" />
                                    </el-form-item>
                                    <el-form-item label="确认密码">
                                        <el-input v-model="registerData.repssword" placeholder="请再次输入密码" type="password" />
                                    </el-form-item>
                                    <div class="footer-button">
                                            <el-button type="primary" @click="handleRegister">注册</el-button>
                                    </div>
                                </el-form>
                            </el-tab-pane>
                        </el-tabs>
                    </el-card>
                </div>
            </el-main>
            <el-footer class="footer-wrapped">
                <div class="footer-contain">
                    <div class="title">
                        <span>Git-hub</span> |
                        <span>Git-hub</span> |
                        <span>Git-hub</span> |
                        <span>Git-hub</span>
                    </div>
                </div>
            </el-footer>
        </el-container>
    </div>
    <forget ref="forgetP"></forget>
</template>

<style scoped lang="scss">
//头部外壳
.header-wrapped{
    //头部内容
    .header-content{
        width: 1200px;
        margin: auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .welcome{//欢迎语
            font-size: 13px;
        }
    }
}
.el-main{
    background-image: url('@/assets/login/1.png');
    height: 600px;
    --el-main-padding: 0;
    .login-wrapped{
        width: 1200px;
        height: 600px;
        margin: 0 auto;
    }
}
.login-wrapped{
    .el-card{
        width: 350px;
        height: 375px;
        float: right;
        position: relative;
        top: 14%;
        .login-form{
            .footer-wrapped{
                display: flex;
                flex-direction: column;
                .forget-password{
                    display: flex;
                    justify-content: flex-end;
                    margin: 10px 0;
                    .forget-password-button{
                        font-size: 12px;
                        color: #409eff;
                        cursor: pointer;
                    }
                }
                .footer-button{
                    display: flex;
                    width: 100%;
                    justify-content: center;
                }
                .footer-go-register{
                    font-size: 12px;
                    margin: 12px 0;
                    display: flex;
                    justify-content: center;
                    .go-register-button{
                        font-size: 12px;
                        color: #409eff;
                        cursor: pointer;
                    }
                }
            }
            .footer-button {
                display: flex;
                width: 100%;
                justify-content: center;
            }
        }
    }
}
.footer-wrapped{
    margin-top: 10px;
    .footer-contain{
        width: 1200px;
        margin:auto;
        display: flex;
        justify-content: center;
        align-items: center;
        .title{
            color: #666;
        }
        span{
            color: #666;
            font-size: 12px;
        }
    }
}
// 表单边距
.el-form{
    margin-top: 30px;

}
// tabs标签
:deep(.el-input__inner){
    height: 40px;
}
// 输入框高度
:deep(.el-tabs__item) {
    color: #333;
    font-size: 18px;
}
//输入框标签字体高度
:deep(.el-form-item__label){
    height: 40px;
    line-height: 40px;
}
:deep(.el-button){
    width: 300px;
    height: 45px;
    font-size: 16px;
}
</style>