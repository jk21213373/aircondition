<template>
  <div class="container">
    <!-- 数据大屏展示内容区域 -->
    <div class="screen" ref="screen">
      <!-- 数据大屏顶部 -->
      <div class="top">
        <Top />
      </div>
      <div class="bottom">
        <div class="left">
          <!-- <div class="tourist"></div> -->
          <Line class="line"></Line>
          <Area class="area"></Area>
          <Bar class="bar"></Bar>
          <!-- <div class="sex"></div>
          <div class="age"></div> -->

          <!-- <Tourist class="tourist"></Tourist>
          <Sex class="sex"></Sex>
          <Age class="age"></Age> -->
        </div>
        <div class="center">
          <School></School>
          <Equipment></Equipment>
          <!-- <div class="school"></div> -->
          <!-- <div class="equipment"></div> -->
        </div>
        <div class="right">
          <!-- <Rank class="rank"></Rank>
          <Year class="year"></Year>
          <Counter class="count"></Counter> -->
          <!-- <div class="rank"></div>
          <div class="year"></div>
          <div class="count"></div> -->
          <Time></Time>
          <Pie class="pie"></Pie>
          <Table class="table"></Table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
//引入顶部的子组件
import Top from './components/top/index.vue'
import Line from './components/line/index.vue'
import Area from './components/area/index.vue'
import Bar from './components/bar/index.vue'
import School from './components/school/index.vue'
import Equipment from './components/equipment/index.vue'
import Pie from './components/pie/index.vue'
import Table from './components/table/index.vue'
import Time from './components/time/index.vue'
import useLayOutSettingStore from '@/store/modules/setting';
let settingStore = useLayOutSettingStore();
import useUserStore from '@/store/modules/user';
let useStore = useUserStore();
//获取数据大屏展示内容盒子的DOM元素
let screen = ref()
onMounted(() => {
  if (useStore.type == '1') settingStore.generalControl = '主页';
  else if (useStore.type == '3') settingStore.generalControl = '退出';
  screen.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`
})
//定义大屏缩放比例
function getScale(w = 1920, h = 1080) {
  const ww = window.innerWidth / w
  const wh = window.innerHeight / h
  return ww < wh ? ww : wh
}
//监听视口变化
window.onresize = () => {
  screen.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`
}
</script>

<style scoped lang="scss">
.container {
  width: 100vw;
  height: 100vh;
  background: url(./images/Group6.png) no-repeat;
  background-size: cover;

  .screen {
    position: fixed;
    width: 1920px;
    height: 1080px;
    left: 50%;
    top: 50%;
    transform-origin: left top;
    background: url(./images/Group6.png) no-repeat center;
    background-size: 100% 100%;

    .top {
      width: 100%;
      height: 87px;

    }

    .bottom {
      display: flex;
      // background-color: antiquewhite;

      .right {
        flex: 1;
        display: flex;
        flex-direction: column;

        .time {
          flex: 0.2;
        }

        .pie {
          flex: 1.1;
          // background-color: blueviolet;
        }

        .table {
          // background-color: blue;
          flex: 1.1;
        }
      }

      .left {
        // background-color: cadetblue;
        flex: 1;
        height: 993px;
        display: flex;
        flex-direction: column;

        .line {
          // background-color: burlywood;
          flex: 1;
        }

        .area {
          // background-color: chartreuse;
          flex: 1;
        }

        .bar {
          // background-color: chartreuse;
          flex: 1;
        }
      }

      .center {
        background: url(./images/Group155.png) no-repeat center;
        background-size: 125% 100%;
        // background-color: aqua;
        flex: 1.7;
        display: flex;
        flex-direction: column;
        margin-inline: 8px;

        .school {
          // background-color: red;
          flex: 5;
        }

        .equipment {
          // background-color: yellow;
          flex: 2;
        }

      }
    }
  }
}
</style>
