<script lang="ts" setup>
import { onBeforeUnmount, ref } from "vue";
import { bus } from "@/utils/mitt.js";
import { deleteFile } from "@/api/files";
import { ElMessage } from "element-plus";
const title = ref();
// 消息ID
const fileId = ref();
// 文件名
const fileName = ref();


bus.on("deleteFile", (row: any) => {
    title.value = "删除文件";
    fileId.value = row.id;
    fileName.value = row.file_name;
});
const emit = defineEmits(["success"]);

const operationFiles = async () => {
  const res = await deleteFile(
    fileId.value ,
    fileName.value
    );
  if (res.data.status == 0) {
    ElMessage({
      message: "删除文件成功",
      type: "success",
    });
    emit("success");
    dialogFormVisible.value = false;
  } else {
    ElMessage.error("删除文件失败");
    dialogFormVisible.value = false;
  }
};

// 弹窗开关
const dialogFormVisible = ref(false);

// 打开编辑管理员的弹窗
const open = () => {
  dialogFormVisible.value = true;
};

defineExpose({
  open,
});

onBeforeUnmount(() => {
  bus.all.clear();
});
</script>
<template>
  <el-dialog v-model="dialogFormVisible" title="删除文件" width="30%" center>
    <span>请慎重操作！您确定要真正删除这个文件吗？</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="operationFiles"> 删除 </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<style lang="scss" scoped></style>
