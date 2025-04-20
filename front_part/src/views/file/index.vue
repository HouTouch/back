<script setup lang="ts">
import { ref, reactive } from "vue";
import breadCrumb from "@/components/bread_crumb.vue";
import tips from './components/tips.vue'
	import type {
		UploadUserFile
	} from 'element-plus'
import { bus } from "@/utils/mitt";
import {
    bindFileAndUser,
    fileListLength,
    returnFilesListData,
    updateDownload
} from '@/api/files'
// 面包屑
const breadcrumb = ref();
// 面包屑参数
const item = ref({
  first: "文件管理",
});
const fileList = ref<UploadUserFile[]>([])
const baseUrl = ref('http://127.0.0.1:3001/file/uploadFile')
const handleExceed = () => {
    ElMessage.warning(
        '最多上传三个文件！'
    )
}
// const testFnc = () => {
//     console.log(JSON.parse(localStorage.getItem('pinia-userinfor')).name)
// }
// testFnc()
// 文件上传成功回调
const handleSuccess = (response: any) => {
    const localName = JSON.parse(localStorage.getItem('pinia-userinfor')).name
    console.log(response)
    if (response.status == 0) {
        (async () => {
            await bindFileAndUser(localName, response.url)
        })()
        ElMessage.success('上传成功！')
        getFileFirstPageList()
    }else ElMessage.error('上传失败！')
}
const tableData = ref([])

// 分页数据
const paginationData = reactive({
    // 文件总数
    fileTotal: 1,
    // 文件列表总页数
    filePageCount: 1,
    // 文件列表当前所处页数
    fileCurrentPage: 1,
})
// 获取文件列表的页数
const getFiletListLength = async () => {
    const res = await fileListLength() as any
    paginationData.fileTotal = res.data.length
    paginationData.filePageCount = Math.ceil(res.length / 10)
}
getFiletListLength()
// 默认获取文件列表第一页的数据
const getFileFirstPageList = async () => {
    const res = await returnFilesListData(1)
    tableData.value = res.data
}
getFileFirstPageList()


// 文件列表监听换页
const fileCurrentChange = async (value: number) => {
    paginationData.fileCurrentPage = value
    const res = await returnFilesListData(paginationData.fileCurrentPage)
    tableData.value = res.data
}


const tip = ref()

const deleteFile = (row: any) => {
    bus.emit('deleteFile', row)
    tip.value.open()
}
</script>
<template>
    <breadCrumb ref="breadcrumb" :item="item"></breadCrumb>
    <div class="table-wrapped">
        <div class="table-top">
            <div class="table-header">
                <div></div>
                <div class="upload-wrapped">
                    <el-upload v-model:file-list="fileList" class="upload-demo" :action="baseUrl" multiple :limit='3'
                        :on-exceed='handleExceed' :on-success="handleSuccess" :show-file-list='false'>
                        <el-button type="primary">上传文件</el-button>
                    </el-upload>
                </div>
            </div>
            <div class="table-content">
                <el-table :data='tableData' style="width: 100%;">
                    <el-table-column type="index" width="50"></el-table-column>
                    <el-table-column prop="file_name" label="文件名" />
                    <el-table-column prop="file_size" label="文件大小">
                        <template #default="{ row }">
                            <div>{{ row.file_size?.slice(0, 2) }}KB</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="upload_person" label="上传者" />
                    <el-table-column prop="download_number" label="下载次数" />
                    <el-table-column prop="upload_time" label="上传时间" width="200">
                        <template #default="{ row }">
                            <div>{{ row.upload_time?.slice(0, 10) }}</div>
                        </template>
                    </el-table-column>

                    <el-table-column label="操作" width="200" fixed="right">
                        <template #default="{ row }">
                            <div>
                                <el-button type="success">
                                    <template #default>
                                        <a :href="row.file_url"
                                            >下载文件</a>
                                    </template>
                                </el-button>
                                <el-button type="danger" @click="deleteFile(row)">删除</el-button>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div class="table-footer">
            <el-pagination :page-size="1" :current-page="paginationData.fileCurrentPage" :pager-count="7"
                :total="paginationData.fileTotal" :page-count="paginationData.filePageCount"
                @current-change="fileCurrentChange" layout="prev, pager, next" />
        </div>
    </div>
    <tips ref="tip" @success='getFileFirstPageList'></tips>
</template>
<style lang="scss" scoped>
:deep(.el-table .cell) {
    font-weight: 400;
}

a {
    color: #fff;
    display: block;
    text-decoration: none;
}
</style>
