<!--
 * @Author: wangmr mingrui@whut.edu.cn
 * @Date: 2024-11-21 22:45:54
 * @LastEditors: wangmr mingrui@whut.edu.cn
 * @LastEditTime: 2024-11-21 23:30:54
 * @FilePath: /BigHealth/BigHealthMarket_FrontEnd/src/views/mall/product.vue
 * @Description: 
 * 2405499352@qq.com
-->
<template>
    <div class="product-management">
      <!-- 筛选表单 -->
      <el-form :model="filters" inline class="filter-form">
        <el-form-item label="商品名称">
          <el-input v-model="filters.productName" placeholder="请输入商品名称" />
        </el-form-item>
        <el-form-item label="商品类型" style="width: 200px;">
          <el-select v-model="filters.productType" placeholder="请选择">
            <el-option label="体检" value="体检" />
            <el-option label="健康" value="健康" />
          </el-select>
        </el-form-item>
        <el-form-item label="是否上架" style="width:200px">
          <el-select v-model="filters.isListed" placeholder="请选择">
            <el-option label="是" value="1" />
            <el-option label="否" value="0" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="fetchProducts()">查询</el-button>
          <el-button @click="resetFilters">重置</el-button>
        </el-form-item>
      </el-form>
  
      <!-- 操作按钮 -->
      <div class="actions">
        <el-button type="primary" @click="addProduct">新增商品</el-button>
      </div>
  
      <!-- 数据表格 -->
      <el-table
        :data="products"
        border
        v-loading="loading"
        style="width: 100%"
      >
        <el-table-column prop="id" label="序号" align="center" />
        <el-table-column prop="name" label="商品名称" align="center" />
        <el-table-column prop="price" label="价格" align="center">
          <template #default="{ row }">
            ¥{{ row.price }}
          </template>
        </el-table-column>
        <el-table-column prop="isListed" label="是否上架" align="center">
          <template #default="{ row }">
            {{ row.isListed ? "是" : "否" }}
          </template>
        </el-table-column>
        <el-table-column prop="isRecommended" label="是否推荐" align="center">
          <template #default="{ row }">
            {{ row.isRecommended ? "是" : "否" }}
          </template>
        </el-table-column>
        <el-table-column prop="updateTime" label="更新时间" align="center" width="240">
            <template #default="{ row }">
            {{ formatDateTime(row.updateTime )}}
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="230" align="center">
          <template #default="{ row }">
            <el-button type="primary" size="small" @click="editProduct(row)">编辑</el-button>
            <el-button type="danger" size="small" @click="deleteProduct(row)">删除</el-button>
            <el-button type="info" size="small" @click="viewDetails(row)">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
  
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
  import { ref } from "vue";
  import {formatDate,formatDateTime} from "@/utils/convert"
  import { ElMessageBox, ElMessage } from "element-plus";
  import { getProductList, deleteProductById } from "@/api/product"; 
  
  // 筛选条件
  const filters = ref({
    productName: "",
    productType: "",
    isListed: "",
  });
  
  // 数据列表
  const products = ref([]);
  const loading = ref(false);
  
  // 分页
  const pagination = ref({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  
  // 获取商品列表
  const fetchProducts = async () => {
    const params = {
      page: pagination.value.current,
      size: pagination.value.pageSize,
      ...filters.value,
    };
    loading.value = true;
    try {
      const res = await getProductList(params); // 获取数据
      const result = res.data.data;
      products.value = result.records;
      pagination.value.total = result.total;
    } catch (error) {
      ElMessage.error("加载商品列表失败");
    } finally {
      loading.value = false;
    }
  };
  
  // 重置筛选条件
  const resetFilters = () => {
    filters.value.productName = "";
    filters.value.productType = "";
    filters.value.isListed = "";
    fetchProducts();
  };
  
  // 分页事件
  const handleSizeChange = (size) => {
    pagination.value.pageSize = size;
    fetchProducts();
  };
  const handleCurrentChange = (current) => {
    pagination.value.current = current;
    fetchProducts();
  };
  
  // 操作事件
  const addProduct = () => {
    console.log("新增商品");
  };
  
  const editProduct = (row) => {
    console.log("编辑商品", row);
  };
  
  const deleteProduct = (row) => {
    ElMessageBox.confirm(
      `确定要删除商品 "${row.name}" 吗？`,
      "提示",
      {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }
    )
      .then(async () => {
        try {
          await deleteProductById(row.id);
          ElMessage.success("删除成功");
          fetchProducts();
        } catch (error) {
          ElMessage.error("删除失败");
        }
      })
      .catch(() => {
        ElMessage.info("已取消删除");
      });
  };
  
  const viewDetails = (row) => {
    console.log("查看详情", row);
  };
  
  // 初始化
  fetchProducts();
  </script>
  
  <style scoped>
  .product-management {
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
  