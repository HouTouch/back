<script lang="ts" setup>
import { ref, onBeforeUnmount } from "vue";
import { bus } from "@/utils/mitt";
import { changeIdentityToUser, deleteUser } from "@/api/userInfor";
import { tracking } from "@/utils/operation";
// 弹窗开关
const dialogFormVisible = ref(false);
//
const open = () => {
  dialogFormVisible.value = true;
};

defineExpose({
  open,
});
const adminId = ref();
const userId = ref()
const account = ref()
const name = ref()
// 接受传递过来的id
bus.on("DeleteId", async (id: number) => {
  adminId.value = id;
});
bus.on("deleteId", async (userInFor: any) => {
  userId.value = userInFor.id;
  account.value = userInFor.account;
  name.value = userInFor.name;
})

// const emit = defineEmits(["success"]);
const deleteAdmin = async (id: number) => {
  if (adminId.value) {
    const res = await changeIdentityToUser(id);
    if (res.status == 200) {
      ElMessage({
        message: "降级成功",
        type: "success",
      });
      // emit("success");
      tracking('管理员', localStorage.getItem("name"), name.value, '高级')
      bus.emit('adminDialogOff', 3)
      dialogFormVisible.value = false;
    } else {
      ElMessage({
        message: "降级失败",
        type: "error",
      });
      dialogFormVisible.value = false;
    }
  }
  if (userId.value) {
    const res = await deleteUser(userId.value, account.value);
    if (res.status == 200) {
      ElMessage.success("删除用户成功")
      tracking('管理员', localStorage.getItem("name"), name.value, '高级')
      dialogFormVisible.value = false;
      bus.emit("dialogOff", 1);
    } else {
      ElMessage({
        message: "删除失败",
        type: "error",
      });
      dialogFormVisible.value = false;
    }
  }

};



onBeforeUnmount(() => {
  bus.all.clear();
});
</script>

<template lang="">
  <el-dialog
    v-model="dialogFormVisible"
    title="删除管理员"
    width="600px"
    align-center
    draggable
  >
    <span v-if='adminId'>是否去掉此用户的管理员职位?删除后此用户将重新展现在用户列表中</span>
    <span v-else>谨慎操作！！！删除用户将无法登录</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="deleteAdmin(adminId)">确定</el-button>
      </span>
    </template>
</el-dialog>
</template>

<style lang="scss" scoped></style>
