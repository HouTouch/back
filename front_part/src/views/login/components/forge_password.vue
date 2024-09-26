<script setup lang="ts">
import { ref, reactive } from 'vue'
import { verifyAccountEmaiil, resetPassword } from '@/api/login'
//表单对齐方式
const labelPosition = ref('top')

const forgetData: formData = reactive({
    account:null,
    email: '',
    password: '',
    repassword: '',
})
interface formData{
    account: number;
    email: string,
    password: string,
    repassword: string,
}
const state = reactive({
    forgetPasswordDialog: false,
    changePasswordDialog: false
})

//打开验证邮箱和账号的弹窗
const openChanagePassword = async () => {
    const res = await verifyAccountEmaiil(forgetData)
    if (res.data.status === 0) {
        ElMessage.success('验证成功')
        //localStorage存储在浏览器本地空间
        //session则是存放在浏览器的会话存储空间
        localStorage.setItem('id',res.data.id)
        state.forgetPasswordDialog = false,
        state.changePasswordDialog = true
    } else {
        ElMessage.error('验证失败')
    }

}
//忘记密码 重置密码
const onResetPassword = async () => {
    if (forgetData.password === forgetData.repassword) {
        await resetPassword(localStorage.getItem('id'), forgetData.password)
        ElMessage.success('修改成功')
    } else {
        ElMessage.error('修改失败，请检查密码是否一致')
    }

}

const rules = reactive({
    account: [
        { required: true, message: '请输入账号', trigger: 'blur' },
    ],
    email: [
        { required: true, message: '请输入邮箱', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
    ],
    repassword: [
        { required: true, message: '请再次输入密码', trigger: 'blur' },
    ],
})

const open = () => {
    state.forgetPasswordDialog = true
}
defineExpose({
    open
})
</script>

<template>
    <div>
        <!-- 忘记密码 -->
        <el-dialog v-model="state.forgetPasswordDialog" title="忘记密码" width="400px">
            <el-form :label-position="labelPosition" class="login-form" :rules="rules">
                <el-form-item label="请输入您注册的账号" prop="account">
                    <el-input v-model="forgetData.account" placeholder="请输入您的注册账号" />
                </el-form-item>
                <el-form-item label="请输入您注册的邮箱" prop="email">
                    <el-input v-model="forgetData.email" placeholder="请输入您的个人邮箱" />
                </el-form-item>
            </el-form>
            <!-- 底部内容 -->
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="state.forgetPasswordDialog = false">取消</el-button>
                    <el-button type="primary" @click="openChanagePassword">
                        下一步
                    </el-button>
                </div>
            </template>
        </el-dialog>
        <!-- 修改密码 -->
        <el-dialog v-model="state.changePasswordDialog" title="修改密码" width="400px">
            <el-form :label-position="labelPosition" class="login-form" :rules="rules">
                <el-form-item label="请输入您的新密码" prop="password">
                    <el-input v-model="forgetData.password" placeholder="请输入您的新密码" />
                </el-form-item>
                <el-form-item label="请再次输入您的新密码" prop="repassword">
                    <el-input v-model="forgetData.repassword" placeholder="请再次输入您的新密码" />
                </el-form-item>
            </el-form>
            <!-- 底部内容 -->
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="state.changePasswordDialog = false">取消</el-button>
                    <el-button type="primary" @click="onResetPassword">
                        确定
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<style lang="scss" scoped>
[data-v-2bf2fc29] .el-button{
    width: 100px;
}
</style>