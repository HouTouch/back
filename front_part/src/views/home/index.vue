<script setup lang="ts">
import { ref } from 'vue'
import breadCrumbC from '@/components/bread_crumb.vue'
import { getAllSwipers, getAllComponyIntroduce } from '@/api/setting';
import { bus } from '@/utils/mitt';
import introduce from './components/introduce.vue';

const item = ref({
    first: '首页'
})
const tableData = [

]
const imageUrl = ref([])
const getAllSwipersData = async () => {
    const res = await getAllSwipers()
    imageUrl.value = res.data
}
getAllSwipersData()

// 公司介绍
const companyIntroduce  = ref([])
const getAllComponyIntroduceFnc = async () => {
    const res = await getAllComponyIntroduce()
    const [name,...intro] = res.data
    companyIntroduce.value =intro
}
getAllComponyIntroduceFnc()
const introF = ref()
const openIntroduce = (id:number) => {
    bus.emit('introduce', id)
    introF.value.open()
}
</script>
<template>
    <breadCrumbC :item='item'></breadCrumbC>
    <div class="home_wrapped">
        <!-- 轮播图外壳 -->
        <div class="swiper-wrapped">
            <el-carousel :interval="4000" type="card" height="320px" indicator-position="outside">
                <el-carousel-item v-for="(item,index) in imageUrl" :key="index">
                    <img :src="item" alt="" class="swiper-img">
                </el-carousel-item>
            </el-carousel>
        </div>
        <!-- 栅格布局外壳  -->
        <div class="layout-wrapped">
            <el-row :gutter="20">
                <el-col :span="6" v-for="(item,index) in companyIntroduce" :key="index" @click="openIntroduce(index+1)">
                    <div class="company-message-area">
                        <span>{{ item.set_name }}</span>
                        <div v-html="item.set_text" class="company-introduce"></div>
                    </div>
                </el-col>
            </el-row>
        </div>
        <!-- 表格布局外壳 -->
        <div class="two-table-wrapped">
            <!-- 公司公告 -->

            <div class="company-notice">
                <span class="title">公司公告</span>
                <el-table :data="tableData" style="width: 100%" :show-header="false">
                    <el-table-column prop="date" label="Date" width="180" />
                    <el-table-column prop="name" label="Name" width="180" />
                    <el-table-column prop="address" label="Address" />
                </el-table>
            </div>
            <!-- 系统消息 -->

            <div class="system-message">
                <span class="title">系统消息</span>
                <el-table :data="tableData" style="width: 100%" :show-header="false">
                    <el-table-column prop="date" label="Date" width="180" />
                    <el-table-column prop="name" label="Name" width="180" />
                    <el-table-column prop="address" label="Address" />
                </el-table>
            </div>
        </div>
    </div>
    <introduce ref="introF"></introduce>
</template>

<style lang="scss" scoped>
@mixin table-class {
    height: 23vh;
    width: 48%;
    display: flex;
    flex-direction: column;
}

//首页外壳
.home_wrapped {
    padding: 8px;
    height: calc(100vh - 101px);
    background: #f5f5f5;
    display: flex;
    flex-direction: column;

    // 轮播图外壳
    .swiper-wrapped {
        padding: 0 20px;
        background: #fff;
        margin-bottom: 8px;
        .swiper-img{
            width: 100%;
            height: 100%;
        }
    }

    // 栅格布局外壳
    .layout-wrapped {
        padding: 8px;
        margin-bottom: 8px;
        background: #fff;

        .company-message-area {
            background: #f5f5f5;
            height: 20vh;
            padding: 8px;
            cursor: pointer;

            span {
                border-bottom: 1px solid #475669;
                font-size: 14px;
            }
            .company-introduce{
                        text-indent: 24px;
                            font-size: 14px;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            -webkit-line-clamp: 3;
                            display: -webkit-box;
                            -webkit-box-orient: vertical;
            }

        }

        .company-message-area:hover {
            background: #eef5ff;
            cursor: pointer;
        }
    }

    // 表格布局外壳
    .two-table-wrapped {
        padding-top: 2vh;
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-around;
        background: #fff;

        .title {
            font-size: 14px;
            margin-bottom: 5px;
            border-bottom: 1px solid#ea0709;
        }

        .company-notice {
            @include table-class;
        }

        .system-message {
            @include table-class;
        }
    }
}

.el-carousel__item h3 {
    color: #475669;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
    text-align: center;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}

.el-row {
    margin-bottom: 20px;
}

.el-row:last-child {
    margin-bottom: 0;
}

.el-col {
    border-radius: 4px;
}

.grid-content {
    border-radius: 4px;
    min-height: 36px;
}
</style>