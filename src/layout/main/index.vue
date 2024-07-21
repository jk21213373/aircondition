<template>
    <!-- 路由组件出口的位置 -->
    <router-view v-slot="{ Component }">
        <transition name="fade">
            <component :is="Component" v-if="flag" />
        </transition>
    </router-view>
</template>
<style lang="scss" scoped>
.fade-enter-from {
    opacity: 0;
    transform: scale(0);
}

.fade-enter-active {
    transition: all 0.3s;
}

.fade-enter-to {
    opacity: 1;
    transform: scale(1);
}
</style>


<script setup lang='ts'>
import useLayOutSettingStore from '@/store/modules/setting';
import { watch, ref, nextTick } from 'vue';
let LayOutSettingStore = useLayOutSettingStore();
let flag = ref(true);
watch(() => LayOutSettingStore.refsh, () => {
    //点击刷新按组：路由组件销段
    flag.value = false;
    nextTick(() => {
        flag.value = true;
    })
})
</script>
