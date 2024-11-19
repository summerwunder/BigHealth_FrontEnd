<!--
 * @Author: wangmr mingrui@whut.edu.cn
 * @Date: 2024-11-19 21:24:31
 * @LastEditors: wangmr mingrui@whut.edu.cn
 * @LastEditTime: 2024-11-19 21:24:57
 * @FilePath: /BigHealth/BigHealthMarket_FrontEnd/src/layout/ Main/index.vue
 * @Description: 
 * 2405499352@qq.com
-->
<template>
    <div>
        <router-view name="router_main"></router-view>
    </div> 
</template>
  
<script setup>
      
    import { onMounted } from 'vue';
    import { useRouter } from 'vue-router';
    const router = useRouter()
    onMounted(()=>{
      
    })
      
</script>
  
<style >

</style>
