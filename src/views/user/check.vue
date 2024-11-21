<!--
 * @Author: wangmr mingrui@whut.edu.cn
 * @Date: 2024-11-19 21:28:13
 * @LastEditors: wangmr mingrui@whut.edu.cn
 * @LastEditTime: 2024-11-21 16:32:42
 * @FilePath: /BigHealth/BigHealthMarket_FrontEnd/src/views/user/check.vue
 * @Description:体检人管理
 * 2405499352@qq.com
-->
<template>
  <div class="user-list">
    <!-- 筛选表单 -->
    <el-form :model="filters" inline class="filter-form">
      <el-form-item label="姓名">
        <el-input v-model="filters.name" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item label="性别" style="width: 200px;" >
        <el-select v-model="filters.gender" placeholder="请选择">
          <el-option label="男" value="男" />
          <el-option label="女" value="女" />
        </el-select>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="filters.phone" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="fetchUsers()">查询</el-button>
        <el-button @click="resetFilters">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 操作按钮 -->
    <div class="actions">
      <el-button type="primary" @click="addPerson">+新增体检人</el-button>
      <el-button type="primary" @click="batchImport">批量导入体检人</el-button>
      <el-button type="danger" @click="batchDelete" :disabled="!selectedRowKeys.length">批量删除</el-button>
    </div>

    <!-- 数据表格 -->
    <el-table
      :data="users"
      border
      v-loading="loading"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" />
      <el-table-column prop="id" label="序号" align="center" />
      <el-table-column prop="name" label="真实姓名" align="center"/>
      <el-table-column prop="gender" label="性别" align="center"/>
      <el-table-column prop="phone" label="手机号" align="center"/>
      <el-table-column prop="idCard" label="身份证" align="center" width="250"/>
      <el-table-column prop="checkCount" label="体检次数" align="center"/>
      <el-table-column label="操作" fixed="right" width="230" align="center">
        <template #default="{ row }">
          <el-button type="primary" size="small" @click="editPerson(row)">编辑</el-button>
          <el-button type="danger" size="small" @click="deletePerson(row)">删除</el-button>
          <el-button type="info" size="small" @click="viewDetails(row)">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>

        <!-- 新增体检人 Dialog -->
    <el-dialog v-model="addDialogVisible" title="新增体检人"  width="40%">
      <el-form ref="addForm" :model="addForm" :rules="rules" label-width="100px">
        <el-form-item label="姓名：" prop="name">
          <el-input v-model="addForm.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="性别：" prop="gender">
          <el-select v-model="addForm.gender" placeholder="请选择性别">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机号：" prop="phone">
          <el-input v-model="addForm.phone" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="身份证号：" prop="idCard">
          <el-input v-model="addForm.idCard" placeholder="请输入身份证号"></el-input>
        </el-form-item>
        <el-form-item label="地址信息：" prop="address">
          <el-input v-model="addForm.address" placeholder="请输入地址信息"></el-input>
        </el-form-item>
      </el-form>

      <!-- Dialog 底部按钮 -->
      <div slot="footer">
        <el-button @click="addDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitAddForm">提交</el-button>
      </div>
    </el-dialog>
    <!-- 分页 -->
    <div class="pagination">
      <el-pagination
        background
        layout="total, sizes, prev, pager, next, jumper"
        :current-page="pagination.current"
        :page-sizes="[5, 10, 20, 50]"
        :page-size="pagination.pageSize"
        :total="pagination.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import {getCheckUserList,addCheckUser} from "@/api/checkUser"
// 获取用户列表数据
const fetchUsers = async () => {
  const params = {
    page: pagination.value.current,
    size: pagination.value.pageSize,
    ...filters.value, // 传递搜索参数
  };
  getCheckUserList(params).then(
    res =>{
        const result = res.data.data;
        users.value = result.records;
        pagination.value.total = result.total;
    }
  )

};

// 提交新增表单
const submitAddForm = () => {
  const formRef = ref(null)
  formRef.value.validate((valid) => {
    if (valid) {
      addCheckUser(addForm.value)
        .then(() => {
          ElMessage.success('新增成功')
          addDialogVisible.value = false
        })
        .catch(() => {
          ElMessage.error('新增失败')
        })
    } else {
      ElMessage.warning('请完整填写表单')
    }
  })
}
// 表单验证规则
const rules = {
  name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  //gender: [{ required: true, message: '请选择性别', trigger: 'change' }],
  phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
  idCard: [{ required: true, message: '请输入身份证号', trigger: 'blur' }],
  //address: [{ required: true, message: '请输入地址信息', trigger: 'blur' }]
}
// 筛选条件
const filters = ref({
  name: "",
  gender: "",
  phone: "",
});
const addDialogVisible = ref(false)
const addForm = ref({
  name: '',
  gender: '',
  phone: '',
  idCard: '',
  address: ''
})

// 数据列表
const users = ref([]);
const loading = ref(false);

// 分页
const pagination = ref({
  current: 1,
  pageSize: 10,
  total: 0,
});

// 选中项
const selectedRowKeys = ref([]);


// 重置筛选条件
const resetFilters = () => {
  filters.name = "";
  filters.gender = "";
  filters.phone = "";
  fetchUsers();
};

// 分页事件
const handleSizeChange = (size) => {
  pagination.value.pageSize = size;
  fetchUsers();
};
const handleCurrentChange = (current) => {
  pagination.value.current = current;
  fetchUsers();
};

// 选中事件
const handleSelectionChange = (selection) => {
  selectedRowKeys.value = selection.map((row) => row.id);
};

// 操作事件
const addPerson = () => {
  addDialogVisible.value = true;
};

const batchImport = () => {
  console.log("批量导入体检人");
};

const batchDelete = () => {
  console.log("批量删除", selectedRowKeys.value);
};

const editPerson = (row) => {
  console.log("编辑体检人", row);
};

const deletePerson = (row) => {
  console.log("删除体检人", row);
};

const viewDetails = (row) => {
  console.log("查看详情", row);
};



// 初始化
fetchUsers();
</script>

<style scoped>
.user-list {
  padding: 20px;
}
.filter-form {
  margin-bottom: 20px;
}

.actions {
  margin-bottom: 20px;
}

.pagination {
  margin-top: 20px;
  text-align: right;
}
</style>
