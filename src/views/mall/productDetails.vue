<!--
 * @Author: wangmr mingrui@whut.edu.cn
 * @Date: 2024-11-22 10:15:18
 * @LastEditors: wangmr mingrui@whut.edu.cn
 * @LastEditTime: 2024-11-22 10:27:36
 * @FilePath: /BigHealth/BigHealthMarket_FrontEnd/src/views/mall/productDetails.vue
 * @Description: 
 * 2405499352@qq.com
-->
<template>
    <div class="product-details">
      <el-card class="box-card">
        <h2>{{ product.name }}</h2>
        <el-descriptions border column="2" title="商品详细信息">
          <el-descriptions-item label="商品名称">{{ product.name }}</el-descriptions-item>
          <el-descriptions-item label="商品类型">{{ product.type }}</el-descriptions-item>
          <el-descriptions-item label="商品价格">{{ product.price | formatCurrency }}</el-descriptions-item>
          <el-descriptions-item label="是否上架">{{ product.isListed ? "是" : "否" }}</el-descriptions-item>
          <el-descriptions-item label="是否推荐">{{ product.isRecommended ? "是" : "否" }}</el-descriptions-item>
          <el-descriptions-item label="更新时间">{{ formatDateTime(product.updateTime) }}</el-descriptions-item>
          <el-descriptions-item label="商品描述">{{ product.description }}</el-descriptions-item>
          <el-descriptions-item label="商品介绍">
            <div v-html="product.details"></div>
          </el-descriptions-item>
        </el-descriptions>
        <div class="actions">
          <el-button type="default" @click="goBack">返回</el-button>
        </div>
      </el-card>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import { useRoute, useRouter } from "vue-router";
  import { searchProductById } from "@/api/product";
  import { ElMessage } from "element-plus";
  import { formatDateTime, formatCurrency } from "@/utils/convert"; 
  
  const product = ref({});
  const route = useRoute();
  const router = useRouter();
  
  const fetchProductDetails = async (id) => {
    try {
      const response = await searchProductById(id);
      product.value = response.data.data;
    } catch (error) {
      ElMessage.error("获取商品详情失败");
    }
  };
  
  // Go back to the product list
  const goBack = () => {
    router.push("/index/mall/product");
  };
  
  // Fetch the product details on page load
  onMounted(() => {
    const productId = route.params.id; // Get product ID from the route
    fetchProductDetails(productId);
  });
  </script>
  
  <style scoped>
  .product-details {
    padding: 20px;
  }
  
  .actions {
    margin-top: 20px;
    text-align: right;
  }
  </style>
  
