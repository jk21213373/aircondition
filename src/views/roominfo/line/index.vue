<template>
  <div class="box6">
    <div class="title">
      <!-- <img src="@/views/screen/images/right.png" alt="" /> -->
      <p>实时耗能曲线</p>
      <!-- <img src="@/views/screen/images/left.png" alt="" /> -->
    </div>
    <!-- 图形图标的容器 -->
    <div class="charts" ref="charts"></div>
  </div>
</template>
<script setup lang="ts">
import * as echarts from 'echarts'
import { ref, onMounted } from 'vue'
import { reqEnergyLine } from '@/api/screen/index.ts';

let data = ref([]);
//获取DOM节点
let charts = ref()

const getHasUser = async () => {
  try {
    let result = await reqEnergyLine();
    data.value = result.energy;
  } catch (error) {
  }
}
//组件挂载完毕
onMounted(() => {
  // getHasUser();
  //一个容器可以同时展示多种类型的图形图标
  let mychart = echarts.init(charts.value)
  //设置配置项
  mychart.setOption({
    tooltip: {
      trigger: 'axis',
      axisPointer: {            // 坐标轴指示器，坐标轴触发有效
        type: 'cross'
      }
    },
    legend: {
      data: ['实时', '过往'],
      textStyle: {
        color: '#ffffff',
        fontszie: 20,
      },
      padding: 20,
      // left: 'center',
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00']
      }
    ],
    yAxis: [
      {
        type: 'value',
        splitLine: {
          show: true,
          lineStyle: {
            color: 'rgba(108,128,151,30%)'
          }
        },
        max: 90
      }
    ],
    series: [
      {
        name: '实时',
        type: 'line',
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(54,235,201,68%)' },
              // {offset: 0.5, color: '#888'},
              { offset: 1, color: 'rgba(54,235,201,68%)' },
            ])
          }
        },
        stack: 'Total',
        emphasis: {
          focus: 'series'
        },
        data: [0, 0, 0, 0, 0, 0, 40, 43, 60, 65, 80, 90, 60, 65, 80, 68, 63, 60, 40, 50, 30, 0],
        smooth: true
      },
      {
        name: '过往',
        type: 'line',
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(38,139,255,60%)' },
              { offset: 1, color: 'rgba(38,139,255,60%)' },
              // { offset: 1, color: 'rgb(24,130,255)' }
            ])
          }
        },
        // stack: 'Total',
        label: {
          show: true,
          position: 'top'
        },
        emphasis: {
          focus: 'series'
        },
        data: [0, 0, 0, 0, 0, 0, 25, 65, 65, 60, 65, 68, 40, 45, 62, 65, 80, 61, 25, 27, 60, 0],
        smooth: true
      }
    ]
  })
})

</script>

<style scoped lang="scss">
.box6 {
  width: 100%;
  height: 100%;
  background: url(@/views/screen/images/Group11.png) no-repeat;
  background-size: 100% 100%;
  // margin: 20px 0px;
  display: flex;
  flex-direction: column;
  margin-top: 20px;

  .title {
    flex: 0.9;
    // margin-left: 150px;
    display: flex;
    justify-content: center;
    align-content: center;
    background-color: #1580dc;
    background: url(@/views/screen/images/Group17.png) no-repeat center;
    background-size: 100% 70%;
    background-position: bottom;
    // align-items: flex-end;

    p {
      margin-top: 30px;
      letter-spacing: 10px;
      color: #fafafa;
      font-size: 28px;
      margin-inline: 5px;
      font-weight: 500;
      text-shadow: 0 0 10px rgb(158, 209, 227), 0 0 20px rgb(158, 204, 220), 0 0 30px rgb(133, 178, 193), 0 0 40px rgb(119, 187, 214), 0 0 50px rgb(120, 193, 222), 0 0 60px rgb(105, 174, 201);
    }
  }

  .charts {
    flex: 5;
    height: calc(100% - 30px);
  }
}
</style>
