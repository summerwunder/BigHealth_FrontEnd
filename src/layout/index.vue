<!--
 * @Author: wangmr mingrui@whut.edu.cn
 * @Date: 2024-11-19 21:01:15
 * @LastEditors: wangmr mingrui@whut.edu.cn
 * @LastEditTime: 2024-11-19 21:23:58
 * @FilePath: /BigHealth/BigHealthMarket_FrontEnd/src/layout/index.vue
 * @Description: 
 * 2405499352@qq.com
-->
<template>
    <div class="common-layout">
      <el-container>
        <el-header>Header</el-header>
        <el-container>
          <el-aside class="aside"  :style="{ height: height + 'px',minHeight: minHeight + 'px' }">
            <Aside/>
          </el-aside>
          <el-main>Main</el-main>
        </el-container>
      </el-container>
    </div>
  </template>

<script setup>
    import Aside from './Aside/index.vue'
    //import Header from './Header/index.vue'
    //import Main from './Main/index.vue'

    import { ref,onMounted } from 'vue';
    const height = ref(0)
    const minHeight = ref(0)

    onMounted(() => {
        getHeight();
        // 监听页面缩放事件
        minHeight.value = document.documentElement.scrollHeight;;
        window.addEventListener('resize',getHeight)
        window.addEventListener('scroll', getHeight);
        //获取全部设备信息
        
        //此处获取所有传感器数据
        
        //填充传感器报警数据信息
        
    })
    // 获取文档高度
    function getHeight() {
        height.value = document.documentElement.scrollHeight;;
    }
</script>

<style scoped>

.aside {
    background-color: #545c64;
    width: 18%;
}
.el-main{
  padding:0
}
</style>