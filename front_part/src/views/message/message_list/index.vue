<script lang="ts" setup>
import { ref, reactive } from "vue";
import breadCrumb from "@/components/bread_crumb.vue";
import createEdit from "../components/createEdit.vue";
import { bus } from "@/utils/mitt";
import { searchMessageByDepartment, searchMessageByLevel, deleteMessage, getCompanyMessageLength, getSystemMessageLength, returnCompanyListData, returnSystemListData } from "@/api/message";
import { getDepartment } from '@/api/setting'

// 面包屑
const breadcrumb = ref();
// 面包屑参数
const item = ref({
  first: "消息管理",
  second: "消息列表",
});
// ----------------------分页------------------------
// 分页数据
const paginationData = reactive({
    // 公司公告总数
    companyTotal: 1,
    // 公司公告列表总页数
    companyPageCount: 1,
    // 公司公告列表当前所处页数
    companyCurrentPage: 1,
    // 系统消息总数
    systemTotal: 1,
    // 系统消息总页数
    systemCount: 1,
    // 系统消息当前所处页数
    systemCurrentPage: 1,
})
// 获取公司公告列表的页数
const getCompanyListLength = async () => {
    const res = await getCompanyMessageLength()
    paginationData.companyTotal = res.data.length
    paginationData.companyPageCount = Math.ceil(res.data.length / 10)
}
getCompanyListLength()
// 获取系统消息列表的页数
const getSystemListLength = async () => {
    const res = await getSystemMessageLength()
    paginationData.systemTotal = res.data.length
    paginationData.systemCount = Math.ceil(res.data.length / 10)
}
getSystemListLength()
// 默认获取公司公告列表第一页的数据
const getCompanyFirstPageList = async () => {
    const res = await returnCompanyListData(1)
    companyTableData.value = res.data
}
getCompanyFirstPageList()
// 默认获取系统消息第一页的数据
const getSystemFirstPageList = async () => {
    const res = await returnSystemListData(1)
    console.log(res)
    systemTableData.value = res.data
}
getSystemFirstPageList()

// 更新公司公告列表及系统消息列表的第一页数据
const changeTwoPageList = () => {
    department.value = null
    radio2.value = null
    getCompanyFirstPageList()
    getSystemFirstPageList()
}

// 公司公告列表监听换页
const companyCurrentChange = async (value: number) => {
    paginationData.companyCurrentPage = value
    const res = await returnCompanyListData(paginationData.companyCurrentPage)
    console.log(res)
    companyTableData.value = res.data
}
// 系统消息列表监听换页
const systemCurrentChange = async (value: number) => {
    paginationData.systemCurrentPage = value
    const res = await returnSystemListData(paginationData.systemCurrentPage)
    systemTableData.value = res.data
}
// 按部门搜索
const department = ref();
const departmentList = ref()
const getDepartmentList = async () => {
    const res = await getDepartment()
    departmentList.value = res.data
}
getDepartmentList()

const searchMessageByDepartmentFnc = async () => {
    const res = await searchMessageByDepartment(department.value)
    companyTableData.value = res.data.data
}
// ----------------------公司管理------------------------
const createEditRef =ref()
const activeName = ref("first");

const radio2 = ref();
const getMessageListByLevel = async () => {
    const res = await searchMessageByLevel(radio2.value)
    companyTableData.value = res.data.data
};


const createMessage = (level: number) => {
    bus.emit("createMessage",level)
    createEditRef.value.open()
};

const companyTableData = ref([
    {
        id: 1
    }
])
const editMessageFnc = (row:any) => {
    bus.emit("editMessage", row) 
    createEditRef.value.open()
}
const deleteMessageFnc = async (id:number) => {
    const res = await deleteMessage(id)
    if (res.data.status == 0) {
        ElMessage.success("删除成功")
        location.reload()
    }else ElMessage.error("删除失败")
}
// ----------------------消息管理
const systemTableData = ref([{
    id: 1
}])

// 编辑系统消息
const editSystemMessageFnc = (row: any) => {
    bus.emit("editSystemMessage", row)
    createEditRef.value.open()
}


</script>

<template>
    <breadCrumb ref="breadcrumb" :item="item"></breadCrumb>
    <div class="module-common-wrapped">
        <div class="module-common-content">
            <el-tabs v-model="activeName" class="demo-tabs">
                <el-tab-pane label="公司管理" name="first">
                    <div class="pane-content">
                        <div class="pane-top">
                            <div class="module-common-header">
                                <div class="search-wrapped">
                                    <el-select v-model="department" placeholder="请选择部门" style="width: 160px"
                                        @change=" searchMessageByDepartmentFnc">
                                        <el-option v-for="(item, index) in departmentList" :key="index" :label="item"
                                            :value="item"></el-option>
                                    </el-select>
                                    <el-radio-group v-model="radio2" class="ml-4" @change="getMessageListByLevel"
                                        style="flex-wrap: nowrap">
                                        <el-radio label="一般" value="一般">一般</el-radio>
                                        <el-radio label="重要" value="重要">重要</el-radio>
                                        <el-radio label="必要" value="必要">必要</el-radio>
                                    </el-radio-group>
                                </div>
                                <div class="button-wrapped">
                                    <el-button type="primary" plain @click="getCompanyFirstPageList">全部公告</el-button>
                                    <el-button type="primary" @click="createMessage(1)">发布公告</el-button>
                                </div>
                            </div>
                            <!-- 表格部分 -->
                            <div class="module-common-table">
                                <el-table :data="companyTableData" border style="width: 100%">
                                    <el-table-column type="index" width="50"></el-table-column>
                                    <el-table-column prop="message_title" label="公告主题" width="320" />
                                    <el-table-column prop="message_category" label="类别" />
                                    <el-table-column prop="message_publish_department" label="发布部门" width="100" />
                                    <el-table-column prop="message_publish_name" label="发布人" />
                                    <el-table-column prop="message_receipt_object" label="接收对象" width="150" />
                                    <el-table-column prop="message_level" label="公告等级" width="150" />
                                    <el-table-column prop="message_create_time" label="发布时间" width="200">
                                        <template #default="{ row }">
                                            <div>{{ row.message_create_time?.slice(0, 10) }}</div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="message_update_time" label="最新编辑时间" width="200">
                                        <template #default="{ row }">
                                            <div>{{ row.message_update_time?.slice(0, 10) }}</div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="message_click_number" label="阅读人数" width="150" />
                                    <el-table-column label="操作" width="200" fixed="right">
                                        <template #default="{ row }">
                                            <div>
                                                <el-button type="success" @click="editMessageFnc(row)">编辑</el-button>
                                                <el-button type="danger"
                                                    @click="deleteMessageFnc(row.id)">删除</el-button>
                                            </div>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                        </div>
                        <div class="table-footer">
                            <el-pagination :page-size="1" :current-page="paginationData.companyCurrentPage"
                                :pager-count="7" :total="paginationData.companyTotal"
                                :page-count="paginationData.companyPageCount" @current-change="companyCurrentChange"
                                layout="prev, pager, next" />
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="消息管理" name="second">
                    <div class="pane-content">
                        <div class="pane-top">
                            <div class="module-common-header">
                                <div class="search-wrapped">
                                </div>
                                <div class="button-wrapped">
                                    <el-button type="primary" @click="createMessage(2)">发布系统消息</el-button>
                                </div>
                            </div>
                            <!-- 表格部分 -->
                            <div class="module-common-table">
                                <el-table :data="systemTableData" border style="width: 100%">
                                    <el-table-column type="index" width="50"></el-table-column>
                                    <el-table-column prop="message_title" label="消息主题" />
                                    <el-table-column prop="message_create_time" label="发布者" />
                                    <el-table-column prop="message_click_number" label="阅读人数" />
                                    <el-table-column prop="message_publish_time" label="发布时间" width="200">
                                        <template #default="{ row }">
                                            <div>{{ row.message_create_time?.slice(0, 10) }}</div>
                                        </template>
                                    </el-table-column>


                                    <el-table-column label="操作" width="200" fixed="right">
                                        <template #default="{ row }">
                                            <div>
                                                <el-button type="success"
                                                    @click="editSystemMessageFnc(row)">编辑</el-button>
                                                <el-button type="danger"
                                                    @click="deleteMessageFnc(row.id)">删除</el-button>
                                            </div>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                        </div>
                        <div class="table-footer">
                            <el-pagination :page-size="1" :current-page="paginationData.systemCurrentPage"
                                :pager-count="7" :total="paginationData.systemTotal"
                                :page-count="paginationData.systemCount" @current-change="systemCurrentChange"
                                layout="prev, pager, next" />
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
    <createEdit ref="createEditRef" @success="changeTwoPageList"></createEdit>
</template>

<style lang="scss" scoped>
.el-radio-group {
    margin-left: 20px;
}

:deep(.el-table .cell) {
    font-weight: 400;
}
</style>
