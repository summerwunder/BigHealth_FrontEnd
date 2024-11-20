<!--
 * @Author: wangmr mingrui@whut.edu.cn
 * @Date: 2024-11-19 21:28:13
 * @LastEditors: wangmr mingrui@whut.edu.cn
 * @LastEditTime: 2024-11-20 22:36:43
 * @FilePath: /BigHealth/BigHealthMarket_FrontEnd/src/views/user/list.vue
 * @Description:用户列表界面
 * 2405499352@qq.com
-->
<template>
  <div class="user-list">
    <!-- 搜索表单 -->
    <el-form :model="searchForm" inline class="search-form">
      <el-form-item label="用户名">
        <el-input v-model="searchForm.username" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="searchForm.gender" placeholder="请选择">
          <el-option label="男" value="男"></el-option>
          <el-option label="女" value="女"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="searchForm.phone" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearch">查询</el-button>
        <el-button @click="handleReset">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 新增用户按钮 -->
    <el-button type="primary" @click="handleAddUser" class="add-user">
      +新增用户
    </el-button>

    <!-- 用户表格 -->
    <el-table :data="users" border style="width: 100%">
      <el-table-column prop="id" label="序号" width="60"></el-table-column>
      <el-table-column prop="nickname" label="昵称"></el-table-column>
      <el-table-column prop="realName" label="真实姓名"></el-table-column>
      <el-table-column prop="gender" label="性别"></el-table-column>
      <el-table-column prop="birthday" label="生日">
        <template #default="{ row }">
          <span>{{ formatDate(row.birthday) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="points" label="积分"></el-table-column>
      <el-table-column prop="isMember" label="会员">
        <template #default="{ row }">
          <span>{{ row.isMember ? '是' : '否' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="isRecommender" label="是否推荐官">
        <template #default="{ row }">
          <span>{{ row.isRecommender ? '是' : '否' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="地址信息"></el-table-column>
      <el-table-column prop="updateTime" label="更新时间">
        <template #default="{ row }">
          <span>{{ formatDate(row.updateTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="150">
        <template #default="{ row }">
          <el-button type="text" @click="handleEdit(row)">编辑</el-button>
          <el-button type="text" @click="handleDetails(row)">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页器 -->
    <el-pagination
      background
      layout="prev, pager, next, sizes, total"
      :current-page="pagination.currentPage"
      :page-size="pagination.pageSize"
      :total="pagination.total"
      @current-change="fetchUsers"
      @size-change="handleSizeChange"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import request from "@/utils/request";
import {getUserList} from "@/api/user"
import {formatDate} from '@/utils/convert'
// 搜索表单
const searchForm = ref({
  username: "",
  gender: "",
  phone: "",
});

// 用户数据
const users = ref([]);

// 分页数据
const pagination = ref({
  total: 0,
  currentPage: 1,
  pageSize: 10,
});


// 获取用户列表数据
const fetchUsers = async (page = 1) => {
  pagination.value.currentPage = page;
  const params = {
    page: pagination.value.currentPage,
    size: pagination.value.pageSize,
   //...searchForm.value, // 传递搜索参数
  };
  getUserList(params).then(
    res =>{
        const result = res.data.data;
        users.value = result.records;
        pagination.value.total = result.total;
    }
  )

};

// 查询按钮点击
const handleSearch = () => {
  fetchUsers(1); // 查询时重置到第一页
};

// 重置按钮点击
const handleReset = () => {
  searchForm.value = { username: "", gender: "", phone: "" };
  fetchUsers(1); // 重置后重新查询
};

// 每页记录数改变
const handleSizeChange = (size) => {
  pagination.value.pageSize = size;
  fetchUsers(1); // 页大小改变时从第一页开始加载
};

// 新增用户
const handleAddUser = () => {
  console.log("新增用户");
  // 打开新增用户对话框（
};

// 编辑用户
const handleEdit = (row) => {
  console.log("编辑用户：", row);
  // 打开编辑用户对话框
};

// 查看用户详情
const handleDetails = (row) => {
  console.log("查看详情：", row);
  // 跳转或显示详情页面
};

// 页面加载时获取数据
fetchUsers();
</script>

<style scoped>
.user-list {
  padding: 20px;
}

.search-form {
  margin-bottom: 20px;
}

.add-user {
  margin-bottom: 20px;
}

.el-table .el-button {
  margin: 0 5px;
}
</style>