<template>
  <div class="box6">
    <div class="title">
      <p>耗能统计图</p>
    </div>
    <!-- 图形图标的容器 -->
    <div class="charts" ref="charts"></div>
  </div>
</template>
<script setup lang="ts">
import * as echarts from 'echarts'
import { ref, onMounted } from 'vue'
import { reqEnergyArea } from '@/api/screen/index.ts';
let data = ref([]);
//获取DOM节
const getHasUser = async () => {
  try {
    let result = await reqEnergyArea();
    data.value = result.energy;
  } catch (error) {
  }
}
//获取DOM节点
let charts = ref()
//组件挂载完毕
onMounted(() => {
  // getHasUser();
  //一个容器可以同时展示多种类型的图形图标
  let mychart = echarts.init(charts.value)
  //设置配置项
  mychart.setOption({

    title: {
      text: '过去 vs 实时',
      left: 'center'
    },
    legend: {
      data: ['过往', '实时'],
      bottom: 0
    },

    grid: {
      left: "0%",
      top: "15%",
      right: "4%",
      bottom: "4%",
      containLabel: true
    },
    xAxis: {
      type: 'category',
      splitLine: {
        show: true,
        lineStyle: {
          color: 'rgba(108,128,151,30%)'
        }
      },
      boundaryGap: false,
      axisTick: { show: false },
      axisLine: { onZero: false, lineStyle: { color: '#fff' } },
      data: ['6.1', '6.7', '6.14', '6.22', '6.30', '7.1', '7.7', '7.14', '7.25', '7.31', '8.1', '8.7', '8.14', '8.25', '8.31', '9.1', '9.7', '9.14', '9.22']
    },

    yAxis: [{ // 纵轴标尺固定
      type: 'value',
      splitLine: {
        show: true,
        lineStyle: {
          color: 'rgba(108,128,151,30%)'
        }
      },
      scale: true,
      max: 1500,
      min: 0,
      splitNumber: 5,
      boundaryGap: [0.9, 0.9],
    }],

    series: [
      {
        name: '过往',
        type: 'line',
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(54,235,201,68%)' },
              // {offset: 0.5, color: '#888'},
              { offset: 1, color: 'rgba(38,139,255,60%)' },
            ])
          }
        },
        stack: '总量',
        areaStyle: {

        },
        emphasis: {
          focus: 'series'
        },
        data: [120, 132, 301, 334, 290, 330, 320, 332, 390, 430, 430, 432, 490, 430, 420, 432, 430, 330, 300],
        smooth: true,
      },
      {
        name: '实时',
        type: 'line',
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(54,126,235,89%)' },
              { offset: 1, color: 'rgba(38,139,255,60%)' },
              // { offset: 1, color: 'rgb(24,130,255)' }
            ])
          }
        },
        stack: '总量',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: [120, 332, 401, 334, 590, 330, 420, 432, 490, 430, 420, 432, 590, 530, 520, 532, 590, 530, 520],
        smooth: true
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
  background: url(@/views/screen/images/Group11.png) no-repeat;
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;

  .title {
    flex: 0.9;
    // margin-left: 150px;
    display: flex;
    justify-content: center;
    // background-color: #1580dc;
    background: url(@/views/screen/images/Group17.png) no-repeat center;
    background-position: bottom;
    background-size: 100% 70%;
    // align-items: flex-end;

    img {
      height: 20px;
      width: auto;
    }

    p {
      margin-top: 30px;
      letter-spacing: 10px;
      color: #fafbfb;
      font-size: 30px;
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
