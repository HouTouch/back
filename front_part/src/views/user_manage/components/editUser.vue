<script lang="ts" setup>
import { bus } from '@/utils/mitt'
import { getUserInfor, editAdmin } from '@/api/userInfor'
import { ref, reactive, onBeforeUnmount } from "vue";
onBeforeUnmount(() => {
    bus.all.clear()
})
// 弹窗开关
const dialogFormVisible = ref(false);
// 
const open = () => {
    dialogFormVisible.value = true
}

defineExpose({
    open,
})
// 表单数据
interface formData {
    id: number,
    account: number,
    name: string,
    sex: string,
    email: string,
    department: string,
}
const formData: formData = reactive({
    id: null,
    account: null,
    name: '',
    sex: '',
    email: '',
    department: '',
    identity:'用户'
})
// 校验规则
const rules = reactive({
    name: [
        { required: true, message: '请输入姓名', trigger: 'blur' },
    ],
    sex: [
        { required: true, message: '请选择性别', trigger: 'change' },
    ],
    email: [
        { required: true, message: '请输入邮箱', trigger: 'blur' },
    ],
    department: [
        { required: true, message: '请选择部门', trigger: 'change' },
    ],
})
// 接受传递过来的id
bus.on('editId', async (id: number) => {
    const res = await getUserInfor(id)
    formData.id = res.data.id
    formData.account = res.data.account
    formData.name = res.data.name
    formData.sex = res.data.sex
    formData.email = res.data.email
    formData.department = res.data.department
})

// const emit = defineEmits(['success'])
// 修改信息
const subMitEdit = async () => {
    const res = await editAdmin(formData)
    if (res.status == 200) {
        ElMessage({
            message: '编辑成功',
            type: 'success',
        })
        // emit('success')
      bus.emit('dialogOff',1)
        dialogFormVisible.value = false
    } else {
        ElMessage({
            message: '编辑失败',
            type: 'error',
        })
        dialogFormVisible.value = false
    }
}

</script>

<template lang="">
  <el-dialog v-model="dialogFormVisible" title="编辑用户信息" width="600px" align-center draggable>
    <div class="dialog-content">
      <el-form
        ref="ruleFormRef"
        :model="formData"
        :rules="rules"
        label-width="auto"
      >
        <el-form-item label="账号" prop="account">
          <el-input v-model="formData.account" disabled/>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="formData.name"/>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="formData.sex" placeholder="请选择性别">
            <el-option label="男" value="男" />
            <el-option label="女" value="女" />
          </el-select>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="formData.email"/>
        </el-form-item>
        <el-form-item label="部门" prop="department">
          <el-select v-model="formData.department" placeholder="请选择部门">
            <el-option label="总裁办" value="总裁办" />
            <el-option label="项目部" value="项目部" />
          </el-select>
        </el-form-item>
      </el-form>

    </div>
          <template #footer>
        <span class="dialog-footer">
        <el-button type="primary" @click="subMitEdit">确定</el-button>
        </span>
      </template>
</el-dialog>
</template>

<style lang="scss" scoped>
.dialog-content {
    display: flex;
    padding: 20px 80px;
}

:deep(.el-form-item) {
    margin: 30px;
}
</style>
