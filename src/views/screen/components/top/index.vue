<template>
  <div class="top">
    <div class="left" @click="goHome">
    </div>
    <div class="center">
      <div class="title">全息低碳管控云服务平台</div>

    </div>

    <div class="right"></div>
    <!-- <div class="left">
      <span class="lbtn" @click="goHome">{{ settingStore.generalControl }}</span>
    </div> -->
    <!-- <div class="center">
      <div class="title">全息低碳管控云服务平台</div>
    </div> -->
    <!-- <div class="right">
      <span class="rbtn">当前时间</span>
      <span class="time">{{ time }}</span>
    </div> -->
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
  console.log("111111111111111111111111111111111111111111111111")
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
  background: url(../../images/ggg.svg) no-repeat center;
  background-size: 100% auto;
  // background-color: red;

  // justify-content: center;
  //align-content: center;
  .left {
    flex: 1;
    //background-color: #29fcff;
    background: url(../../images/Group4.png) no-repeat;
    background-position: right 16px bottom -5px;

  }

  .center {
    display: flex;
    flex-direction: column;
    // background-color: aqua;
    flex: 0.8;
    margin-inline: 20px;

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
      margin-top: 10px;
    }

    .bottom {
      flex: 0.5;
      background: url(../../images/start.png) no-repeat center;
      background-position: 10px;
      // background-color: greenyellow;
    }
  }

  .right {
    flex: 1;
    // background-color: #29fcff;
    background: url(../../images/Group2.png) no-repeat;
    background-position: left 16px bottom -5px;

  }
}
</style>
