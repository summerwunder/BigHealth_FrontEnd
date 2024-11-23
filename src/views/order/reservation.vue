<!--
 * @Author: wangmr mingrui@whut.edu.cn
 * @Date: 2024-11-22 10:56:39
 * @LastEditors: wangmr mingrui@whut.edu.cn
 * @LastEditTime: 2024-11-23 19:07:33
 * @FilePath: /BigHealth/BigHealthMarket_FrontEnd/src/views/order/reservation.vue
 * @Description: 
 * 2405499352@qq.com
-->
<template>
  <div class="reservation-management">
    <!-- 筛选条件 -->
    <el-form :model="filters" inline class="filter-form">
      <el-form-item label="姓名">
        <el-input v-model="filters.name" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item label="性别">
        <el-select
          v-model="filters.gender"
          placeholder="请选择"
          style="width: 100px"
        >
          <el-option label="男" value="男"></el-option>
          <el-option label="女" value="女"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="filters.phone" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item label="预约日期">
        <el-date-picker
          v-model="filters.date"
          type="date"
          placeholder="请选择日期"
          style="width: 200px"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="fetchReservations">查询</el-button>
        <el-button @click="resetFilters">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 按钮功能 -->
    <div class="actions">
      <el-button type="primary" @click="exportReservations">批量导出</el-button>
      <el-button type="primary" @click="openDialog('add')"
        >新增体检记录</el-button
      >
    </div>

    <!-- 预约记录表格 -->
    <el-table
      :data="reservations"
      border
      v-loading="loading"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" />
      <el-table-column prop="id" label="序号" align="center" width="80" />
      <el-table-column
        prop="name"
        label="真实姓名"
        align="center"
        width="100"
      />
      <el-table-column prop="gender" label="性别" align="center" width="80" />
      <el-table-column prop="phone" label="手机号" align="center" />
      <el-table-column prop="idCard" label="身份证" align="center" />
      <el-table-column prop="productName" label="预约商品" align="center" />
      <el-table-column
        prop="appointmentTime"
        label="预约体检时间"
        align="center"
      >
        <template #default="{ row }">
          <span>{{ formatDateTime(row.appointmentTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="是否到店" align="center">
        <template #default="{ row }">
          <el-tag
            v-if="row.status != '确认到店'"
            :type="getStatusType(row.status)"
            >{{ row.status }}</el-tag
          >
          <el-button
            v-if="row.status === '确认到店'"
            size="small"
            type="primary"
            @click="confirmArrival(row)"
          >
            确认到店
          </el-button>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="申请时间" align="center">
        <template #default="{ row }">
          <span>{{ formatDateTime(row.createTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="150" align="center">
        <template #default="{ row }">
            <!--
        <el-button type="text" @click="openDialog('edit', row)"
            >编辑</el-button
          >
          -->
          <el-button type="text" style="color:red" @click="deleteRecord(row)"
            >删除</el-button
          >
          <el-button
            type="text"
            style="color: chocolate"
            @click="viewDetails(row)"
            >查看详情</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="预约详情" v-model="detailsDialogVisible" width="50%">
      <el-descriptions border column="2">
        <el-descriptions-item label="体检人姓名">
          {{ detailsData.name }}
        </el-descriptions-item>
        <el-descriptions-item label="体检人手机号">
          {{ detailsData.phone }}
        </el-descriptions-item>
        <el-descriptions-item label="身份证号">
          {{ detailsData.idCard }}
        </el-descriptions-item>
        <el-descriptions-item label="预约时间">
          {{ formatDateTime(detailsData.appointmentTime) }}
        </el-descriptions-item>
        <el-descriptions-item label="预约商品">
          {{ detailsData.productName }}
        </el-descriptions-item>
        <el-descriptions-item label="预约门店">
          {{ detailsData.store }}
        </el-descriptions-item>
        <el-descriptions-item label="申请时间">
          {{ formatDateTime(detailsData.createTime) }}
        </el-descriptions-item>
        <el-descriptions-item label="是否到店">
          {{ detailsData.status }}
        </el-descriptions-item>
      </el-descriptions>
      <span slot="footer">
        <el-button
          @click="detailsDialogVisible = false"
          style="margin-top: 20px"
          >返回</el-button
        >
      </span>
    </el-dialog>
    <!-- 分页器 -->
    <el-pagination
      background
      layout="prev, pager, next, sizes, total"
      :current-page="pagination.currentPage"
      :page-size="pagination.pageSize"
      :total="pagination.total"
      style="margin-top: 20px"
      @current-change="handlePageChange"
      @size-change="handleSizeChange"
    />

    <!-- 新建/编辑预约 Dialog -->
    <el-dialog :title="dialogTitle" v-model="dialogVisible" width="50%">
      <el-form
        :model="dialogForm"
        ref="dialogFormRef"
        :rules="dialogRules"
        label-width="120px"
      >
        <el-form-item label="体检人姓名" prop="name">
          <el-input v-model="dialogForm.name" placeholder="请输入体检人姓名" />
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="dialogForm.phone" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item label="身份证号" prop="idCard">
          <el-input v-model="dialogForm.idCard" placeholder="请输入身份证号" />
        </el-form-item>
        <el-form-item label="预约时间" prop="appointmentTime">
          <el-date-picker
            v-model="dialogForm.appointmentTime"
            type="datetime"
            placeholder="请选择预约时间"
            style="width: 100%"
          />
        </el-form-item>
        <el-form-item v-if="dialogTitle=='编辑预约' " label="预约商品" prop="productId">
          <el-select
            v-model="dialogForm.productId"
            placeholder="请选择预约商品"
          >
            <el-option
              v-for="product in productList"
              :key="product.id"
              :label="product.name"
              :value="product.id"
            />
          </el-select>
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitForm">提交</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import {
  fetchReservationList,
  confirmArr,
  addReservation,
  updateReservation,
  deleteReservation
} from "@/api/reservation";
import { ElMessage ,ElMessageBox} from "element-plus";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { formatDateTime } from "@/utils/convert";
import { getUnusedProducts } from "@/api/order";
const detailsDialogVisible = ref(false);
const detailsData = ref({});
// 筛选条件
const filters = reactive({
  name: "",
  gender: "",
  phone: "",
  date: "",
});

// 预约记录数据
const reservations = ref([]);
const loading = ref(false);

// 分页数据
const pagination = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 0,
});

const dialogVisible = ref(false);
const dialogForm = reactive({
  id: null,
  name: "",
  phone: "",
  idCard: "",
  appointmentTime: "",
  productId: null,
});
const dialogRules = {
  name: [{ required: true, message: "请输入体检人姓名", trigger: "blur" }],
  phone: [{ required: true, message: "请输入手机号", trigger: "blur" }],
  idCard: [{ required: true, message: "请输入身份证号", trigger: "blur" }],
  appointmentTime: [
    { required: true, message: "请选择预约时间", trigger: "change" },
  ],
  productId: [{ required: true, message: "请选择预约商品", trigger: "change" }],
};
const dialogTitle = ref("");

// 商品列表(需要通过后端数据获取)
const productList = ref([
 
]);

const fetchUnusedProducts = async (userId) => {
  try {
    const response = await getUnusedProducts(userId);
    productList.value = response.data.data.map((item) => ({
      id: item.id,
      name: item.name,
    }));
  } catch (error) {
    ElMessage.error("获取未使用商品失败");
  }
};
// 打开对话框
const openDialog = (type, row = null) => {
  if (type === "add") {
    dialogTitle.value = "新增预约";
    Object.assign(dialogForm, {
      id: null,
      name: "",
      phone: "",
      idCard: "",
      appointmentTime: "",
      productId: "未选择",
    });
  } else if (type === "edit" && row) {
    dialogTitle.value = "编辑预约";
    Object.assign(dialogForm, {
      id: row.id,
      name: row.name,
      phone: row.phone,
      idCard: row.idCard,
      appointmentTime: row.appointmentTime,
      productId: row.productId,
    });
    fetchUnusedProducts(row.id)
  }
  dialogVisible.value = true;
};

const deleteRecord = async (row) => {
  try {
    await ElMessageBox.confirm(
      `确定要删除预约记录: ${row.name} 的预约吗？`,
      "提示",
      {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      }
    );
    await deleteReservation(row.id);
    ElMessage.success("删除成功");

    fetchReservations();
  } catch (error) {
    if (error !== "cancel") {
      ElMessage.error("删除失败，请重试");
    }
  }
};

const formRef = ref(null);
// 提交表单
const submitForm = async () => {
    if(formRef.value==null){
        ElMessage.error("操作失败：有未填写的字段");
        return ;
    }
  formRef.value.validate(async (valid) => {
    if (valid) {
      try {
        if (dialogForm.id) {
          await updateReservation(dialogForm);
          ElMessage.success("预约信息更新成功");
        } else {
          await addReservation(dialogForm);
          ElMessage.success("新增预约成功");
        }
        dialogVisible.value = false;
        fetchReservations();
      } catch (error) {
        ElMessage.error("操作失败：" + error.message);
      }
    }
  });
};
// 获取预约记录数据
const fetchReservations = async () => {
  loading.value = true;
  try {
    const params = {
      page: pagination.currentPage,
      size: pagination.pageSize,
      ...filters,
    };
    const response = await fetchReservationList(params);
    reservations.value = response.data.data.list;
    pagination.total = response.data.data.total;
  } catch (error) {
    ElMessage.error("获取预约记录失败");
  } finally {
    loading.value = false;
  }
};

// 重置筛选条件
const resetFilters = () => {
  Object.assign(filters, {
    name: "",
    gender: "",
    phone: "",
    date: "",
  });
  fetchReservations();
};

// 导出预约记录
const exportReservations = async () => {
  if (reservations.value.length === 0) {
    ElMessage.warning("没有数据可导出");
    return;
  }

  // 格式化导出数据
  const exportData = reservations.value.map((record, index) => ({
    序号: index + 1,
    姓名: record.name,
    手机号: record.phone,
    身份证号: record.idCard,
    预约时间: formatDateTime(record.appointmentTime),
    商品名称: record.productName,
    预约状态: record.status,
    申请时间: formatDateTime(record.createTime),
  }));

  // 创建 Excel 表格
  const worksheet = XLSX.utils.json_to_sheet(exportData); // 转换为工作表
  const workbook = XLSX.utils.book_new(); // 创建新工作簿
  XLSX.utils.book_append_sheet(workbook, worksheet, "预约记录数据"); // 将工作表添加到工作簿

  // 生成 Excel 文件 Blob
  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });
  const blob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  // 下载 Excel 文件
  saveAs(blob, `预约记录_${new Date().toISOString().slice(0, 10)}.xlsx`);

  ElMessage.success("预约记录数据已成功导出");
};

// 确认到店
const confirmArrival = async (row) => {
  if (!row || !row.id) {
    ElMessage.warning("预约记录 ID 无效");
    return;
  }
  try {
    await confirmArr(row.id);
    ElMessage.success(`已确认 ${row.name} 到店`);
    fetchReservations();
  } catch (err) {
    ElMessage.error(`确认 ${row.name} 到店失败,${err.message}`);
  }
};

// 查看预约详情
const viewDetails = (row) => {
  detailsData.value = {
    name: row.name,
    phone: row.phone,
    idCard: row.idCard,
    appointmentTime: row.appointmentTime,
    productName: row.productName,
    store: "美年武昌分院",
    createTime: row.createTime,
    status: row.status,
  };

  detailsDialogVisible.value = true; // 打开弹窗
};

// 分页事件
const handlePageChange = (page) => {
  pagination.currentPage = page;
  fetchReservations();
};

const handleSizeChange = (size) => {
  pagination.pageSize = size;
  fetchReservations();
};

// 预约状态颜色映射
const getStatusType = (status) => {
  switch (status) {
    case "已到店":
      return "success";
    case "未到店":
      return "warning";
    case "确认到店":
      return "info";
    default:
      return "default";
  }
};

// 初始化
fetchReservations();
</script>

<style scoped>
.reservation-management {
  padding: 20px;
}

.filter-form {
  margin-bottom: 20px;
}

.actions {
  margin-bottom: 20px;
}

.el-table .el-button {
  margin: 0 5px;
}
</style>
