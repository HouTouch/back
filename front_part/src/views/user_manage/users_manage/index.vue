<script lang="ts" setup>
import { ref, reactive } from 'vue'
import breadCrumbC from '@/components/bread_crumb.vue'
import create from '@/views/user_manage/components/createAdmin.vue'
import { Search } from '@element-plus/icons-vue'
import { bus } from '@/utils/mitt'
import editAdmin from '@/views/user_manage/components/editAdmin.vue'
import { getAdminList, searchUser, getAdminListLength, returnListData } from '@/api/userInfor'
import deleteAdmin from '../components/deleteAdmin.vue'

const Edit = ref()
const openEditAdmin = (id: number) => {
    bus.emit('Edit', id)
    Edit.value.open()
}
const item = ref({
    first: '用户管理员'
})
// 搜索框数据
const adminAccount = ref<number>()
const tableData = ref([
    {
        id: 1
    }
])


const searcheAdmin = async () => {
    const res = await searchUser(adminAccount.value)
    if (res.data.result.length != 0) {
        tableData.value = res.data.result
    } else {
        ElMessage.error('没有找到该管理员')
        const res = await returnListData(0, '用户管理员')
        tableData.value = res.data.result
    }
}
// 创建管理员
const Create = ref()
const openCreate = (id: number) => {
    bus.emit('CreateId', id)
    Create.value.open()
}
// 取消管理员
const DeleteRef = ref()
const openDelete = (id: number) => {
    DeleteRef.value.open()
    bus.emit('DeleteId', id)
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
    const res = await getAdminListLength('用户管理员')
    adminTotal.value = res.data.length
    paginationData.pagecount = Math.ceil(adminTotal.value / 5)
}
getAdminListLengthData()

const getFirstPageList = async () => {
    const res = await returnListData(paginationData.currentPage, '用户管理员')
    tableData.value = res.data.result
}
getFirstPageList()
// 监听换页
const currentPage = async (value: number) => {
    paginationData.currentPage = value
    const res = await returnListData(value , '用户管理员')
    tableData.value = res.data.result
}
// 获取管理员列表
const getAdminListData = async () => {
    getFirstPageList()
}
getAdminListData()


</script>

<template>
    <breadCrumbC ref="breadCrumb" :item="item"></breadCrumbC>
    <div class="table-wrapped">
        <!-- 顶部 -->
        <div class="table-top">
            <!-- 表格顶部 -->
            <div class="table-header">
                <!-- 搜索框 -->
                <div class="searche-wrapped">
                    <el-input v-model="adminAccount" style="width: 240px" size="large" placeholder="请输入账号进行搜索"
                        :prefix-icon="Search" @change="searcheAdmin" />
                </div>
                <div class="button-wrapped">
                    <el-button type="primary" @click="openCreate(2)">添加用户管理员</el-button>
                </div>
            </div>
            <!-- 表格内容 -->
            <div class="table-content">
                <el-table :data="tableData" style="width: 100%" border>
                    <el-table-column type="index" width="50" />
                    <el-table-column prop="account" label="账号" />
                    <el-table-column prop="name" label="姓名" />
                    <el-table-column prop="sex" label="姓别" />
                    <el-table-column prop="department" label="部门" />
                    <el-table-column prop="email" label="邮箱" />
                    <el-table-column prop="update_time" label="更新时间" />
                    <el-table-column label="操作" width="200">
                        <template #default="{ row }">
                            <div>
                                <el-button link type="success" @click="openEditAdmin(row.id)">编辑</el-button>
                                <el-button link type="danger" @click="openDelete(row.id)">删除</el-button>
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
    <create ref="Create" @success="getAdminListData"></create>
    <editAdmin ref="Edit" @success="getAdminListData"></editAdmin>
    <deleteAdmin ref="DeleteRef" @success="getAdminListData"></deleteAdmin>
</template>


<style lang="scss" scoped></style>