<script setup lang="ts">
//import {Plus} from '@element-plus/icons-vue'
// import Test from "@/components/Test.vue";
// import request from '@/utils/request';
// import { reqLogin } from '@/api/user/index.ts';
// import { onMounted } from 'vue';
//当你组件挂载完毕测试发一个请求
// onMounted(() => {

//   reqLogin({ username: 'admin', password: '111111' })
// request({
//   url: '/user/login',
//   method: 'post',
//   data: {
//     username: 'admin',
//     password: '111111'
//   }
// }).then((res: any) => {
//   console.log(res);
// console.log(import.meta.env.VITE_APP_BASE_API);
//console.log(import.meta.env)
// console.log(import.meta.env.VITE_APP_BASE_API);
// }
// )
</script>

<template>
  <div>
    <router-view></router-view>
    <!-- <router-link to="{path: '/login'}"></router-link> -->
    <!-- <el-button type="primary" size="default" :icon="Plus">主要按</el-button> -->
    <!-- <Test></Test> -->
    <!-- <Pagination></Pagination> -->
    <!-- <Pagination
      name="phone"
      color="pink"
      width="100px"
      height="100px"
    ></Pagination> -->
    <!-- <h1>ceshi</h1> -->
  </div>
</template>

<style scoped lang="scss"></style>
