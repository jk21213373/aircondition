<template>
    <!--顶部左侧静态-->
    <el-icon style="margin-right:10px" @click="changeIcon">
        <component :is="LayOutSettingStore.fold ? 'Fold' : 'Expand'"></component>
    </el-icon>
    <!--左侧面包屑-->
    <el-breadcrumb separator-icon="ArrowRight">
        <el-breadcrumb-item v-for="(item, index) in $route.matched" :key="index" v-show="item.meta.title"
            :to="item.path">
            <el-icon>
                <component :is="item.meta.icon"> </component>
            </el-icon>
            <span style="margin:0px 5px">{{ item.meta.title }}</span>
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script setup lang='ts'>
import useLayOutSettingStore from '@/store/modules/setting';
import { useRoute } from 'vue-router';
let $route = useRoute();
let LayOutSettingStore = useLayOutSettingStore();
const changeIcon = () => {
    //图标进行切换
    LayOutSettingStore.fold = !LayOutSettingStore.fold
}
</script>

<style scoped lang='scss'></style>
