<!--
 * @Author: wangmr mingrui@whut.edu.cn
 * @Date: 2024-11-23 20:21:42
 * @LastEditors: wangmr mingrui@whut.edu.cn
 * @LastEditTime: 2024-11-24 10:09:07
 * @FilePath: /BigHealth/BigHealthMarket_FrontEnd/src/views/content/bannerDetails.vue
 * @Description: 
 * 2405499352@qq.com
-->

<template>
    <div class="banner-details-container">
      <el-card class="box-card">
        <h3>轮播图详情</h3>
        <el-form label-width="120px">
          <el-form-item label="图片">
            <img :src="getImageUrl(bannerDetails.imageUrl)" alt="轮播图" style="width: 280px; height: auto;" />
          </el-form-item>
          <el-form-item label="轮播类型">
            <el-input :value="bannerDetails.position" disabled />
          </el-form-item>
          <el-form-item label="轮播图位置">
            <el-input :value="path" disabled />
          </el-form-item>
          <el-form-item label="轮播图排序">
            <el-input :value="bannerDetails.sortOrder" disabled />
          </el-form-item>
          <el-form-item label="创建时间">
            <el-input :value="formatDateTime(bannerDetails.createTime)" disabled />
          </el-form-item>
          <el-form-item label="更新时间">
            <el-input :value="formatDateTime(bannerDetails.updateTime)" disabled />
          </el-form-item>
          <el-button type="primary" @click="goBack">返回</el-button>
        </el-form>
      </el-card>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import { useRoute, useRouter } from "vue-router";
  import { fetchBannerDetails } from "@/api/content"; // 调用后端接口获取详情
  import {formatDateTime} from '@/utils/convert'
  const route = useRoute();
  const router = useRouter();
  const bannerDetails = ref({});
  const path = ref("")
  const baseURL = 'http://localhost:8000'
  const getImageUrl = (url) => {
    return baseURL + url;
    };
  const fetchDetails = async () => {
    const { id } = route.params;
    try {
      const response = await fetchBannerDetails(id);
      bannerDetails.value = response.data.data;
      path.value = getImageUrl(response.data.data.imageUrl)
    } catch (error) {
      console.error("获取详情失败", error);
    }
  };
  
  onMounted(() => {
    fetchDetails();
  });
  
  const goBack = () => {
    router.back();
  };
  </script>
  
  <style scoped>
  .banner-details-container {
    margin: 20px;
  }
  
  .box-card {
    padding: 20px;
  }
  
  img {
    border: 1px solid #ddd;
    padding: 5px;
  }
  </style>
  