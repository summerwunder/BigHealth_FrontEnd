<template>
    <div class="sidebar-container">
        <img src="@/assets/logo.jpg" alt="logo" class="logo"/>
        <el-menu
        active-text-color="#ffd04b"
        background-color="#545c64"
        class="el-menu-vertical-demo"
        default-active="1"
        text-color="#fff"
        @open="handleOpen"
        @close="handleClose"
    >
        <!-- 用户管理 -->
        <el-sub-menu index="1">
            <template #title>
                <el-icon><User /></el-icon>
                <span>用户管理</span>
            </template>
            <el-menu-item index="1-1" @click="handleClick('user', 'user')">用户管理</el-menu-item>
            <el-menu-item index="1-2" @click="handleClick('user', 'check')">体检人管理</el-menu-item>
        </el-sub-menu>

        <!-- 商城管理 -->
        <el-sub-menu index="2">
            <template #title>
                <el-icon><ShoppingCart /></el-icon>
                <span>商城管理</span>
            </template>
            <el-menu-item index="2-1" @click="handleClick('mall', 'product')">商品管理</el-menu-item>
        </el-sub-menu>

        <!-- 订单管理 -->
        <el-sub-menu index="3">
            <template #title>
                <el-icon><Document /></el-icon>
                <span>订单管理</span>
            </template>
            <el-menu-item index="3-1" @click="handleClick('order', 'list')">订单管理</el-menu-item>
            <el-menu-item index="3-2" @click="handleClick('order', 'reservation')">预约管理</el-menu-item>
        </el-sub-menu>

        <!-- 内容管理 -->
        <el-sub-menu index="4">
            <template #title>
                <el-icon><Edit /></el-icon>
                <span>内容管理</span>
            </template>
            <el-menu-item index="4-1" @click="handleClick('content', 'banner')">banner管理</el-menu-item>
            <el-menu-item index="4-2" @click="handleClick('content', 'recommend')">首页商品推荐管理</el-menu-item>
            <el-menu-item index="4-3" @click="handleClick('content', 'search')">首页搜索词设置</el-menu-item>
            <el-menu-item index="4-4" @click="handleClick('content', 'notification')">通知管理</el-menu-item>
        </el-sub-menu>

        <!-- 系统设置 -->
        <el-sub-menu index="5">
            <template #title>
                <el-icon><Setting /></el-icon>
                <span>系统设置</span>
            </template>
            <el-menu-item index="5-1" @click="handleClick('system', 'faq')">常见问题</el-menu-item>
            <el-menu-item index="5-2" @click="handleClick('system', 'about')">关于我们</el-menu-item>
            <el-menu-item index="5-3" @click="handleClick('system', 'password')">修改密码</el-menu-item>
        </el-sub-menu>
        </el-menu>
    </div>
    
</template>

<script lang="ts" setup>
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

const router = useRouter()

// 展开指定的子菜单
const handleOpen = (key: string, keyPath: string[]) => {
  console.log('打开菜单:', key, keyPath)
}

// 关闭指定的子菜单
const handleClose = (key: string, keyPath: string[]) => {
  console.log('关闭菜单:', key, keyPath)
}

/**
 * @description:  点击菜单项处理函数;此处实现主界面的动态路由和路由跳转
 * @param {*} fpath 一级路径
 * @param {*} spath 二级路径
 * @return {*}
 */  
const handleClick = (fpath: string, spath: string) => {
  console.log(fpath, spath)
  if (!fpath) {
    router.push('/index')
    return
  }

  router.push(`/index/${fpath}/${spath}`)
}
</script>
<style scoped>
.sidebar-container {
  width: 100%;

}

.el-sub-menu__title {
  display: flex;
  justify-content: center; /* 图标和文字水平居中 */
  align-items: center; /* 图标和文字垂直居中 */
}

.el-sub-menu__title span {
  margin-left: 30px; /* 图标和文字之间的间距 */
  font-size: 16px;
}

.logo {
    display: block; 
  width: 100%; /* 宽度与容器一致 */
  height: auto; /* 保持图片比例 */
  margin-bottom: 10px; 
}
.el-menu-vertical-demo {
  width: 100%;
  display: flex;
  flex-direction: column;
 
}
</style>