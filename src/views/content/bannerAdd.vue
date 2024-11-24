<!--
 * @Author: wangmr mingrui@whut.edu.cn
 * @Date: 2024-11-23 20:21:42
 * @LastEditors: wangmr mingrui@whut.edu.cn
 * @LastEditTime: 2024-11-23 21:02:57
 * @FilePath: /BigHealth/BigHealthMarket_FrontEnd/src/views/content/bannerAdd.vue
 * @Description: 
 * 2405499352@qq.com
-->

<template>
    <div class="banner-add-container">
        <el-dialog title="新增轮播图" v-model="dialogVisible" width="50%">
            <el-form ref="formRef" :model="formData" :rules="rules" label-width="100px">
                <!-- 图片上传 -->
                <el-form-item label="图片：" prop="image">
                    <img v-if="formData.image" :src="formData.image" alt="图片预览" class="preview-image" />
                    <el-upload class="upload-demo" action="http://localhost:8000/upload/image" list-type="picture-card"
                        :on-success="handleImageSuccess"  limit="1">
                        <i class="el-icon-plus"></i>
                    </el-upload>   
                </el-form-item>

                <!-- 轮播图位置 -->
                <el-form-item label="轮播图位置：" prop="position">
                    <el-select v-model="formData.position" placeholder="请选择">
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

const dialogVisible = ref(true);
const uploadedImageUrl = ref("");
const formData = reactive({
    image: "",
    position: "",
    sortOrder: 1,
});

const rules = {
    image: [{ required: true, message: "请上传图片", trigger: "blur" }],
    position: [{ required: true, message: "请选择轮播图位置", trigger: "change" }],
    sortOrder: [{ required: true, type: "number", message: "请输入排序", trigger: "change" }],
};

const handleImageSuccess = (response) => {
    if (response.status === "success") {
        uploadedImageUrl.value = `http://localhost:8080${response.url}`;
    } else {
        console.error(response.message);
    }
};
const submitForm = () => {
    const formRef = ref();
    formRef.value.validate((valid) => {
        if (valid) {
            console.log("提交数据：", formData);
            ElMessage.success("提交成功");
            dialogVisible.value = false;
        } else {
            ElMessage.error("请填写完整表单信息");
        }
    });
};
</script>
  
<style scoped>
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

.video-preview {
    color: green;
    margin-top: 5px;
}
</style>
  