<script setup lang="ts">
import { ref, reactive } from 'vue'
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

//打开修改密码的弹窗
const openChanagePassword = () => {
    state.forgetPasswordDialog = false,
    state.changePasswordDialog = true
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
                <el-form-item label="请输入您注册的密码" prop="email">
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
                    <el-button type="primary" @click="state.changePasswordDialog = false">
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