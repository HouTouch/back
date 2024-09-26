<script setup lang="ts">
import { ref, reactive } from 'vue'
import { changePassword} from '@/api/userInfor'
import { number } from 'echarts';
//表单对齐方式
const labelPosition = ref('top')

const forgetData: formData = reactive({
    oldPassword: '',
    newPassword: ''
})
interface formData {
    oldPassword: string,
    newPassword: string,
}
const state = reactive({
    changePasswordDialog: false
})

// 修改密码 id newPassword oldPassword
const changePasswordFnc = async () => {
    
    const localData = JSON.parse(localStorage.getItem('pinia-userinfor'))
    const id = localData.id
    if (forgetData.newPassword && forgetData.oldPassword) {
        await changePassword(id, forgetData.oldPassword,forgetData.newPassword )
        ElMessage.success('修改成功')
    } else {
        ElMessage.error('请检查输入的密码')
    }

}

const rules = reactive({
    oldPassword: [
        { required: true, message: '请输入旧密码', trigger: 'blur' },
    ],
    newPassword: [
        { required: true, message: '请输入新密码', trigger: 'blur' },
    ]
})

const open = () => {
    state.changePasswordDialog = true
}
defineExpose({
    open
})
</script>

<template>
    <div>
        <!-- 修改密码 -->
        <el-dialog v-model="state.changePasswordDialog" title="修改密码" width="400px">
            <el-form :label-position="labelPosition" class="login-form" :rules="rules">
                <el-form-item label="请输入您的旧密码" prop="oldPassword">
                    <el-input v-model="forgetData.oldPassword" placeholder="请输入您的旧密码" />
                </el-form-item>
                <el-form-item label="请输入您的新密码" prop="newPassword">
                    <el-input v-model="forgetData.newPassword" placeholder="请输入您想更改的密码" />
                </el-form-item>
            </el-form>
            <!-- 底部内容 -->
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="state.changePasswordDialog = false">取消</el-button>
                    <el-button type="primary" @click="changePasswordFnc">
                        确定
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<style scoped lang="scss">
</style>