<template>
    <el-button size="small" icon="Refresh" circle @click="updateRefsh"></el-button>
    <el-button size="small" icon="FullScreen" circle @click="fullScreen"></el-button>
    <el-button size="small" icon="Setting" circle></el-button>
    <img :src="userStore.avatar" style="width:24px; height:24px;margin:0px 10px;border-radius:50%">
    <el-dropdown>
        <span class="el-dropdown-link" style="color:white">
            {{ userStore.username }}
            <el-icon class="el-icon--right">
                <arrow-down />
            </el-icon>
        </span>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<script setup lang='ts'>
import useLayOutSettingStore from '@/store/modules/setting';
import useUserStore from "@/store/modules/user";
import { useRouter, useRoute } from 'vue-router';
let userStore = useUserStore();
console.log(userStore.username);
let layoutSettingStore = useLayOutSettingStore();
let $router = useRouter();
let $route = useRoute();
//刷新按钮点击回调
const updateRefsh = () => {
    layoutSettingStore.refsh = !layoutSettingStore.refsh;
}
const fullScreen = () => {
    let full = document.fullscreenElement;
    if (!full) {
        //文档根节点的方法requestFu11 screen,实现全屏
        document.documentElement.requestFullscreen();
    } else {
        //变为不是全屏模式->退出全屏模式 
        document.exitFullscreen();
    }
}
const logout = async () => {
    //第一件事情：需要向服务器发请求【退出登录接口】***
    //第二件事情：仓库当中关于用于相关的数据清空[token|username|avatar]
    //第三件事情：跳转到登录页面
    await userStore.userLogout();
    //跳转到登录页面
    $router.push({ path: '/login', query: { redirect: $route.path } });
}
</script>

<style scoped lang='scss'></style>
