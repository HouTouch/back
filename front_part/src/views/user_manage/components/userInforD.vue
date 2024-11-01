<script lang="ts" setup>
import { reactive, ref, toRefs, onBeforeUnmount } from "vue";
import { bus } from "@/utils/mitt";
import promote from "./promote.vue";
import editUser from "./editUser.vue";
import deleteAdmin from "./deleteAdmin.vue";
bus.on("userId", (row: any) => {
    console.log(row)
    userData.id = row.id
    userData.account = row.account
    userData.name = row.name
    userData.sex = row.sex
    userData.department = row.department
    userData.email = row.email
    userData.status = row.status
    userData.imageUrl = row.image_url
});
// 弹窗开关
const dialogUserVisible = ref(false);
//
const open = () => {
  dialogUserVisible.value = true;
};

defineExpose({
  open,
});



const userData = reactive({
    id:null,
  account: null,
  name: "",
  sex: "",
  department: "",
  email: "",
    status: null,
    imageUrl:''
});

bus.on("dialogOff", (id: number) => {
  if (id == 1) {
    dialogUserVisible.value = false;
  }
})
const promoteRef = ref() 
const openPromote = (id: number) => {
    bus.emit('promoteId', id)
    promoteRef.value.open()
}

const editUserRef = ref()
const openEdit = (id: number) => {
    bus.emit('editId', id)
    editUserRef.value.open()
}


const deleteAdminRef = ref()
const openDelete = (id: number) => {
  let userInFor = {
    id: id,
    account: userData.account,
    name: userData.name,
  }
  bus.emit('deleteId', userInFor)
    deleteAdminRef.value.open()
}
onBeforeUnmount(() => {
  bus.all.clear();
});
</script>

<template>
  <el-dialog v-model="dialogUserVisible" title="用户信息" width="500px" center draggable>
    <el-container>
      <el-aside width="200px">
        <el-avatar shape="square" :size="120" :src="userData.imageUrl" />
      </el-aside>
      <el-main>
        <div>账号：{{ userData.account }}</div>
        <div>姓名：{{ userData.name }}</div>
        <div>性别：{{ userData.sex }}</div>
        <div>部门：{{ userData.department }}</div>
        <div>邮箱：{{ userData.email }}</div>
        <div>
          状态：
          <span v-if="userData.status == '0'">正常</span>
          <span v-else>冻结</span>
        </div>
      </el-main>
    </el-container>
    <el-footer>
      <span @click="openEdit(userData.id)">编辑</span>
      <span @click="openPromote(userData.id)">赋权</span>
      <span @click="openDelete(userData.id)">删除用户</span>
    </el-footer>
  </el-dialog>
  <promote ref="promoteRef"></promote>
  <editUser ref="editUserRef"></editUser>
  <deleteAdmin ref="deleteAdminRef"></deleteAdmin>
</template>

<style lang="scss" scoped>
.el-main {
  --el-main-padding: epx;
}
.el-main > div {
  margin-bottom: 8px;
}
.el-footer {
  display: flex;
  justify-content: flex-end;
  --el-footer-height: 8px;
    span {
        margin-left: 8px;
        color: #409eff;
        cursor: pointer;
    }
}
</style>
