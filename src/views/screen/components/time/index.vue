<template>
    <div class="time">
        <span class="text">{{ time }}</span>
    </div>
</template>
<script setup lang="ts">
import useLayOutSettingStore from '@/store/modules/setting';
//@ts-ignore
import moment from 'moment'
//点击首页按钮回到首页
import { useRouter } from 'vue-router'
import { ref, onMounted, onBeforeUnmount } from 'vue'
import useUserStore from '@/store/modules/user';
let useStore = useUserStore();
let settingStore = useLayOutSettingStore();
//获取路由器对象
let $router = useRouter()
//存储当前时间
let time = ref(moment().format('YYYY-MM-DD HH:mm:ss'))
let timer = ref(0)
//按钮的点击回调
const goHome = async () => {
    if (settingStore.generalControl == '主页')
        $router.push('/user');
    else if (settingStore.generalControl == '返回')
        $router.push('/roomcontrol');
    else if (settingStore.generalControl == '数据大屏')
        $router.push('/screen');
    else if (settingStore.generalControl == '退出') {
        await useStore.userLogout();
        $router.push('/login');
    }
}
//组件挂载完毕更新当前的事件
onMounted(() => {
    timer.value = setInterval(() => {
        time.value = moment().format('YYYY年MM月DD日 HH:mm:ss')
    }, 1000)
})

onBeforeUnmount(() => {
    clearInterval(timer.value)
})
</script>

<style scoped lang="scss">
.time {
    width: 100%;
    height: 100%;
    background: url(../../images/time.png) no-repeat center;
    background-size: 100% 100%;
    // background-color: aqua;
    // margin: 20px 0px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    margin-top: 20px;
    padding-left: 90px;

    .text {
        color: #ebf1f5;
        font-size: 30px;
        margin-inline: 5px;
        font-weight: 500;

    }
}
</style>