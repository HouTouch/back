<script lang="ts" setup>
import { ref, reactive, onBeforeUnmount } from 'vue'
import breadCrumbC from '@/components/bread_crumb.vue'
import { getAdminList, searchUser, getAdminListLength, returnListData, searchUserByDepartment, getBanUserList, banUser, unBanUser } from '@/api/userInfor'
import { Search } from '@element-plus/icons-vue'
import { getDepartment } from "@/api/setting";
import userInforD from '../components/userInforD.vue';
import { bus } from '@/utils/mitt';
const item = ref({
    first: '用户列表'
})
// 搜索框数据
const adminAccount = ref<number>()
const tableData = ref([
    {
        id: 1
    }
])


const searcheUser = async () => {
    const res = await searchUser(adminAccount.value)
    if (res.data.result.length != 0) {
        tableData.value = res.data.result
    } else {
        ElMessage.error('没有找到该管理员')
        const res = await getAdminList(item.value.first)
        tableData.value = res.data.result
    }
}

const departmentData = ref([])
const getDepartmentFnc = async () => {
    const res = await getDepartment()
    departmentData.value = res.data
}
getDepartmentFnc()
const formData = ref({
    department:''
})
// 部门搜搜
const searchForDepartment = async() => {
    const res = await searchUserByDepartment(formData.value.department)
    tableData.value = res.data.result
}
// 清空选择框
const clearOperation = () => {
    getAdminListData()
}

// 分页
const paginationData = reactive({
    pagecount: 1,
    // 当前所处页数
    currentPage: 1,
})
const adminTotal = ref<number>(0)
// 获取管理员数量
const getAdminListLengthData = async () => {
    const res = await getAdminListLength('用户')
    adminTotal.value = res.data.length
    paginationData.pagecount = Math.ceil(adminTotal.value / 5)
}
getAdminListLengthData()
// 默认获取第一页数据
const getFirstPageList = async () => {
    const res = await returnListData(paginationData.currentPage, '用户')
    tableData.value = res.data.result
}
getFirstPageList()
// 监听换页
const currentPage = async (value: number) => {
    paginationData.currentPage = value
    const res = await returnListData(value, '用户')
    tableData.value = res.data.result
}
// 获取管理员列表
const getAdminListData = async () => {
    getFirstPageList()
}
getAdminListData()

// 筛选冻结用户
const banUserList = async() => {
    const res = await getBanUserList()
    tableData.value = res.data.result
}

// 冻结用户
const banUserFnc = async(id:number) => {
    const res = await banUser(id)
    if(res.data.status == 1) {
        ElMessage.success('冻结成功')
        getAdminListData()
    } else {
        ElMessage.error('冻结失败')
    }
}


// 解冻用户
const unBanUserFnc = async(id:number) => {
    const res = await unBanUser(id)
    console.log(res)
    if (res.data.status == 1) {
        ElMessage.success('解冻成功')
        getAdminListData()
    } else {
        ElMessage.error('解冻失败')
    }
}

const userIfRef = ref()
const openUserIf = (row: any) => {
    bus.emit('userId', row)
    userIfRef.value.open()
}
bus.on('dialogOff', async (id: number) => {
    // 当前页数
    const current = paginationData.currentPage
    if (id) {
        getFirstPageList()
        if (tableData.value.length == 0) {
            paginationData.currentPage = current-1
            getAdminListLengthData()
        }
    }
})
onBeforeUnmount(() => {
    bus.all.clear();
});
</script>

<template>
    <breadCrumbC ref="breadCrumb" :item="item"></breadCrumbC>
    <div class="table-wrapped">
        <!-- 顶部 -->
        <div class="table-top">
            <!-- 表格顶部 -->
            <div class="table-header">
                <div class="left-wrapped">
                    <!-- 搜索框 -->
                    <div class="searche-wrapped">
                        <el-input v-model="adminAccount" style="width: 240px" size="large" placeholder="请输入账号进行搜索"
                            :prefix-icon="Search" @change="searcheUser" />
                    </div>
                    <div class="select-wrapped">
                        <el-form-item>
                            <el-select v-model="formData.department" placeholder="请选择部门" style="width: 200px;" clearable
                                @change="searchForDepartment" @clear="clearOperation">
                                <el-option v-for="item in departmentData" :key="item" :label="item" :value="item" />
                            </el-select>
                        </el-form-item>
                    </div>
                </div>
                <div class="button-wrapped">
                    <el-button plain type="primary" @click="banUserList">筛选冻结用户</el-button>
                    <el-button plain type="primary" @click="getAdminListData">显示全部用户</el-button>
                </div>
            </div>
            <!-- 表格内容 -->
            <div class="table-content">
                <el-table :data="tableData" style="width: 100%" border @row-dblclick="openUserIf">
                    <el-table-column type="index" width="50" />
                    <el-table-column prop="account" label="账号" />
                    <el-table-column prop="name" label="姓名" />
                    <el-table-column prop="sex" label="姓别" />
                    <el-table-column prop="department" label="部门" />
                    <el-table-column prop="email" label="邮箱" />
                    <el-table-column prop="status" label="状态">
                        <template #default="{ row }">
                            <div class="flex gap-2">
                                <el-tag v-if="row.status == 1">冻结</el-tag>
                                <el-tag v-else type="success">正常</el-tag>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="create_time" label="创建时间">
                        <template #default="{ row }">
                            <div>{{ row.create_time?.slice(0,10) }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="update_time" label="更新时间">
                        <template #default="{ row }">
                            <div>{{ row.update_time?.slice(0, 10) }}</div>
                        </template>

                    </el-table-column>
                    <el-table-column label="操作" width="200">
                        <template #default="{ row }">
                            <div>
                                <el-button link type="primary" @click="banUserFnc(row.id)"
                                    :disabled="row.status == 1">冻结</el-button>
                                <el-button link type="success" @click="unBanUserFnc(row.id)"
                                    :disabled="row.status == 0">解冻</el-button>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <!-- 底部 -->
        <div class="table-footer">
            <el-pagination :page-size="2" :current-page="paginationData.currentPage" :pager-count="7"
                :total="adminTotal" :page-count="paginationData.pagecount" layout="prev, pager, next"
                @current-change="currentPage" />
        </div>
    </div>
    <userInforD ref="userIfRef"></userInforD>

</template>


<style lang="scss" scoped>
</style>