<!--
 * @Author: wangmr mingrui@whut.edu.cn
 * @Date: 2024-11-19 21:28:13
 * @LastEditors: wangmr mingrui@whut.edu.cn
 * @LastEditTime: 2024-11-23 19:57:24
 * @FilePath: /BigHealth/BigHealthMarket_FrontEnd/src/views/user/user.vue
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
        <el-select v-model="searchForm.gender" placeholder="请选择" style="width: 200px;">
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
      <el-table-column prop="id" label="序号" width="60" align="center"></el-table-column>
      <el-table-column prop="nickname" label="昵称" align="center"></el-table-column>
      <el-table-column prop="realName" label="真实姓名" align="center"></el-table-column>
      <el-table-column prop="gender" label="性别" align="center" width="60"></el-table-column>
      <el-table-column prop="birthday" label="生日" align="center" width="100">
        <template #default="{ row }">
          <span>{{ formatDate(row.birthday) }}</span>
        </template>
      </el-table-column>
      <!--<el-table-column prop="points" label="积分" width="70" align="center"></el-table-column>-->
      <el-table-column prop="isMember" label="会员" align="center" width="70">
        <template #default="{ row }">
          <span>{{ row.isMember ? '是' : '否' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="isRecommender" label="是否推荐官" align="center">
        <template #default="{ row }">
          <span>{{ row.isRecommender ? '是' : '否' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="地址信息" align="center" width="200"></el-table-column>
      <el-table-column prop="updateTime" label="更新时间" align="center">
        <template #default="{ row }">
          <span>{{ formatDate(row.updateTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="240" align="center">
        <template #default="{ row }">
          <el-button type="text" @click="handleEdit(row)">编辑</el-button>
          <el-button type="text" style="color:green" @click="handleAdd(row)">新增体检人</el-button>
          <el-button type="text" @click="handleDetails(row)">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页器 -->
    <el-pagination
      background
      layout="prev,pager, next, sizes, total"
      style="margin-top: 20px"
      :current-page="pagination.currentPage"
      :page-size="pagination.pageSize"
      :total="pagination.total"
      :page-sizes = '[3,5,10,20]'
      @current-change="fetchUsers"
      @size-change="handleSizeChange"
    />

     <!-- 新增用户对话框 -->
     <el-dialog :title="dialogTitle" v-model="dialogVisible" width="40%">
      <el-form :model="form" :rules="rules" ref="formAddRef" label-width="100px">
        <!-- 用户姓名 -->
        <el-form-item label="用户昵称" prop="nickname">
          <el-input v-model="form.nickname" placeholder="请输入用户昵称" />
        </el-form-item>
        <el-form-item label="真实姓名" prop="realName">
          <el-input v-model="form.realName" placeholder="请输入真实姓名" />
        </el-form-item>

        <!-- 性别 -->
        <el-form-item label="性别" prop="gender">
          <el-select v-model="form.gender" placeholder="请选择">
            <el-option label="男" value="男" />
            <el-option label="女" value="女" />
          </el-select>
        </el-form-item>

        <!-- 手机号 -->
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="form.phone" placeholder="请输入手机号" />
        </el-form-item>

        <!-- 生日 -->
        <el-form-item label="生日" prop="birthday">
          <el-date-picker
            v-model="form.birthday"
            type="date"
            placeholder="请选择生日"
            style="width: 100%"
          />
        </el-form-item>

        <!-- 身份证号 -->
        <el-form-item label="身份证号" prop="idCard">
          <el-input v-model="form.idCard" placeholder="请输入身份证号" />
        </el-form-item>

        <!-- 地址信息 -->
        <el-form-item label="地址信息" prop="address">
          <el-input v-model="form.address" placeholder="请输入地址信息" />
        </el-form-item>

        <!-- 是否会员 -->
        <el-form-item label="是否会员" prop="isMember">
          <el-radio-group v-model="form.isMember">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>

        <!-- 是否推荐官 -->
        <el-form-item label="是否推荐官" prop="isRecommender">
          <el-radio-group v-model="form.isRecommender">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>

      <!-- 对话框操作按钮 -->
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitForm">提交</el-button>
      </template>
    </el-dialog>

    <!-- 用户详情弹窗 -->
    <el-dialog title="用户详情" v-model="infoDialogVisible" width="50%">
      <el-descriptions border column="3" title="用户信息">
        <el-descriptions-item label="昵称">{{ userData.nickname }}</el-descriptions-item>
        <el-descriptions-item label="真实姓名">{{ userData.realName }}</el-descriptions-item>
        <el-descriptions-item label="性别">{{ userData.gender }}</el-descriptions-item>
        <el-descriptions-item label="生日">{{ formatDate(userData.birthday) }}</el-descriptions-item>
        <el-descriptions-item label="手机号">{{ userData.phone }}</el-descriptions-item>
        <el-descriptions-item label="身份证号">{{ userData.idCard }}</el-descriptions-item>
        <el-descriptions-item label="地址">{{ userData.address }}</el-descriptions-item>
        <el-descriptions-item label="是否会员">
          {{ userData.isMember === 1 ? "是" : "否" }}
        </el-descriptions-item>
        <el-descriptions-item label="是否推荐官">
          {{ userData.isRecommender === 1 ? "是" : "否" }}
        </el-descriptions-item>
        <!--<el-descriptions-item label="积分">{{ userData.points }}</el-descriptions-item>-->
        <el-descriptions-item label="更新时间">{{ formatDate(userData.updateTime) }}</el-descriptions-item>
      </el-descriptions>

      <!-- 弹窗底部 -->
      <template #footer>
        <el-button @click="infoDialogVisible = false">关闭</el-button>
      </template>
    </el-dialog>

    <el-dialog v-model="addDialogVisible" title="新增体检人" width="40%">
      <el-form ref="formRef" :model="addForm" :rules="addRules" label-width="100px">
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
        <el-form-item   label="地址信息：" prop="address" >
          <el-input v-model="addForm.address" placeholder="请输入地址信息"></el-input>
        </el-form-item>
      </el-form>

      <!-- Dialog 底部按钮 -->
      <div slot="footer">
        <el-button @click="addDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitAddForm">提交</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script setup>
import { ref ,reactive} from "vue";
import {getUserList,createUser,searchUser,updateUser} from "@/api/user"
import {addCheckUser} from "@/api/checkUser"
import { ElMessage } from "element-plus";
import {formatDate} from '@/utils/convert'

// 对话框可见性
const dialogVisible = ref(false);
// 当前操作模式：编辑模式（true）或新增模式（false）
const isEdit = ref(false);

const addDialogVisible = ref(false);
// 对话框标题
const dialogTitle = ref("");
const formAddRef = ref(null);
const infoDialogVisible=ref(false);
// 查询的id号
let ids = 0;
// 表单数据
const form = reactive({
  nickname: "",
  realName:"",
  gender: "",
  phone: "",
  birthday: "",
  idCard: "",
  address: "",
  isMember: 0,
  isRecommender: 0,
});
//用户展示数据
const userData = reactive({
  id: 0,
  nickname: "",
  realName: "",
  gender: "",
  birthday: "",
  phone: "",
  idCard: "",
  address: "",
  isMember: 0,
  isRecommender: 0,
  //points: 0,
  updateTime: "",
});
// 表单验证规则
const rules = {
  nickname: [
    { required: true, message: "请输入用户姓名", trigger: "blur" },
    { min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur" },
  ],
  gender: [{ required: true, message: "请选择性别", trigger: "change" }],
  phone: [
    { required: true, message: "请输入手机号", trigger: "blur" },
    { pattern: /^1[3-9]\d{9}$/, message: "手机号格式不正确", trigger: "blur" },
  ],
  birthday: [{ required: true, message: "请选择生日", trigger: "change" }],
  /*
  idCard: [
    { required: true, message: "请输入身份证号", trigger: "blur" },
    { pattern: /^\d{17}[\d|X|x]$/, message: "身份证号格式不正确", trigger: "blur" },
  ]，
  address: [{ required: true, message: "请输入地址信息", trigger: "blur" }],
  */
};


// 表单引用
const formRef = ref(null);

// 提交表单
const submitForm = () => {
  if (isEdit.value) {
    // 编辑模式
    formRef.value.validate((valid) => {
      if (valid) {
        form.birthday = form.birthday.toISOString().split("T")[0]
        updateUser(form,ids).then(()=>{
          ElMessage.success("用户编辑成功！");
          dialogVisible.value = false; // 关闭对话框
          fetchUsers();
          resetForm();
        }).catch((error)=>{
          ElMessage.error("新增用户失败：" + error.message);
        });
      }
  });
  }else{
    formRef.value.validate((valid) => {
      if (valid) {
        form.birthday = form.birthday.toISOString().split("T")[0]
        // 发送请求保存用户
        createUser(form)
          .then((response) => {
            ElMessage.success("用户新增成功！");
            dialogVisible.value = false; // 关闭对话框
            fetchUsers();
            resetForm();
          })
          .catch((error) => {
            ElMessage.error("新增用户失败：" + error.message);
          });
      } else {
        ElMessage.error("请完成表单填写！");
      }
    });
  }
};

// 重置表单
const resetForm = () => {
  Object.assign(form, {
    nickname: "",
    realName:"",
    gender: "",
    phone: "",
    birthday: "",
    idCard: "",
    address: "",
    isMember: 0,
    isRecommender: 0,
  });
};
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
  pageSize: 5,
});


const addForm = reactive({
  name: "",
  gender: "",
  phone: "",
  idCard: "",
  address: "",
});
const addRules = {
  name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
  gender: [{ required: true, message: "请选择性别", trigger: "change" }],
  phone: [
    { required: true, message: "请输入手机号", trigger: "blur" },
    { pattern: /^1[3-9]\d{9}$/, message: "手机号格式不正确", trigger: "blur" },
  ],
  idCard: [
    { required: true, message: "请输入身份证号", trigger: "blur" },
    { pattern: /^\d{17}[\dX]$/, message: "身份证号格式不正确", trigger: "blur" },
  ],
};


// 重置表单
const resetAddForm = () => {
  Object.assign(addForm, {
    name: "",
    gender: "",
    phone: "",
    idCard: "",
    address: "",
  });
};
let  idx = 0;
const handleAdd = (row)=>{
  addDialogVisible.value = true;
  idx = row.id;
}

// 提交表单
const submitAddForm = () => {
  formRef.value.validate(async (valid) => {
    if (valid) {
      try {
        await addCheckUser(addForm,idx); // 调用 API 提交表单数据
        ElMessage.success("新增体检人成功！");
        addDialogVisible.value = false; // 关闭弹窗
        resetAddForm(); // 重置表单
      } catch (error) {
        ElMessage.error(`新增体检人失败：${error.message}`);
      }
    }
  });
};
// 获取用户列表数据
const fetchUsers = async (page = 1) => {
  pagination.value.currentPage = page;
  const params = {
    page: pagination.value.currentPage,
    size: pagination.value.pageSize,
    ...searchForm.value, // 传递搜索参数
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
  isEdit.value = false;
  dialogTitle.value = "新增用户";
  Object.keys(form).
      forEach((key) => (form[key] = key === "isMember" ||
       key === "isRecommender" ? 0 : "")); // 清空表单
  dialogVisible.value = true;
};

// 编辑用户
const handleEdit = async (row) => {
  try {
    ids = row.id;
    const response = await searchUser(row.id); // 获取用户信息
    Object.assign(form, response.data.data); // 填充表单数据
    isEdit.value = true;
    dialogTitle.value = "编辑用户信息";
    dialogVisible.value = true; // 打开对话框
  } catch (error) {
    ElMessage.error("获取用户信息失败: " + error.message);
  }
};

// 查看用户详情
const handleDetails = (row) => {
  console.log("查看详情：", row);
  searchUser(row.id).then(res =>{
    console.log(res.data.data)
    Object.assign(userData, res.data.data);
    infoDialogVisible.value = true
  })
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

.el-form-item {
  margin-bottom: 20px;
}
</style>