<script setup lang="ts">
import breadCrumbC from '@/components/bread_crumb.vue'
import { ref, reactive } from 'vue'
const item = ref({
    first: '系统设置'
})
const activeName = ref('first')

import { Plus } from '@element-plus/icons-vue'

import type { UploadProps } from 'element-plus'
import useUserInfor from '@/store/userInfor';
import { bindAccount, changeName, changeSex, changeEmail,getUserInfor } from '@/api/userInfor'
import change_password from './components/change_password.vue'
import edior from './components/edior.vue';
import { bus } from '@/utils/mitt';
import { changeComponyName, getComponyName, getAllSwipers, setDepartment, getDepartment, setProduct, getProduct } from '@/api/setting'
import { ElMessage } from 'element-plus';
import { onMounted, nextTick, toRaw } from 'vue';
import { ElInput } from 'element-plus'
import type { InputInstance } from 'element-plus'


const userInfor = useUserInfor()
//获取本地存储的id
const localData = JSON.parse(localStorage.getItem('pinia-userinfor'))
const { id } = localData || {};

//用户数据
const name = ref()
interface userData{
    account:number,
    name:string,
    sex:string,
    identity:string,
    department:string,
    email:string
}

const userData:userData = reactive({
    account:null,
    name:'',
    sex:'',
    identity:'',
    department:'',
    email:''
})
onMounted(async()=>{
    const res = await getUserInfor(id)
    userData.account=res.data.account
    userData.name=res.data.name
    userData.sex=res.data.sex
    userData.identity=res.data.identity
    userData.department=res.data.department
    userData.email=res.data.email
})


//头像上传成功的函数
const handleAvatarSuccess: UploadProps['onSuccess'] = (
    response,
) => {
    // imageUrl.value = URL.createObjectURL(uploadFile.raw!)
    if (response.status == 0) {
        userInfor.$patch({
            imageUrl: response.url
        })
        ElMessage.success('更新头像成功'),
            (async () => {
                await bindAccount(userInfor.account, response.onlyId, response.url)
            })()
    } else {
        ElMessage.error('更新头像失败,请重新尝试')
    }
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    if (rawFile.type !== 'image/jpeg') {
        ElMessage.error('Avatar picture must be JPG format!')
        return false
    } else if (rawFile.size / 1024 / 1024 > 2) {
        ElMessage.error('Avatar picture size can not exceed 2MB!')
        return false
    }
    return true
}
const change_Password = ref()
console.log(change_Password.value)
const openChangePassword = () => {
    change_Password.value.open()
}


//修改姓名
const changeNameFnc = async () => {
    const res = await changeName(userData.name, id)
    if (res.status == 1) {
        ElMessage.error('修改失败')
    } else {
        ElMessage.success('修改成功')
    }
}
//修改性别
const changeSexFnc = async () => {
    const res = await changeSex(userData.sex, id)
    console.log(res)
    if (res.status == 1) {
        ElMessage.error('修改失败')
    } else {
        ElMessage.success('修改成功')
    }
}
//修改邮箱
const changeEmailFnc = async () => {
    const res = await changeEmail(userData.email, id)
    if (res.status == 1) {
        ElMessage.error('修改失败')
    } else {
        ElMessage.success('修改成功')
    }
}
const ediorP = ref()

//打开富文本
const openEditor = (id: number) => {
    //标记  传递的值
    bus.emit('editorTitle', id)
    ediorP.value.open()
}
//公司信息
const companyName = ref()
//获取公司名字
const getCompanyNameFnc = async () => {
    const res = await getComponyName()
    companyName.value = res.data
}
getCompanyNameFnc()

//改变公司名字
const changeComponyNameFnc = async () => {
    const res = await changeComponyName(companyName.value)
    if (res.status == 0) {
        ElMessage.error('修改失败')
    } else {
        ElMessage.success('修改成功')

    }
}

//轮播图管理
const swiperData = [
    { name: 'swiper1' },
    { name: 'swiper2' },
    { name: 'swiper3' },
    { name: 'swiper4' },
    { name: 'swiper5' },
    { name: 'swiper6' }
]
//上传轮播图
const handleSwiperSuccess: UploadProps['onSuccess'] = (response) => {
    getAllSwipersFnc()
    console.log(response)
}
const imageUrl = ref([])
//获取轮播图
const getAllSwipersFnc = async () => {
    const res = await getAllSwipers()
    imageUrl.value = res.data
}
getAllSwipersFnc()

// 部门设置
const inputValue = ref('')
const dynamicTags = ref()
const inputVisible = ref(false)
const InputRef = ref<InputInstance>()
// 产品设置
const PinputValue = ref('')
const PdynamicTags = ref()
const PinputVisible = ref(false)
const PInputRef = ref<InputInstance>()
// 获取部门数据
const getDepartmentFnc = async () => {
    const res = await getDepartment()
    dynamicTags.value = res.data
}
getDepartmentFnc()
// 获取产品数据
const getProductFnc = async () => {
    const res = await getProduct()
    PdynamicTags.value = res.data
}
getProductFnc()

// 部门设置关闭时执行的函数
const handleClose = async(tag: string) => {
    dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1)
    const res = await setDepartment(JSON.stringify(toRaw(dynamicTags.value)))
    if (res.status == 200) { 
        ElMessage.success('删除成功')
    }else ElMessage.error('删除部门失败，请重新尝试')
}
// 产品设置关闭时执行的函数
const handleProductClose = async (tag: string) => {
    PdynamicTags.value.splice(PdynamicTags.value.indexOf(tag), 1)
    const res = await setProduct(JSON.stringify(toRaw(PdynamicTags.value)))
    if (res.status == 200) {
        ElMessage.success('删除成功')
    } else ElMessage.error('删除产品失败，请重新尝试')
}
// 部门点击按钮
const showInput = () => {
    inputVisible.value = true
    nextTick(() => {
        InputRef.value!.input!.focus()
    })
}
// 产品点击按钮
const showInputProduct = () => {
    PinputVisible.value = true
    nextTick(() => {
        PInputRef.value!.input!.focus()
    })
}
//部门输入数据完成时
const handleInputConfirm = async() => {
    if (inputValue.value) {
        dynamicTags.value.push(inputValue.value)
        const res = await setDepartment(JSON.stringify(toRaw(dynamicTags.value)))
        if (res.status == 200) {
            ElMessage.success('添加部门成功')
        } else ElMessage.error('添加部门失败')
    
    }
    inputVisible.value = false
    inputValue.value = ''
}
//产品输入数据完成时
const handleInputConfirmProduct = async () => {
    if (PinputValue.value) {
        PdynamicTags.value.push(PinputValue.value)
        const res = await setProduct(JSON.stringify(toRaw(PdynamicTags.value)))
        if (res.status == 200) {
            ElMessage.success('添加产品成功')
        } else ElMessage.error('添加产品失败')

    }
    PinputVisible.value = false
    PinputValue.value = ''
}
</script>

<template>
    <breadCrumbC ref="breadCrumb" :item="item"></breadCrumbC>
    <div class="common-wrapped">
        <div class="common-content">
            <el-tabs v-model="activeName" class="demo-tabs">
                <el-tab-pane label="账号详情" name="first">
                    <div class="account-infor-warpped">
                        <span>用户头像：</span>
                        <div class="account-infor-content">
                            <el-upload class="avatar-uploader" action="http://127.0.0.1:3001/user/uploadAvatar"
                                :show-file-list="false" :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload">
                                <img v-if="userInfor.imageUrl" :src="userInfor.imageUrl" class="avatar" />
                                <el-icon v-else class="avatar-uploader-icon">
                                    <Plus />
                                </el-icon>
                            </el-upload>
                        </div>
                    </div>
                    <div class="account-infor-warpped">
                        <span>用户账号：</span>
                        <div class="account-infor-content">
                            <el-input v-model="userData.account" disabled></el-input>
                        </div>
                    </div>
                    <div class="account-infor-warpped">
                        <span>用户密码：</span>
                        <div class="account-infor-content">
                            <el-button type="primary" @click='openChangePassword'>修改密码</el-button>
                        </div>
                    </div>
                    <div class="account-infor-warpped">
                        <span>用户姓名：</span>
                        <div class="account-infor-content">
                            <el-input v-model="userData.name"></el-input>
                        </div>
                        <div><el-button type="primary" @click="changeNameFnc">保存</el-button></div>
                    </div>
                    <div class="account-infor-warpped">
                        <span>用户性别：</span>
                        <div class="account-infor-content">
                            <el-select v-model="userData.sex" placeholder="请选择" style="width: 260px;">
                                <el-option label="男" value="man1" />
                                <el-option label="女" value="woman2" />
                            </el-select>
                        </div>
                        <div><el-button type="primary" @click="changeSexFnc">保存</el-button></div>
                    </div>
                    <div class="account-infor-warpped">
                        <span>用户身份：</span>
                        <div class="account-infor-content">
                            <el-input v-model="userData.identity" disabled></el-input>
                        </div>
                    </div>
                    <div class="account-infor-warpped">
                        <span>用户部门：</span>
                        <div class="account-infor-content">
                            <el-input v-model="userData.department" disabled></el-input>
                        </div>
                    </div>
                    <div class="account-infor-warpped">
                        <span>用户邮箱：</span>
                        <div class="account-infor-content">
                            <el-input v-model="userData.email"></el-input>
                        </div>
                        <div><el-button type="primary" @click="changeEmailFnc">保存</el-button></div>
                    </div>

                </el-tab-pane>

                <el-tab-pane label="公司信息" name="second">
                    <div class="account-infor-warpped">
                        <span>公司名称</span>
                        <div class="account-infor-content">
                            <el-input v-model="companyName"></el-input>
                        </div>
                        <div><el-button type="primary" @click="changeComponyNameFnc">编辑公司名称</el-button></div>
                    </div>
                    <div class=" account-infor-warpped">
                        <span>公司介绍</span>
                        <div class="account-infor-content">
                            <el-button type="primary" @click="openEditor(1)">编辑公司介绍</el-button>
                        </div>
                    </div>
                    <div class="account-infor-warpped">
                        <span>公司架构</span>
                        <div class="account-infor-content">
                            <el-button type="primary" @click="openEditor(2)">编辑公司介绍</el-button>
                        </div>
                    </div>
                    <div class="account-infor-warpped">
                        <span>公司战略</span>
                        <div class="account-infor-content">
                            <el-button type="primary" @click="openEditor(3)">编辑公司介绍</el-button>
                        </div>
                    </div>
                    <div class="account-infor-warpped">
                        <span>公司高层</span>
                        <div class="account-infor-content">
                            <el-button type="primary" @click="openEditor(4)">编辑公司介绍</el-button>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="首页管理" name="third">
                    <div class="home-wrapped">
                        <!-- 提示 -->
                        <div class="tips">
                            <span>提示：点击图片狂进行切换首页轮播图</span>
                        </div>
                    </div>
                    <!-- 轮播图 -->
                    <div class="swiper-wrapped" v-for="(item, index) in swiperData" :key='index'>
                        <div class="swiper-name">轮播图{{ index+1 }}</div>
                        <el-upload class="avatar-uploader" action="http://127.0.0.1:3001/set/uploadSwiper"
                            :show-file-list="false" :on-success="handleSwiperSuccess"
                            :before-upload="beforeAvatarUpload" :data="item">
                            <template #trigger>
                                <img v-if="imageUrl[index]" :src="imageUrl[index]" class="swiper" />
                                <img src="@/assets/马赛克.png" class="swiper" alt="" v-else>
                            </template>
                        </el-upload>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="其他设置" name="fourth">
                    <div class="other-set">
                        <div class="department-set">
                            <span>部门设置</span>

                            <el-tag v-for="tag in dynamicTags" :key="tag" closable :disable-transitions="false"
                                @close="handleClose(tag)">
                                {{ tag }}
                            </el-tag>
                            <el-input v-if="inputVisible" ref="InputRef" v-model="inputValue" class="w-20" size="small"
                                @keyup.enter="handleInputConfirm" @blur="handleInputConfirm" />
                            <el-button v-else class="button-new-tag" size="small" @click="showInput">
                                + New Tag
                            </el-button>

                        </div>
                        <div class="product-set">
                            <span>产品设置</span>
                            <el-tag v-for="tag in PdynamicTags" :key="tag" closable :disable-transitions="false"
                                @close="handleProductClose(tag)">
                                {{ tag }}
                            </el-tag>
                            <el-input v-if="PinputVisible" ref="PInputRef" v-model="PinputValue" class="w-20"
                                size="small" @keyup.enter="handleInputConfirmProduct" @blur="handleInputConfirmProduct" />
                            <el-button v-else class="button-new-tag" size="small" @click="showInputProduct">
                                + New Tag
                            </el-button>

                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
    <change_password ref="change_Password"></change_password>
    <edior ref="ediorP"></edior>
</template>

<style lang="scss" scoped>
.common-wrapped {
    padding: 8px;
    background: #f5f5f5;
    //前去了头部还有面包屑+2*8
    height: calc(100vh - 101px);

    .common-content {
        padding: 0 10px;
        height: 100%;
        background: #fff;

        .account-infor-warpped {
            display: flex;
            align-items: center;
            padding-left: 50px;
            margin-bottom: 24px;
            font-size: 14px;

            .account-infor-content {
                margin-left: 24px;
                margin-right: 16px;
            }
        }

        //首页管理外壳
        .home-wrapped {
            padding-left: 5opx;
            display: flex;
            flex-direction: column;

            .tips {
                display: flex;
                align-items: center;
                margin-bottom: 8px;

                span {
                    font-size: 14px;
                    color: silver;
                    margin-left: 20px;
                }
            }
        }

    }
}
// 其他设置
.other-set{
    padding-left: 50px;
    font-size: 14px;
    .department-set{
        margin-bottom: 24px;
        span {
            margin-right: 24px;
        }
    }
        .product-set {
            margin-bottom: 24px;
    
            span {
                margin-right: 24px;
            }
        }
}
.demo-tabs>.el-tabs__content {
    padding: 32px;
    color: #6b778c;
    font-size: 32px;
    font-weight: 600;
}

.avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
}

:deep(.swiper) {
    width: 336px;
    height: 96px;

}

// 轮播图名称
:deep(.swiper-name) {
    font-size: 14px;
    margin-bottom: 24px;

}

:deep(.swiper-wrapped) {
    display: flex;
    margin-bottom: 16px;
    margin-left: 20px;
}
:deep(.w-20){
    width: 150px;
}
// 轮播图</style>

<style>
.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}

.el-input__wrapper {
    width: 240px;
}

.el-button--primary {
    margin-left: 16px;
}
</style>