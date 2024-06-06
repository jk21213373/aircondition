<template>
    <div class="nfound">
        <div class="page">
            <!-- <img src="@/assets/images/404.jpg" alt="" /> -->
        </div>
        <el-button class="btn" @click="$router.push(routes[index])"><span
                style="color:white;font-weight: bold;">返回首页</span></el-button>
    </div>
</template>
<script setup>
import { useRouter } from 'vue-router';
import useUserStore from '@/store/modules/user';
let routes = ['/user', '/room', '/screen'];
let useStore = useUserStore();
let index = Number(useStore.type) - 1;
let $router = useRouter();
</script>
<style scoped>
.nfound {
    width: 100%;
    height: 100vh;
    background-color: #08082c;
    /* background-size: cover; */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 30px;

    .page {
        /* background-color: red; */
        /* background: url('@/assets/images/404.jpg') cover; */
        width: 600px;
        height: 300px;
        /* overflow: hidden; */
        background: url("@/assets/images/404.jpg") no-repeat center;
        background-size: cover;
    }

    .btn {
        background-color: #f9a543;
        border-radius: 50px;
    }
}
</style>
