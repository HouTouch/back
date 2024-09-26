<script setup lang="ts">
import {
    onBeforeUnmount,
    ref, 
    reactive
} from 'vue'
import { bus } from "@/utils/mitt.js"
import {  getComponyIntroduce } from '@/api/setting'
const title = ref()
const valueHtml = ref()
bus.on("introduce", async (id: number) => {
    if (id == 1) {
        title.value = '公司介绍'
        const res = await getComponyIntroduce('公司介绍')
        valueHtml.value = res.data
    }
    if (id == 2) {
        title.value = '公司架构'
        const res = await getComponyIntroduce('公司架构')
        valueHtml.value = res.data
    }
    if (id == 3) {
        title.value = '公司战略'
        const res = await getComponyIntroduce('公司战略')
        valueHtml.value = res.data
    }
    if (id == 4) {
        title.value = '公司高层'
        const res = await getComponyIntroduce('公司高层')
        valueHtml.value = res.data
    }
})

const state = reactive({
    dialogFormVisible: false,
});


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
                <div class="content" v-html="valueHtml" ></div>
            </el-main>
        </el-container>

    </el-dialog>
</template>


<style scoped lang="scss">
.content{
    text-align: center;
}
:deep(.el-main){
    min-height: 500px;
}
</style>