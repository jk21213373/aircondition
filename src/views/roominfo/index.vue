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
          <Line class="line"></Line>
          <Area class="area"></Area>
        </div>
        <div class="center">
          <div class="centertop">
            <div class="btn">
              <el-button type="text" style="color:#02c6d6">{{ powerOn ? '开' : '关' }}</el-button>
              <span>状态</span>
            </div>
            <div class="btn">
              <el-button type="text" style="color:#01fc15">{{ temperatureinfo + '℃' }}</el-button>
              <span class="btntext">室内实时温度</span>
            </div>
            <div class="btn">
              <el-button type="text" style="color:#ff7842">{{ roominfo?.powerOnTime }}</el-button>
              <span>开机时间</span>
            </div>
            <div class="btn">
              <el-button type="text" style="color:#fba900">{{ roominfo?.powerOnHours + 'h' }}</el-button>
              <span>开关时长</span>
            </div>
            <!-- <img class="img" src="@/views/screen/images/centertop.png" /> -->
          </div>

          <div class="centerbottom">
            <div class="bottomtop"><span>空调控制</span></div>
            <div class="bottomlow">
              <div v-if=modeinfo class="b1">
                <img src="@/views/screen/images/u444.svg">
                <img v-if='powerOn' @click="powerOnSelect" src="@/views/screen/images/u461.svg" class="poweron">
                <img v-else @click="powerOnSelect" src="@/views/screen/images/u460.svg" class="poweron">
                <img @click="modechange" src="@/views/screen/images/u440.svg">
              </div>
              <div v-else class="b1">
                <img @click="modechange" src="@/views/screen/images/u443.svg">
                <img v-if='powerOn' @click="powerOnSelect" src="@/views/screen/images/u461.svg" class="poweron">
                <img v-else @click="powerOnSelect" src="@/views/screen/images/u460.svg" class="poweron">
                <img src="@/views/screen/images/u441.svg">
              </div>
              <div class="b2">
                <el-button @click="speedchage(key)" v-for="(speed, key) in ['低速', '中速', '高速', '自动']" :key="key"
                  :class="{ highlighted: key == speedinfo }">
                  <span>{{ speed }}</span>
                </el-button>
              </div>
              <div class="b3">
                <img src="@/views/screen/images/u455.svg" style="height: 80px;">
                <span>{{ temperatureinfo + '℃' }}</span>
                <div class="add">
                  <img @click="temperaturechage(1)" src="@/views/screen/images/u457.svg">
                  <img @click="temperaturechage(-1)" src="@/views/screen/images/u456.svg">
                </div>
              </div>
              <div class="b4">
                <div class="time" v-for="(time, key) in times" :key="key">
                  <el-button class="hide_input"><span>{{ time + 'AM' }}</span>
                    <!-- <el-time-picker v-model="times[key]" format='HH:mm' value-format='HH:mm' arrow-control /> -->
                  </el-button>
                  <span class="to">to</span>
                  <el-button><span>{{ time + 'AM' }}</span> </el-button>
                  <input type="checkbox" id="checkbox" style="width: 18px;height: 18px" v-model="checkeds[key]">
                  <label for="checkbox">启用</label></input>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="right">
          <Bar class="bar"></Bar>
          <Table class="table"></Table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reqGetStoreyRoom } from '@/api/acl/roominfo/index.ts';
//引入顶部的子组件
import Top from '@/views/screen/components/top/index.vue'
//引入左侧三个子组件
import Line from '@/views/screen/components/line/index.vue'
import Area from '@/views/screen/components/area/index.vue'
import Bar from './bar/index.vue'
//引入中间两个子组件
//引入右侧三个子组件
import Pie from '@/views/screen/components/pie/index.vue'
import Table from '@/views/screen/components/table/index.vue'
import { ElNotification } from 'element-plus';
import { POPPER_CONTENT_INJECTION_KEY } from 'element-plus'
import { ref, onMounted } from 'vue'
import useLayOutSettingStore from '@/store/modules/setting';
import useLayOutRoomStore from '@/store/modules/room';
let times = ['9:00', '10:00', '11:00', '12:00']
let checkeds = ref([false, false, false, true]);
let roomStore = useLayOutRoomStore();
let settingStore = useLayOutSettingStore();
let powerOn = ref(false);
//获取数据大屏展示内容盒子的DOM元素
interface RoomNode {
  powerOnTime: string,
  speed: string,
  temperature: string,
  mode: string,
  powerOn: string,
  powerOnHours: string,

}
let roominfo = ref<RoomNode>();
let screen = ref()
let modeinfo = ref(false);
let temperatureinfo = ref(20)
const temperaturechage = (num: any) => {
  temperatureinfo.value += num
}
let speedinfo = ref(1)
const speedchage = (key: any) => {
  speedinfo.value = key;
}
const modechange = () => {
  modeinfo.value = !modeinfo.value;
}
const powerOnSelect = () => {
  powerOn.value = !powerOn.value;
}
onMounted(() => {
  settingStore.generalControl = '返回';
  screen.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`
  getRoomInfo();
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
const getRoomInfo = async () => {
  roominfo.value = {
    powerOnTime: '6:00',
    speed: '1',
    temperature: '11',
    mode: '1',
    powerOn: '1',
    powerOnHours: '6',
  }
  // try {
  //   let arr: string[] = roomStore.storeyRoomID.split(" ");
  //   let result = await reqGetStoreyRoom(arr[0],arr[0]);
  //   roominfo.value = result.roominfo;
  // } catch (error) {
  //   ElNotification({
  //     type: 'error',
  //     message: "获取房间信息失败"
  //   })
  // }

}
</script>

<style scoped lang="scss">
.container {
  width: 100vw;
  height: 100vh;
  background: url(@/views/screen/images/bg.png) no-repeat;
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

    .storeyRoom {
      position: absolute;
      /* 或者使用 relative，但绝对定位在这里更直观 */
      top: 5px;
      left: 5px;
      font-size: 30px;
      color: rgb(108, 220, 243);
    }

    .bottom {
      display: flex;
      margin-top: 30px;

      .right {
        flex: 1;
        display: flex;
        flex-direction: column;
        margin-left: 40px;
        height: 1040px;

        .bar {
          flex: 1.2;

        }

        .table {
          // color: red;
          flex: 2;
        }
      }

      .left {
        flex: 1;
        // height: 1040px;
        display: flex;
        flex-direction: column;
        margin-right: 40px;
        // align-items: center;
        // justify-content: center;

        .line {
          // background-color: red;

          flex: 1;
        }

        .area {
          flex: 1;
        }

      }

      .center {
        flex: 1.5;
        display: flex;
        flex-direction: column;
        justify-content: center;

        .centertop {
          // background-color: red;
          flex: 2;
          display: flex;
          width: 100%;
          // align-items: center;
          justify-content: center;
          // gap: 20px;
          background: url(@/views/screen/images/u640.svg) no-repeat center;
          background-size: cover;
          margin-top: 20px;

          .btn {
            gap: 75px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background: url(@/views/screen/images/u641.png) no-repeat;
            background-size: cover;
            width: 150px;
            height: 150px;
            margin: 60px 10px;
            // background-color: red;

            // margin-top: 100px;
            .el-button {
              font-size: 36px;
              padding: 10px 20px;
              margin-top: 95px;
              font-weight: 550;

            }

            // }
            .highlighted {
              color: yellow;
            }

            span {
              font-size: 23px;
              color: white;
            }
          }

          .img {
            max-width: 95%;
            height: auto;
          }
        }



        .centerbottom {
          // background-color: blue;
          // background-color: red;
          display: flex;
          flex: 4;
          width: 101%;
          // height: 100%;
          flex-direction: column;
          background: url(@/views/screen/images/u670.svg) no-repeat center;
          background-size: cover;
          padding: 20px;
          // justify-content: center;
          align-content: center;
          // height: 700px;
          // margin-left: 30px;

          .bottomtop {
            // background-color: red;
            display: flex;
            justify-content: center;
            flex: 0.2;
            background: url(@/views/screen/images/u9.png);
            background-size: 100% 100%;
            // height: 90px;
            // width: 800px;

            span {
              margin-top: 10px;
              font-size: 30px;
              color: white;
              font-weight: bold;
            }

          }

          .bottomlow {
            background: url(@/views/screen/images/login.svg) no-repeat center;
            background-size: 100% 100%;
            // height: auto;
            // background-color: aquamarine;
            // display: flex;
            // flex: 1;
            // height: 300px;
            display: flex;
            flex-direction: column;
            flex: 2;

            .b1 {
              flex: 1;
              display: flex;
              justify-content: center;
              // align-content: center;
              // padding-bottom: 30px;

              .poweron {
                width: 65px;
                height: 65px;
                margin: 30px;
              }

              img {
                margin-top: 40px;
                width: 50px;
                height: 50px;
                margin-left: 30px;
                margin-right: 30px;
              }
            }

            .b2 {
              flex: 1;
              display: flex;
              justify-content: center;
              gap: 10px;

              .el-button {
                border-radius: 8px;
                width: 95px;
                height: 45px;
                background-color: blue;
                margin-top: 30px;

                span {
                  color: white;
                  font-size: 26px;
                  font-weight: 500;
                }

              }


              .highlighted {
                background-color: #15c50b;
              }
            }

            .b3 {
              flex: 1;
              display: flex;
              justify-content: center;
              gap: 30px;
              padding-top: 10px;
              // align-content: center;

              span {
                color: white;
                font-size: 55px;
                font-weight: bold;
              }

              .add {
                display: flex;
                flex-direction: column;
                gap: 10px;

                img {
                  width: 40px;
                  height: auto;
                }

              }
            }

            .b4 {
              flex: 1.8;
              display: flex;
              justify-content: center;
              // gap: 30px;
              // background-color: red;
              flex-wrap: wrap;

              .time {
                margin-left: 20px;
                // background-color: #15c50b;
                display: flex;
                justify-content: center;
                align-content: center;

                .hide_input {
                  position: relative !important;
                }

                //修改控件自带的css
                .el-button .el-date-editor {
                  position: absolute; //绝对定位
                  top: 0;
                  left: 0;
                  opacity: 0; //设置完全透明
                }

                // gap: 20px;
                .el-button {
                  border-radius: 10px;
                  width: 110px;
                  height: 48px;
                  // background-color: blue;
                  background: linear-gradient(to top, #19597a, #1080b5, #079fee);

                  span {
                    color: white;
                    font-size: 20px;
                    font-weight: 500;
                  }
                }

                .to {
                  margin: 10px 5px;
                  color: white;
                  font-size: 20px;
                  font-weight: bold;
                }

                input {
                  margin-top: 12px;
                }

                label {
                  margin-top: 12px;
                  color: white;
                  font-size: 18px;
                }


              }
            }

          }

          // .img2 {
          //   width: 90%;
          //   height: 600px;
          // }
        }
      }
    }
  }
}
</style>
