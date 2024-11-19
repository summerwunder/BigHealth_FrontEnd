<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import {useRouter} from 'vue-router'
const router = useRouter()
// 定义用户名和密码绑定
const username = ref('')
const password = ref('')
const rememberMe = ref(false)

// 登录按钮点击处理函数
const handleLogin = () => {
  if (!username.value || !password.value) {
    ElMessage.error('请输入用户名和密码')
    return
  }
  ElMessage.success('登录成功')
  console.log('用户名:', username.value)
  console.log('密码:', password.value)
  console.log('自动登录:', rememberMe.value)
  router.push("/index")
  // 在这里添加您的登录逻辑
}
</script>

<template>
  <div class="login-container">
    <!-- Logo部分 -->
    <div class="logo">
      <img src="@/assets/logo.jpg" alt="Logo" />
      <h1>美年大健康</h1>
    </div>

    <!-- 登录表单 -->
    <el-card class="login-form">
      <el-form :model="{ username, password }" >
        <!-- 用户名 -->
        <el-form-item>
          <el-input v-model="username" placeholder="请输入用户名" />
        </el-form-item>

        <!-- 密码 -->
        <el-form-item >
          <el-input
            v-model="password"
            type="password"
            placeholder="请输入密码"
            show-password
          />
        </el-form-item>

        <!-- 自动登录 -->
        <el-form-item>
          <el-checkbox v-model="rememberMe">自动登录</el-checkbox>
        </el-form-item>

        <!-- 登录按钮 -->
        <el-form-item>
          <el-button
            type="primary"
            size="large"
            style="width: 100%"
            @click="handleLogin"
          >
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 底部 -->
    <footer class="login-footer">
      <a href="#">帮助</a> | <a href="#">隐私</a> | <a href="#">条款</a>
      <p>copyright © 2017 美年大健康技术部出品</p>
    </footer>
  </div>
</template>

<style scoped>
/* 整体容器样式 */
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f5f7fa;
}

/* Logo 样式 */
.logo {
  text-align: center;
  margin-bottom: 20px;
}
.logo img {
  width: 260px;
  height: auto;
}
.logo h1 {
  font-size: 28px;
  color: #444;
}

/* 表单样式 */
.login-form {
    width: 30%;
 
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

}
.login-form .el-form-item {
  margin-bottom: 22px; /* 设置每个表单项之间的间隔 */
}
/* 底部样式 */
.login-footer {
  text-align: center;
  margin-top: 20px;
  font-size: 12px;
  color: #aaa;
}

.login-footer a {
  color: #007bff;
  text-decoration: none;
}


</style>
