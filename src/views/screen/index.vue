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
          <Line class="line"></Line>
          <Area class="area"></Area>
          <Bar class="bar"></Bar>
        </div>
        <div class="center">
          <!-- <div class="school" @click="roominfo">
            <img class="img" src="./images/school.png" />
          </div> -->
          <School></School>
          <div class="structure">
            <img class="img2" src="./images/structure.png" />
          </div>
        </div>
        <div class="right">
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
//引入左侧三个子组件
import Line from './components/line/index.vue'
import Area from './components/area/index.vue'
import Bar from './components/bar/index.vue'
import School from './components/school/index.vue'
import useLayOutSettingStore from '@/store/modules/setting';
let settingStore = useLayOutSettingStore();

//引入中间两个子组件

//引入右侧三个子组件
import Pie from './components/pie/index.vue'
import Table from './components/table/index.vue'
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
  background: url(./images/bg.png) no-repeat;
  background-size: cover;

  .screen {
    position: fixed;
    width: 1920px;
    height: 1080px;
    left: 50%;
    top: 50%;
    transform-origin: left top;

    .top {
      width: 100%;
      height: 40px;
    }

    .bottom {
      display: flex;

      .right {
        flex: 1;
        display: flex;
        flex-direction: column;
        margin-left: 40px;

        .pie {

          flex: 1.2;
        }

        .table {

          flex: 2;
        }
      }

      .left {
        flex: 1;
        height: 1040px;
        display: flex;
        flex-direction: column;
        // align-items: center;
        // justify-content: center;

        .line {
          // background-color: red;
          flex: 1;
        }

        .area {

          color: red;
          flex: 1;
          flex: 1;
        }
      }

      .center {
        flex: 1.5;
        display: flex;
        flex-direction: column;

        .school {
          flex: 4;
        }

        .structure {
          display: flex;
          width: 100%;
          flex: 1;
          align-items: center;
          justify-content: center;

          .img2 {
            max-width: 100%;
            height: 280px;
          }
        }
      }
    }
  }
}
</style>
