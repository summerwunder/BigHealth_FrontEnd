
<!--
 * @Author: wangmr mingrui@whut.edu.cn
 * @Date: 2024-11-22 10:56:39
 * @LastEditors: wangmr mingrui@whut.edu.cn
 * @LastEditTime: 2024-11-23 10:03:01
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
          <el-select v-model="filters.gender" placeholder="请选择" style="width: 100px;">
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
            style="width: 200px;"
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
        <el-button type="primary" @click="addReservation">新增预约人</el-button>
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
        <el-table-column prop="name" label="真实姓名" align="center" width="100" />
        <el-table-column prop="gender" label="性别" align="center" width="80"/>
        <el-table-column prop="phone" label="手机号" align="center" />
        <el-table-column prop="idCard" label="身份证" align="center" />
        <el-table-column prop="productName" label="预约商品" align="center" />
        <el-table-column prop="appointmentTime" label="预约体检时间" align="center" >
        <template #default="{ row }">
            <span>{{ formatDateTime(row.appointmentTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="是否到店" align="center">
          <template #default="{ row }">
            <el-tag v-if="row.status != '确认到店'" :type="getStatusType(row.status)">{{ row.status }}</el-tag>
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
        <el-table-column prop="createTime" label="申请时间" align="center" > 
        <template #default="{ row }">
            <span>{{ formatDateTime(row.createTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="150" align="center">
          <template #default="{ row }">
            <el-button type="text" @click="editReservation(row)">编辑</el-button>
            <el-button type="text" @click="viewDetails(row)">查看详情</el-button>
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
        style="margin-top: 20px"
        @current-change="handlePageChange"
        @size-change="handleSizeChange"
      />
    </div>
  </template>
  
  <script setup>
  import { ref, reactive } from "vue";
  import { fetchReservationList} from "@/api/reservation";
  import { ElMessage } from "element-plus";
  import { formatDateTime} from "@/utils/convert"
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
    try {
      ElMessage.success("导出成功");
    } catch (error) {
      ElMessage.error("导出失败");
    }
  };
  
  // 确认到店
  const confirmArrival = (row) => {
    ElMessage.success(`已确认 ${row.name} 到店`);
  };
  
  // 编辑预约
  const editReservation = (row) => {
    console.log("编辑预约", row);
  };
  
  // 查看预约详情
  const viewDetails = (row) => {
    console.log("查看预约详情", row);
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
  