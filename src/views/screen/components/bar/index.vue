<template>
  <div class="box6">
    <div class="title">
      <p>房间耗能统计</p>
    </div>
    <!-- 图形图标的容器 -->
    <div class="charts" ref="charts"></div>
  </div>
</template>
<script setup lang="ts">
import * as echarts from 'echarts'
import { ref, onMounted } from 'vue'
import { reqRoomEnergy } from '@/api/screen/index.ts';

let data = ref([]);
//获取DOM节点
const getHasUser = async () => {
  try {
    let result = await reqRoomEnergy();
    data.value = result.energy;
  } catch (error) {
  }
}
//获取DOM节点
let charts = ref()
//组件挂载完毕
onMounted(() => {
  //一个容器可以同时展示多种类型的图形图标
  let mychart = echarts.init(charts.value)
  //设置配置项
  mychart.setOption({

    xAxis: {
      type: 'category',

      data: [804, 905, 1206, 901, 402, 403, 104, 1005, 201, 502, 603, 701, 802, 603, 1101, 505, 504, 606, 703, 1006]
    },
    yAxis: {
      type: 'value',
      splitLine: {
        show: true,
        lineStyle: {
          color: 'rgba(108,128,151,30%)'
        }
      },
    },
    series: [
      {
        data: [1004, 905, 900, 891, 872, 833, 804, 775, 751, 722, 683, 671, 652, 623, 611, 605, 574, 556, 503, 500],
        type: 'bar',
        barMaxWidth: 6,
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0, color: 'rgb(52,220,254)' // 0% 处的颜色
          }, {
            offset: 1, color: '#33cccc' // 100% 处的颜色
          }],
          globalCoord: false // 缺省为 false
        }
      }
    ]
  })
})

//获取DOM节
</script>

<style scoped lang="scss">
.box6 {
  width: 100%;
  height: 100%;
  background: url(../../images/Group11.png) no-repeat;
  background-size: 100% 100%;
  // margin: 20px 0px;
  display: flex;
  flex-direction: column;

  .title {
    flex: 0.9;
    // margin-left: 150px;
    display: flex;
    justify-content: center;
    // background-color: #1580dc;

    background: url(../../images/Group17.png) no-repeat center;
    background-position: bottom;
    // align-items: flex-end;

    img {
      height: 20px;
      width: auto;
    }

    p {
      margin-top: 14px;
      letter-spacing: 10px;
      color: #f7fbfd;
      font-size: 26px;
      margin-inline: 5px;
      font-weight: 500;
      text-shadow: 0 0 10px rgb(158, 209, 227), 0 0 20px rgb(158, 204, 220), 0 0 30px rgb(133, 178, 193), 0 0 40px rgb(119, 187, 214), 0 0 50px rgb(120, 193, 222), 0 0 60px rgb(105, 174, 201);
    }
  }

  .charts {
    flex: 5;
    height: calc(100% - 80px);
  }
}
</style>
