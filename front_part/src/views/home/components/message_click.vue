<script setup lang="ts">
import {
    onBeforeUnmount,
    ref,
    reactive
} from 'vue'
import { bus } from "@/utils/mitt.js"

const title = ref()
const valueHtml = ref()
const publishName = ref()
const publishContent = ref()
const state = reactive({
    dialogFormVisible: false,
});

bus.on('messageClick',(row:any)=> {
    valueHtml.value = row.message_title
    publishName.value = '发布人：'+row.message_publish_name
    publishContent.value = row.message_content

})

// 暴露open方法
const open = () => {
    state.dialogFormVisible = true;
};
defineExpose({
    open,
});

// 取消订阅/监听
onBeforeUnmount(() => {
    bus.all.clear()
})
</script>
<template>
    <el-dialog v-model="state.dialogFormVisible" :title="title" width="800px" destroy-on-close center>
        <el-container>
            <el-main>
                <div class="content" v-html="valueHtml">
                </div>
                <div class="publishName" v-html="publishName">
                </div>
                <div class="publishContent" v-html="publishContent">
                </div>
            </el-main>
        </el-container>

    </el-dialog>
</template>


<style scoped lang="scss">
.content {
    text-align: center;
    margin-bottom: 25px;
}
.publishName {
    text-align: center;
    margin-bottom: 25px;
}
.publishContent {
    border: 1px solid #a0a0a0f8;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.171);
    padding-top: 20px;
    text-align: center;
    margin-bottom: 25px;
    height: 80%;
}

:deep(.el-main) {
    min-height: 500px;
}
</style>