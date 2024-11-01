<script lang="ts" setup>
import { ref, reactive, onBeforeUnmount } from "vue";
import { bus } from '@/utils/mitt'
import { createAdmin } from "@/api/userInfor";
import { getDepartment } from "@/api/setting";
onBeforeUnmount(() => {
  bus.all.clear()
})
const title = ref()
// 弹窗开关
const dialogFormVisible = ref(false);
// 
const open = () => {
    dialogFormVisible.value=true
}

defineExpose({
  open,
})
// 表单数据
interface formData {
    account: number,
    password: string,
    name: string,
    sex: string,
    email: string,
  department: string,  
    identity:string
}
const formData: formData = reactive({
    account: null,
    password: '',
    name: '',
    sex: '',
    email: '',
    department: '',
    identity: '',
})
// 校验规则
const rules = reactive({
    account: [
        { required: true, message: '请输入账号', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
    ],
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
bus.on('CreateId', (id: number) => {
  if (id == 1) {
    title.value = '新增产品管理员'
    formData.identity = '产品管理员'
  }else if (id == 2) {
    title.value = '新增用户管理员'
    formData.identity = '用户管理员'
  } else if (id == 3) {
    title.value = '新增消息管理员'
    formData.identity = '消息管理员'
  }
})
// 创建管理员
// const emit = defineEmits(['success'])
const createAdminFnc = async() => {
  const res = await createAdmin(formData)
  if (res.status == 200) {
    ElMessage({
      message: '创建成功',
      type: 'success',
    })
    // emit('success')
    bus.emit('adminDialogOff',1 )
    dialogFormVisible.value = false
  } else {
    ElMessage({
      message: '创建失败',
      type: 'error',
    })
    dialogFormVisible.value = false
  }
  
}

const departmentData = ref([])
const getDepartmentFnc = async() => {
  const res = await getDepartment()
  departmentData.value = res.data
}
getDepartmentFnc()
</script>

<template lang="">
  <el-dialog v-model="dialogFormVisible" :title="title" width="600px" align-center draggable>
    <div class="dialog-content">
      <el-form
        ref="ruleFormRef"
        :model="formData"
        :rules="rules"
        label-width="auto"
      >
        <el-form-item label="账号" prop="account">
          <el-input v-model="formData.account"/>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="formData.password"/>
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
            <el-option v-for="item in departmentData" :key="item" :label="item" :value="item" />
            
          </el-select>
        </el-form-item>
      </el-form>

    </div>
          <template #footer>
        <span class="dialog-footer">
        <el-button type="primary" @click="createAdminFnc">确定</el-button>
        </span>
      </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
.dialog-content {
  display: flex;
  padding: 20px 80px;
}

:deep(.el-form-item){
  margin: 30px;
}
</style>
