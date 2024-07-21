<template>
    <div class="top">
        <div class="left">
            <p class="title" @click="goScreen">{{ settingStore.generalControl }}</p>
        </div>
        <div class="center">
            <div class="title">全息低碳管控云服务平台</div>
        </div>
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
let time = ref(moment().format('YYYY年MM月DD日 hh:mm:ss'))
let timer = ref(0)
//按钮的点击回调
const goScreen = async () => {
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
        time.value = moment().format('YYYY年MM月DD日 hh:mm:ss')
    }, 1000)
})

onBeforeUnmount(() => {
    clearInterval(timer.value)
})
</script>

<style scoped lang="scss">
.top {
    width: 100%;
    height: 100%;
    display: flex;
    margin-top: 1px;
    background: url(../images/fgp1.png) no-repeat;
    background-size: cover;

    // background-color: red;
    .left {
        flex: 1.4;
        // background-color: red;
        background: url(../images/fgp2.png) no-repeat center;
        background-size: 30% 55%;
        background-position: left 70px top;
        padding-left: 140px;

        .title {
            // width: 100%;
            // height: 100%;
            // background: url(../../images/dataScreen-header-center-bg.png) no-repeat;
            // background-size: 100% 93%;
            // text-align: center;
            // margin-left: 100px;
            color: #C7E6FF;
            font-size: 23px;
            letter-spacing: 2px;
            margin-top: 15px;
        }

    }

    .center {
        display: flex;
        // background-color: aqua;
        flex: 3;


        // justify-content: center;
        // margin-inline: 20px;

        .title {
            // width: 100%;
            // height: 100%;
            // background: url(../../images/dataScreen-header-center-bg.png) no-repeat;
            // background-size: 100% 93%;
            text-align: center;
            line-height: 54px;
            color: white;
            font-size: 40px;
            font-weight: 550;
            letter-spacing: 6px;
            margin-top: 15px;
        }

    }
}
</style>