<script setup lang="ts">
import breadCrumbC from '@/components/bread_crumb.vue'
import { ref, reactive } from 'vue'
const item = ref({
    first: '系统概览'
})

</script>

<template>
    <breadCrumbC ref="breadCrumb" :item="item"></breadCrumbC>
    <!-- 外壳 -->
    <div class="overview-wrapped">
        <!-- 顶部外壳 -->
        <div class="top-content-wrapped">
            
        </div>
        <!-- 中间外壳 -->
        <div class="mid-content-wrapped"></div>
        <!-- 底部外壳 -->
        <div class="footer-content-wrapped"></div>
    </div>
</template>

<style lang="scss" scoped>

	// 总览内容
	.overview-wrapped {
		padding: 8px;
		height: calc(100vh - 85px);
		background: #f8f8f8;

		// 上部分内容 个人资料 + 饼状图
		.top-content-wrapped {
			height: 30%;
			display: flex;

			// 个人信息
			.person-infor {
				height: 100%;
				margin-right: 8px;
				width: calc(50% - 8px);
				display: flex;
				background: #fff;

				// 头像区域
				.person-avatar-wrapped {
					display: flex;
					width: 50%;
					height: 100%;
					justify-content: center;
					align-items: center;
					flex-direction: column;

					// 公司
					.company {
						margin: 10px 0px;
						font-size: 12px;
					}

					// 职务
					.level {
						margin-top: 8px;
						font-size: 12px;
					}

				}

				// 分割线
				.line-wrapped {
					height: 100%;
					display: flex;
					align-items: center;

					.line {
						height: 170px;
						border: 1px solid #D3D3D3;
					}
				}

				// 详细信息区域
				.detail-infor-wrapped {
					height: 100%;
					width: calc(50% - 1px);
					margin-left: 50px;
					font-size: 12px;
					display: flex;
					flex-direction: column;
					align-items: flex-start;
					justify-content: center;
				}
			}

			// 饼状图
			.pie {
				width: calc(50%);
				height: 100%;
				background: #fff;
			}
		}

		// 中间部分内容 消息阅读量图 产品类别图
		.mid-content-wrapped {
			margin-top: 8px;
			height: calc(32% - 8px);
			display: flex;

			// 中间左部分
			.mid-content-left {
				margin-right: 8px;
				width: calc(60% - 8px);
				background: #fff;
			}

			// 中间右部分
			.mid-content-right {
				width: calc(40%);
				background: #fff;
				padding: 8px;

				// 标题
				.title {
					font-size: 14px;
					margin-bottom: 8px;
				}

				// 按钮区域
				.button-area {
					margin-bottom: 8px;
					height: 100px;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					cursor: pointer;
					background: #F5F5F5;

					// 按钮名字
					.buttom-name {
						margin-top: 10px;
					}
				}

				// 按钮变色
				.button-area:hover {
					background: #e4efff;
				}
			}
		}

		// 底部内容
		.footer-content-wrapped {
			margin-top: 8px;
			height: calc(38% - 8px);
			display: flex;

			// 底部左部分
			.footer-content-left {
				margin-right: 8px;
				height:100%;
				width: calc(30% - 8px);
				background: #fff;
			}

			// 底部右部分
			.footer-content-right {
				height:100%;
				width: calc(70%);
				background: #fff;
			}
		}
	}

</style>