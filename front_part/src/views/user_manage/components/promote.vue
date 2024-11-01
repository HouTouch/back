
<script lang="ts" setup>
import { ref } from 'vue'
import { bus } from '@/utils/mitt';
import { changeIdentityToAdmin } from '@/api/userInfor'
const radio = ref();
// 弹窗开关
const dialogPromoteVisible = ref(false);
//
const open = () => {
    dialogPromoteVisible.value = true;
};

defineExpose({
    open,
});
const userId = ref();
bus.on('promoteId', (id:any) => {
    userId.value = id;
})
const confirmFnc = async() => {
    const res = await changeIdentityToAdmin(userId.value,radio.value)
    console.log(res)
    if(res.status == 200){
        ElMessage.success('赋权成功')
        bus.emit('dialogOff',1)
        dialogPromoteVisible.value = false
    } else {
        ElMessage.error('赋权失败')
        dialogPromoteVisible.value = false
    }
}

</script>

<template >
    <el-dialog v-model="dialogPromoteVisible" title="赋权操作" width="30%" center>
        <el-radio-group v-model="radio">
            <el-radio value="产品管理员" size="large"> 产品管理员</el-radio>
            <el-radio value="用户管理员" size="large"> 用户管理员</el-radio>
            <el-radio value="消息管理员" size="large"> 消息管理员</el-radio>
        </el-radio-group>
        <el-footer>
            <span>
                <el-button type="" @click="confirmFnc">确定</el-button>
                <el-button type="primary" @click="dialogPromoteVisible=false">取消</el-button>
            </span>
        </el-footer>
    </el-dialog>
</template>
<style lang="scss" scoped>
    .el-radio-group{
        display: flex;
        justify-content: center;
    }
    .el-footer{
        span{
            display: flex;
            margin-top: 25px;
            justify-content: center;
        }
    }
</style>