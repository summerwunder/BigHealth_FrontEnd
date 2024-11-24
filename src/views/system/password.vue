<!--
 * @Author: wangmr mingrui@whut.edu.cn
 * @Date: 2024-11-23 19:58:04
 * @LastEditors: wangmr mingrui@whut.edu.cn
 * @LastEditTime: 2024-11-23 20:03:07
 * @FilePath: /BigHealth/BigHealthMarket_FrontEnd/src/views/setting/UserInfo.vue
 * @Description:修改密码界面
 * 2405499352@qq.com
-->

<template>
  <div class="password-change-container">
    <el-card shadow="hover">
      <h2 class="title">修改密码</h2>
      <el-form :model="form" :rules="rules" ref="formRef" label-width="120px">
        <el-form-item label="账户：" prop="username">
          <span class="user-display">admin</span>
        </el-form-item>
        <el-form-item label="输入原密码：" prop="oldPassword">
          <el-input
            type="password"
            v-model="form.oldPassword"
            placeholder="请输入原密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="输入新密码：" prop="newPassword">
          <el-input
            type="password"
            v-model="form.newPassword"
            placeholder="请输入新密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认新密码：" prop="confirmPassword">
          <el-input
            type="password"
            v-model="form.confirmPassword"
            placeholder="请确认新密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <div class="form-actions">
            <el-button @click="resetForm">取消</el-button>
            <el-button type="primary" @click="submitForm">提交</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { ElMessage } from "element-plus";

const form = reactive({
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
});

const rules = {
  oldPassword: [{ required: true, message: "请输入原密码", trigger: "blur" }],
  newPassword: [
    { required: true, message: "请输入新密码", trigger: "blur" },
    { min: 6, message: "密码至少6位", trigger: "blur" },
  ],
  confirmPassword: [
    { required: true, message: "请确认新密码", trigger: "blur" },
    {
      validator: (rule, value, callback) => {
        if (value !== form.newPassword) {
          callback(new Error("两次输入密码不一致"));
        } else {
          callback();
        }
      },
      trigger: "blur",
    },
  ],
};

const formRef = ref(null);

const submitForm = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      ElMessage.success("密码修改成功");
      resetForm()
    } else {
      ElMessage.error("请检查输入项");
    }
  });
};

const resetForm = () => {
  Object.assign(form, {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
};
</script>

<style scoped>
.password-change-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #f5f7fa;
  padding: 20px;
}

.el-card {
  width: 400px;
  padding: 20px;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.title {
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
}

.user-display {
  font-weight: bold;
  color: #666;
  font-size: 14px;
}

.el-form-item {
  margin-bottom: 20px;
}

.el-input {
  width: 100%;
}

.form-actions {
  display: flex;
  justify-content: space-between;
}

.el-button {
  border-radius: 4px;
}
</style>
