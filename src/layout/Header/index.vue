<!--
 * @Author: wangmr mingrui@whut.edu.cn
 * @Date: 2024-11-19 21:55:19
 * @LastEditors: wangmr mingrui@whut.edu.cn
 * @LastEditTime: 2024-11-20 08:48:53
 * @FilePath: /BigHealth/BigHealthMarket_FrontEnd/src/layout/Header/index.vue
 * @Description: 
 * 2405499352@qq.com
-->
<script setup>
</script>

<template>
    <!-- 右侧用户信息 -->
    <div class="user-profile">
      <img class="avatar" src="@/assets/avater.jpg" alt="avatar" />
      <span class="username">momo.zxy</span>
    </div>
</template>

<style scoped>

/* 右侧用户信息区域 */
.user-profile {
  display: flex;
  align-items: center;
  justify-content:flex-end;
  font-size: 14px;
  height:100%;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%; 
  margin-right: 10px; 
  object-fit: cover;
  border: 1px solid #ddd; /* 可选：头像边框 */
}

.username {
  font-size: 20px;
}
</style>
