<!--
 * @Author: wangmr mingrui@whut.edu.cn
 * @Date: 2024-11-19 21:28:13
 * @LastEditors: wangmr mingrui@whut.edu.cn
 * @LastEditTime: 2024-11-24 10:23:03
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
      <el-form-item label="性别" style="width: 200px;">
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

    <!-- 数据表格 -->
    <el-table :data="users" border v-loading="loading" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" />
      <el-table-column prop="id" label="序号" align="center" />
      <el-table-column prop="name" label="真实姓名" align="center" />
      <el-table-column prop="gender" label="性别" align="center" />
      <el-table-column prop="phone" label="手机号" align="center" />
      <el-table-column prop="idCard" label="身份证" align="center" width="160" />
      <el-table-column prop="checkCount" label="体检次数" align="center" />
      <el-table-column label="操作" fixed="right" width="350" align="center">
        <template #default="{ row }">
          <el-button type="primary" size="small" @click="editPerson(row)">编辑</el-button>
          <el-button type="danger" size="small" @click="deletePerson(row)">删除</el-button>
          <el-button type="primary" size="small" @click="addRecord(row)">新增体检记录</el-button>
          <el-button type="info" size="small" @click="viewDetails(row)">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 新增/修改体检人 Dialog -->
    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="40%">
      <el-form ref="formRef" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="姓名：" prop="name">
          <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="性别：" prop="gender">
          <el-select v-model="form.gender" placeholder="请选择性别">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机号：" prop="phone">
          <el-input v-model="form.phone" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="身份证号：" prop="idCard">
          <el-input v-model="form.idCard" placeholder="请输入身份证号"></el-input>
        </el-form-item>
        <el-form-item v-if="dialogTitle === '新增体检人'" label="地址信息：" prop="address">
          <el-input v-model="form.address" placeholder="请输入地址信息"></el-input>
        </el-form-item>
      </el-form>

      <!-- Dialog 底部按钮 -->
      <div slot="footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitForm">提交</el-button>
      </div>
    </el-dialog>

    <!-- 分页 -->
    <div class="pagination">
      <el-pagination background layout="total, sizes, prev, pager, next, jumper" :current-page="pagination.current"
        :page-sizes="[5, 10, 20, 50]" :page-size="pagination.pageSize" :total="pagination.total"
        @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </div>

    <el-dialog title="检查人详情" v-model="detailsDialogVisible" width="60%">
      <el-descriptions border column="2">
        <el-descriptions-item label="用户姓名">{{ detailsData.name }}</el-descriptions-item>
        <el-descriptions-item label="性别">{{ detailsData.gender }}</el-descriptions-item>
        <el-descriptions-item label="手机号">{{ detailsData.phone }}</el-descriptions-item>
        <el-descriptions-item label="身份证号">{{ detailsData.idCard }}</el-descriptions-item>
        <el-descriptions-item label="地址信息">{{ detailsData.address }}</el-descriptions-item>
      </el-descriptions>

      <el-table :data="detailsData.records" border style="margin-top: 20px">
        <el-table-column prop="productName" label="检测套餐" align="center" />
        <el-table-column prop="checkItem" label="体检项目" align="center" />
        <el-table-column prop="store" label="体检门店" align="center" />
        <el-table-column prop="time" label="体检时间" align="center">
          <template #default="{ row }">
            {{ formatDateTime(row.time) }}
          </template>
        </el-table-column>
      </el-table>

      <div style="margin-top: 20px; text-align: right">
        总计次数: {{ totalCount }}
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="detailsDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="detailsDialogVisible = false">确定</el-button>
      </span>
    </el-dialog>
    <el-dialog v-model="addDialogVisible" title="新增预约记录" width="30%">
      <el-form>
        <el-form-item label="选择商品">
          <el-select v-model="selectedProduct" placeholder="请选择商品" style="width: 100%">
            <el-option v-for="product in availableProducts" :key="product.id" :label="product.name" :value="product.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="预约时间">
          <el-date-picker v-model="appointmentTime" type="datetime" placeholder="请选择预约时间" style="width: 100%" />
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="addDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitRecord">确认</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { formatDateTime } from "@/utils/convert";
import {
  getCheckUserList,
  addCheckUser, 
  updateCheckUser, 
  deleteCheckUser, 
  searchCheckUser, 
  fetchDetailsById, 
  getUserIdByCheckUser
} from "@/api/checkUser";
import { ElMessage, ElMessageBox } from "element-plus";
import { getUnusedProducts } from "@/api/order";
import { createRecord } from "@/api/reservation"
// 表单相关
const dialogVisible = ref(false);
const dialogTitle = ref("新增体检人");
const isEdit = ref(false);
const detailsDialogVisible = ref(false);
const detailsData = ref({});
const totalCount = ref(0);

const form = reactive({
  id: null,
  name: "",
  gender: "",
  phone: "",
  idCard: "",
  address: "",
});
const rules = {
  name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
  phone: [{ required: true, message: "请输入手机号", trigger: "blur" }],
  idCard: [{ required: true, message: "请输入身份证号", trigger: "blur" }],
};

// 数据列表
const users = ref([]);
const loading = ref(false);

const addDialogVisible = ref(false);
const availableProducts = ref([]);
const selectedProduct = ref(null);
const appointmentTime = ref(null);
const selectedCheckUserId = ref(null);
// 分页
const pagination = ref({
  current: 1,
  pageSize: 10,
  total: 0,
});

// 筛选条件
const filters = ref({
  name: "",
  gender: "",
  phone: "",
});

// 获取用户列表数据
const fetchUsers = () => {
  const params = {
    page: pagination.value.current,
    size: pagination.value.pageSize,
    ...filters.value,
  };
  getCheckUserList(params).then((res) => {
    const result = res.data.data;
    users.value = result.records;
    pagination.value.total = result.total;
  });
};

// 重置筛选条件
const resetFilters = () => {
  filters.value.name = "";
  filters.value.gender = "";
  filters.value.phone = "";
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
}


// 编辑体检人
const editPerson = (row) => {
  dialogTitle.value = "编辑体检人";
  Object.assign(form, row);
  dialogVisible.value = true;
  isEdit.value = true;
};

const addRecord = async (row) => {
  try {
    //
    const res= await getUserIdByCheckUser(row.id)
    const userId = res.data.data;
    selectedCheckUserId.value =userId
    // 请求后端获取未使用的商品列表
    const response = await getUnusedProducts(userId); // row.id 是 checkUserId
    availableProducts.value = response.data.data || [];
    if (availableProducts.value.length === 0) {
      ElMessage.warning("没有可用商品");
      return;
    }
    // 打开弹窗
    addDialogVisible.value = true;
  } catch (error) {
    ElMessage.error("获取可用商品失败");
  }
};

const submitRecord = async () => {
  if (!selectedProduct.value) {
    ElMessage.warning("请选择商品");
    return;
  }
  // 调用新增预约记录的 API
  try {
    await createRecord({
      checkUserId: selectedCheckUserId.value,
      productId: selectedProduct.value,
      appointmentTime: appointmentTime.value, // 用户选定时间
    });
    ElMessage.success("预约记录创建成功");
    addDialogVisible.value = false;
    resetAddRecordForm();
  } catch (error) {
    ElMessage.error("创建预约记录失败");
  }
};
function resetAddRecordForm(){
  selectedCheckUserId.value = null,
  selectedProduct.value = null,
  appointmentTime.value = null
}
// 提交表单
const submitForm = () => {
  if (!isEdit) {
    // 新增逻辑
    addCheckUser(form)
      .then(() => {
        ElMessage.success("新增成功");
        dialogVisible.value = false;
        fetchUsers(); // 刷新列表
      })
      .catch(() => {
        ElMessage.error("新增失败");
      });
  } else {
    // 编辑逻辑
    updateCheckUser(form, form.id)
      .then(() => {
        ElMessage.success("编辑成功");
        dialogVisible.value = false;
        fetchUsers(); // 刷新列表
      })
      .catch(() => {
        ElMessage.error("编辑失败");
      });
  }
};

// 删除体检人
const deletePerson = (row) => {
  ElMessageBox.confirm(`确定要删除体检人 "${row.name}" 吗？`, "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      deleteCheckUser(row.id)
        .then(() => {
          ElMessage.success("删除成功");
          fetchUsers(); // 刷新列表
        })
        .catch(() => {
          ElMessage.error("删除失败");
        });
    })
    .catch(() => {
      ElMessage.info("已取消删除");
    });
};

const viewDetails = async (row) => {
  try {
    const response = await fetchDetailsById(row.id); // API call to get details by ID
    const { userInfo, details, total } = response.data.data;

    detailsData.value = {
      name: userInfo.name,
      gender: userInfo.gender,
      phone: userInfo.phone,
      idCard: userInfo.idCard,
      address: userInfo.address,
      records: details,
    };
    totalCount.value = total;

    detailsDialogVisible.value = true; // Show the dialog
  } catch (error) {
    ElMessage.error("获取检查人详情失败，请重试");
  }
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
