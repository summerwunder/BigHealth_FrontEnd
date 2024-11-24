<!--
 * @Author: wangmr mingrui@whut.edu.cn
 * @Date: 2024-11-23 20:21:34
 * @LastEditors: wangmr mingrui@whut.edu.cn
 * @LastEditTime: 2024-11-24 09:38:00
 * @FilePath: /BigHealth/BigHealthMarket_FrontEnd/src/views/content/banner.vue
 * @Description: 
 * 2405499352@qq.com
-->

<template>
    <div class="banner-management-container">
      <div class="header">
        <el-form :model="filters" inline class="filter-form">
          <el-form-item label="位置" >
            <el-select v-model="filters.position" placeholder="请选择" clearable style="width:120px">
              <el-option label="首页" value="首页"></el-option>
              <el-option label="商城" value="商城"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="fetchBannerList()">查询</el-button>
            <el-button @click="resetFilters">重置</el-button>
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="openAddDialog">+ 新增</el-button>
      </div>
  
      <el-table
        :data="banners"
        border
        v-loading="loading"
        style="width: 100%"
      >
        <el-table-column prop="id" label="序号" align="center" width="60" />
        <el-table-column prop="imageUrl" label="图片" align="center">
          <template #default="{ row }">
            <img :src="getImageUrl(row.imageUrl)" alt="轮播图" style="width: 160px; height: auto;" />
          </template>
        </el-table-column>
        <el-table-column prop="position" label="位置" align="center" width="100"/>
        <el-table-column prop="sortOrder" label="排序" align="center" width="100"/>
        <el-table-column prop="updateTime" label="更新时间" align="center" >
            <template #default="{ row }">
              {{ formatDateTime(row.updateTime) }}
            </template>
        </el-table-column>
        <el-table-column label="操作" align="center" fixed="right" width="150">
          <template #default="{ row }">
            <el-button type="text" @click="console.log(5)">查看详情</el-button>
            <el-button type="text" style="color: red;" @click="deleteBanner(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
  

      <el-pagination
        background
        layout="prev, pager, next, sizes, total"
        :current-page="pagination.currentPage"
        :page-size="pagination.pageSize"
        :total="pagination.total"
        :page-sizes = '[3,5,8,10]'
        style="margin-top: 20px;"
        @current-change="handlePageChange"
        @size-change="handleSizeChange"
      ></el-pagination>
  
      <!-- 新增对话框 -->
      <el-dialog title="新增轮播图" v-model="dialogVisible" width="50%">
        <el-form ref="formRef" :model="formData" :rules="rules" label-width="120px">
          <!-- 图片上传 -->
          <el-form-item label="图片：" prop="image">
            <img v-if="formData.image" :src="formData.image" alt="图片预览" class="preview-image"  />
            <el-upload
              class="upload-demo"
              action="http://localhost:8000/upload/image"
              list-type="picture-card"
              :on-success="handleImageSuccess"
              :headers="{
                'Access-Control-Allow-Origin': '*'
            }"
              :limit="1"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
  
          <!-- 轮播图位置 -->
          <el-form-item label="轮播图位置：" prop="position">
            <el-select v-model="formData.position" placeholder="请选择" style="width:200px">
              <el-option label="首页" value="首页"></el-option>
              <el-option label="商城" value="商城"></el-option>
            </el-select>
          </el-form-item>
  
          <!-- 排序 -->
          <el-form-item label="排序：" prop="sortOrder">
            <el-input-number v-model="formData.sortOrder" :min="1" label="排序" />
            <span class="sort-desc">数字越大越靠后</span>
          </el-form-item>
        </el-form>
  
        <!-- Dialog 底部按钮 -->
        <span slot="footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitForm">提交</el-button>
        </span>
      </el-dialog>
    </div>
  </template>
  
  
  <script setup>
  import { ref, reactive } from "vue";
  import { ElMessage } from "element-plus";
  import {formatDateTime} from "@/utils/convert"
  import { fetchBanners, deleteBannerById, addBanner } from "@/api/content";
  
  const filters = reactive({
    position: "",
  });
  
  const banners = ref([]);
  const loading = ref(false);
  const baseURL = 'http://localhost:8000'

  const getImageUrl = (url) => {
    return baseURL + url;
};
  const pagination = reactive({
    currentPage: 1,
    pageSize: 3,
    total: 0,
  });
  
  const dialogVisible = ref(false);
  const formRef = ref(null);
  const formData = reactive({
    id: null,
    image: "",
    position: "",
    sortOrder: 1,
  });
  
  const rules = {
    image: [{ required: true, message: "请上传图片", trigger: "blur" }],
    position: [{ required: true, message: "请选择轮播图位置", trigger: "change" }],
    sortOrder: [{ required: true, type: "number", message: "请输入排序", trigger: "change" }],
  };
  
  const fetchBannerList = async () => {
    loading.value = true;
    try {
      const params = {
        page: pagination.currentPage,
        size: pagination.pageSize,
        position: filters.position,
      };
      const response = await fetchBanners(params);
      banners.value = response.data.data.records;
      pagination.total = response.data.data.total;
    } catch (error) {
      ElMessage.error("获取轮播图列表失败");
    } finally {
      loading.value = false;
    }
  };
  
  const handleImageSuccess = (response) => {
    if (response.status === "success") {
      formData.image = response.url;
    } else {
      ElMessage.error("图片上传失败");
    }
  };
  
  const resetFilters = () => {
    filters.position = "";
    fetchBannerList();
  };
  
  const handlePageChange = (page) => {
    pagination.currentPage = page;
    fetchBannerList();
  };
  const handleSizeChange = (size) => {
    pagination.pageSize = size;
    fetchBannerList();
};
  
  const openAddDialog = () => {
    resetFormData();
    dialogVisible.value = true;
  };
  
  const submitForm = async () => {
    formRef.value.validate(async (valid) => {
      if (valid) {
        try {
            await addBanner(formData); // 新增
            ElMessage.success("新增成功");
            dialogVisible.value = false; 
            fetchBannerList();
        } catch (error) {
          ElMessage.error("操作失败");
        }
      } else {
        ElMessage.error("请填写完整表单信息");
      }
    });
  };
  
  const resetFormData = () => {
    formData.id = null;
    formData.image = "";
    formData.position = "";
    formData.sortOrder = 1;
  };
  
  const deleteBanner = async (id) => {
    try {
      await deleteBannerById(id);
      ElMessage.success("删除成功");
      fetchBannerList();
    } catch (error) {
      ElMessage.error("删除失败");
    }
  };
  
  // 初始化
  fetchBannerList();

  </script>
<style scoped>
.banner-management-container{
    margin:30px

}

.header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.filter-form {
  display: flex;
  align-items: center;
}

.preview-image {
  width: 100px;
  height: auto;
  margin-top: 10px;
}

.sort-desc {
  color: gray;
  font-size: 12px;
  margin-left: 10px;
}
</style>

  