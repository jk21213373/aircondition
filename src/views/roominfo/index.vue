<template>
  <div class="container">
    <!-- 数据大屏展示内容区域 -->
    <div class="screen" ref="screen">
      <!-- 数据大屏顶部 -->
      <div class="top">
        <Top />
        <span class="storeyRoom">{{ roomStore.storeyRoomID }}</span>
      </div>
      <div class="bottom">
        <div class="left">
          <!-- <div class="tourist"></div> -->
          <Line class="line"></Line>
          <Area class="area"></Area>
          <!-- <div class="sex"></div>
          <div class="age"></div> -->

          <!-- <Tourist class="tourist"></Tourist>
          <Sex class="sex"></Sex>
          <Age class="age"></Age> -->
        </div>
        <div class="center">
          <Display></Display>
          <Control></Control>
          <!-- <div class='control'></div> -->
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
          <Bar class="bar"></Bar>
          <Table class="table"></Table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
//引入顶部的子组件
import Top from '@/views/roomcontrol/top/index.vue'
import Display from './display/index.vue'
import Control from './control/index.vue'
import Line from './line/index.vue'
import Area from './area/index.vue'
import Bar from './bar/index.vue'
import Table from './table/index.vue'
import Time from './time/index.vue'
import useLayOutSettingStore from '@/store/modules/setting';
let settingStore = useLayOutSettingStore();
import useUserStore from '@/store/modules/user';
let useStore = useUserStore();
import useLayOutRoomStore from '@/store/modules/room';
let roomStore = useLayOutRoomStore();
//获取数据大屏展示内容盒子的DOM元素
let screen = ref()
onMounted(() => {
  settingStore.generalControl = '返回';
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
  background: url(@/views/screen/images/Group6.png) no-repeat;
  background-size: cover;

  .screen {
    position: fixed;
    width: 1920px;
    height: 1080px;
    left: 50%;
    top: 50%;
    transform-origin: left top;
    background: url(@/views/screen/images/Group6.png) no-repeat;
    background-size: cover;

    .top {
      width: 100%;
      height: 87px;

      .storeyRoom {
        position: absolute;
        /* 或者使用 relative，但绝对定位在这里更直观 */
        top: 5px;
        left: 5px;
        font-size: 30px;
        color: rgb(108, 220, 243);
      }
    }


    .bottom {
      // padding: 15px;
      display: flex;
      // background-color: antiquewhite;

      .right {
        flex: 1;
        display: flex;
        flex-direction: column;

        .time {
          flex: 0.2;
        }

        .bar {
          // background-color: chartreuse;
          flex: 1.1;
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
      }

      .center {
        background: url(@/views/screen/images/Group155.png) no-repeat center;
        background-size: 125% 100%;
        // background-color: aqua;
        flex: 1.8;
        display: flex;
        flex-direction: column;

        .display {
          // background-color: red;
          flex: 1;
        }

        .control {
          // background-color: yellow;
          flex: 1.3;
        }

      }
    }
  }
}
</style>