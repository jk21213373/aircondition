<template>
  <div class="top">
    <div class="left">
      <span class="lbtn" @click="goHome">{{ settingStore.generalControl }}</span>
    </div>
    <div class="center">
      <div class="title">全息低碳管控云服务平台</div>
    </div>
    <div class="right">
      <span class="rbtn">当前时间</span>
      <span class="time">{{ time }}</span>
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
const goHome = async () => {
  if (settingStore.generalControl == '主页')
    $router.push('/user');
  else if (settingStore.generalControl == '返回')
    $router.push('/roomcontrol');
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
  height: 40px;
  display: flex;

  .left {
    flex: 1.5;
    background: url(../../images/dataScreen-header-left-bg.png) no-repeat;
    background-size: cover;

    .lbtn {
      width: 150px;
      height: 40px;
      float: right;
      background: url(../../images/dataScreen-header-btn-bg-l.png) no-repeat;
      background-size: 100% 100%;
      text-align: center;
      line-height: 40px;
      color: #29fcff;
      font-size: 20px;
      cursor: pointer;
    }
  }

  .center {
    flex: 2;

    .title {
      width: 100%;
      height: 74px;
      background: url(../../images/dataScreen-header-center-bg.png) no-repeat;
      background-size: 100% 100%;
      text-align: center;
      line-height: 74px;
      color: #29fcff;
      font-size: 30px;
    }
  }

  .right {
    flex: 1.5;
    background: url(../../images/dataScreen-header-left-bg.png) no-repeat;
    background-size: cover;
    display: flex;
    gap: 60px;
    // justify-content: space-between;
    align-items: center;

    .rbtn {
      width: 150px;
      height: 40px;
      background: url(../../images/dataScreen-header-btn-bg-r.png) no-repeat;
      background-size: 100% 100%;
      text-align: center;
      line-height: 40px;
      color: #29fcff;
      font-size: 20px;
      cursor: pointer;
    }

    .time {
      color: #29fcff;
      font-size: 20px;
    }
  }
}
</style>
