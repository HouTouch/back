<script setup lang="ts">
import { ref, reactive, toRefs } from 'vue'
import {
    Menu as IconMenu,
    Document,
    TakeawayBox,
    House,
    ChatSquare,
    User,
    Message,
    Tools,
} from '@element-plus/icons-vue'
import { useRouter } from 'vue-router';
const router = useRouter()

import useUserInfor from '@/store/userInfor';
const userInfor = useUserInfor();

console.log('侧边栏')
const quieLogin = () => {
    router.push('/login')
}


</script>
<template>
    <div class="common-layout">
        <el-container>
            <el-aside width="200px">
                <el-menu class="el-menu-vertical-demo" router>
                    <div class="title">通用后台管理系统</div>
                    <el-menu-item index="home">
                        <el-icon>
                            <House />
                        </el-icon>
                        <span>首页</span>
                    </el-menu-item>
                    <el-menu-item index="overview">
                        <el-icon>
                            <Document />
                        </el-icon>
                        <span>系统概览</span>
                    </el-menu-item>

                    <el-sub-menu index="3" v-if="userInfor.identity=='user' || userInfor.identity=='用户管理员'">
                        <template #title>
                            <el-icon>
                                <User />
                            </el-icon>
                            <span>用户管理</span>
                        </template>
                        <el-menu-item-group title="管理员管理">
                            <el-menu-item index="product_manage">产品管理员</el-menu-item>
                            <el-menu-item index="users_manage">用户管理员</el-menu-item>
                            <el-menu-item index="message_manage">消息管理员</el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group title="员工管理">
                            <el-menu-item index="user_list">用户列表</el-menu-item>
                        </el-menu-item-group>
                    </el-sub-menu>


                    <el-sub-menu index="4" v-if="userInfor.identity=='user' || userInfor.identity=='用户' || userInfor.identity == '产品管理员'">
                        <template #title>
                            <el-icon>
                                <TakeawayBox />
                            </el-icon>
                            <span>产品管理</span>
                        </template>
                        <el-menu-item-group title="产品管理">
                            <el-menu-item index="product_manager">产品列表</el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group title="出库管理" >
                            <el-menu-item index="product_manager_outList">出库列表</el-menu-item>
                        </el-menu-item-group>
                    </el-sub-menu>


                    <el-sub-menu index="5" v-if="userInfor.identity=='user' || userInfor.identity=='消息管理员'">
                        <template #title>
                            <el-icon>
                                <ChatSquare />
                            </el-icon>
                            <span>消息管理</span>
                        </template>
                        <el-menu-item-group title="消息管理">
                            <el-menu-item index="message_list">消息列表</el-menu-item>
                        </el-menu-item-group>
                        <!-- <el-menu-item-group title="回收站">
                            <el-menu-item index="recycle">回收站</el-menu-item>
                        </el-menu-item-group> -->
                    </el-sub-menu>
                    <el-menu-item index="file">
                        <el-icon><icon-menu /></el-icon>
                        <span>文件管理</span>
                    </el-menu-item>
                    <el-menu-item index="operation_log">
                        <el-icon><icon-menu /></el-icon>
                        <span>操作日志</span>
                    </el-menu-item>
                    <el-menu-item index="login_log">
                        <el-icon><icon-menu /></el-icon>
                        <span>登陆日志</span>
                    </el-menu-item>
                    <el-menu-item index="set">
                        <el-icon>
                            <Tools />
                        </el-icon>
                        <span>系统设置</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-container>
                <el-header>
                    <span class="header-left-content">尊敬的 {{userInfor.name}} 欢迎您登录本系统</span>
                    <div class="header-right-content">
                        <el-icon :size="20">
                            <Message />
                        </el-icon>
                        <el-avatar :size="24" :src="userInfor.imageUrl" />
                        <el-dropdown>
                            <span class="el-dropdown-link">
                                设置
                            </span>
                            <template #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item>设置账号</el-dropdown-item>
                                    <el-dropdown-item>更改头像</el-dropdown-item>
                                    <el-dropdown-item @click="quieLogin">退出登录</el-dropdown-item>
                                </el-dropdown-menu>
                            </template>
                        </el-dropdown>
                    </div>
                </el-header>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<style lang="scss" scoped>
.el-aside{
    height: 100vh;
    background-color: #2b303b;
    width: 210px;
    overflow-x: hidden;//隐藏滚动条
    
    .el-menu{
        background-color: #2b303b;
        width: 210px;
        height: 100vh;
        border-right: 0px;
    }
    .title{
        padding: 20px;
        display: flex;
        justify-content: center;
        color: #fff;
        background-color: #2b303b;
    }
    .el-menu-item{
        color:#fff
    }

} 
.el-menu-item:hover{
    background-color: #006eff;
}

.el-main {
    --el-main-padding: 0;
    background-color: #f3f4fa;
}
:deep(.el-sub-menu__title:hover){
    background-color: #006eff;
}
:deep(.el-sub-menu__title) {
    color: #fff
}
:deep(.el-menu--inline){
    background-color: #2b303b;
}
:deep(.el-header) {
        display: flex;
        height: 55px;
        background-color: #262f3e;
        color: #c1c6c8;
        align-items: center;
        justify-content: space-between;
        .header-left-content {
            font-size: 14px;
        }
        .header-right-content {
            width: 140px;
            display: flex;
            justify-content: space-around;
            align-items: center;
        }
    }
</style>