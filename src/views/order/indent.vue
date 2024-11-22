<template>
  <div class="order-management">
    <!-- 筛选条件 -->
    <el-form :model="filters" inline class="filter-form">
      <el-form-item label="姓名">
        <el-input v-model="filters.name" placeholder="请输入姓名" />
      </el-form-item>
      <!--
      <el-form-item label="性别">
        <el-select v-model="filters.gender" placeholder="请选择" style="width: 100px;">
          <el-option label="男" value="男"></el-option>
          <el-option label="女" value="女"></el-option>
        </el-select>
      </el-form-item>
      -->
      <el-form-item label="手机号">
        <el-input v-model="filters.phone" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item label="选择日期">
        <el-date-picker v-model="filters.date" type="date" placeholder="请选择日期" style="width: 200px;" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="fetchOrders">查询</el-button>
        <el-button @click="resetFilters">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 导出订单按钮 -->
    <div class="actions">
      <el-button type="primary" @click="exportOrders">导出订单</el-button>
    </div>

    <!-- 订单列表 -->
    <el-table :data="orders" border v-loading="loading" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" />
      <el-table-column prop="id" label="序号" align="center" width="80" />
      <el-table-column prop="orderNumber" label="订单号" align="center" />
      <el-table-column prop="name" label="姓名" align="center" />
      <el-table-column prop="phone" label="手机号" align="center" />
      <el-table-column prop="address" label="地址信息" align="center" />
      <el-table-column prop="productName" label="商品名称" align="center" />
      <el-table-column prop="price" label="付款价格" align="center" />
      <el-table-column prop="status" label="状态" align="center">
        <template #default="{ row }">
          <el-tag :type="getStatusType(row.status)" disable-transitions>
            {{ row.status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="orderTime" label="下单时间" align="center">
        <template #default="{ row }">
          <span>{{ formatDateTime(row.orderTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="refund" label="退款" align="center">
        <template #default="{ row }">
          <el-button v-if="row.status === '申请退款'" size="small" type="primary" @click="approveRefund(row)">
            同意退款
          </el-button>
          <el-tag v-if="row.status === '退款成功'" size="small" type="success">
            退款成功
          </el-tag>
          <span v-else>{{ row.refund }}</span>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页器 -->
    <el-pagination background layout="prev, pager, next, sizes, total" :current-page="pagination.currentPage"
      :page-size="pagination.pageSize" :total="pagination.total" style="margin-top:20px"
      @current-change="handlePageChange" @size-change="handleSizeChange" />
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { getOrders, approveRefundRequest } from "@/api/order";
import { ElMessage } from "element-plus";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { formatDateTime } from '@/utils/convert'
const filters = reactive({
  name: "",
  gender: "",
  phone: "",
  date: "",
});

const orders = ref([]);
const loading = ref(false);

const pagination = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 0,
});

const fetchOrders = async () => {
  loading.value = true;
  try {
    const params = {
      page: pagination.currentPage,
      size: pagination.pageSize,
      ...filters,
    };
    const response = await getOrders(params);
    orders.value = response.data.data.list;
    pagination.total = response.data.data.total;
  } catch (error) {
    ElMessage.error("获取订单列表失败");
  } finally {
    loading.value = false;
  }
};

const resetFilters = () => {
  Object.assign(filters, {
    name: "",
    gender: "",
    phone: "",
    date: "",
    store: "",
  });
  fetchOrders();
};

const exportOrders = async () => {
  try {
    await exportOrderList(filters);
    ElMessage.success("导出成功");
  } catch (error) {
    ElMessage.error("导出失败");
  }
};

const handleSelectionChange = (selection) => {
  console.log("选中订单", selection);
};

const handlePageChange = (page) => {
  pagination.currentPage = page;
  fetchOrders();
};

const handleSizeChange = (size) => {
  pagination.pageSize = size;
  fetchOrders();
};

const getStatusType = (status) => {
  switch (status) {
    case "待支付":
      return "info";
    case "待预约":
      return "warning";
    case "待服务":
      return "success";
    case "申请退款":
      return "danger";
    case "退款成功":
      return "primary";
    default:
      return "default";
  }
};

const approveRefund = async (row) => {
  try {
    await approveRefundRequest(row.id);
    ElMessage.success("退款已同意");
    fetchOrders();
  } catch (error) {
    ElMessage.error("退款失败");
  }
};
const exportOrderList = (data) => {
    if (orders.value.length === 0) {
      ElMessage.warning("没有数据可导出");
      return;
    }

    // 格式化导出数据
    const exportData = orders.value.map((order,index) => ({
      序号: index+1,
      订单号: order.orderNumber,
      姓名: order.name,
      性别: order.gender,
      手机号: order.phone,
      地址信息: order.address,
      商品名称: order.productName,
      付款价格: order.price,
      状态: order.status,
      下单时间: formatDateTime(order.orderTime),
    }));

    // 创建 Excel 表格
  const worksheet = XLSX.utils.json_to_sheet(exportData); // 转换为工作表
  const workbook = XLSX.utils.book_new(); // 创建新工作簿
  XLSX.utils.book_append_sheet(workbook, worksheet, "订单数据"); // 将工作表添加到工作簿

  // 生成 Excel 文件 Blob
  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });
  const blob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  // 下载 Excel 文件
  saveAs(blob, `订单数据_${new Date().toISOString().slice(0, 10)}.xlsx`);

  ElMessage.success("订单数据已成功导出");
  };





fetchOrders();
</script>

<style scoped>
.order-management {
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
