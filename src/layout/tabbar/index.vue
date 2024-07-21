<script setup lang="ts">
import Breadcrumb from './breadcrumb/index.vue'
import Setting from './setting/index.vue';
</script>
<template>
    <div class="tabbar">
        <div class="tabbar_left">
            <Breadcrumb></Breadcrumb>
        </div>
        <div class="tabbar_right">
            <Setting></Setting>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.tabbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
    // background: linear-gradient(to right, #1a234e, #213c7b, #17254a);
    background-image: linear-gradient(to right, rgb(200, 202, 218), #132044);

    .tabbar_left {
        display: flex;
        align-items: center;
        margin-left: 10px;
    }

    .tabbar_right {
        display: flex;
        align-items: center;
    }
}
</style>
