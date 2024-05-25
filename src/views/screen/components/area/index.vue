<template>
  <div class="box6">
    <div class="title">
      <p>耗能统计图</p>
      <img src="../../images/dataScreen-title.png" alt="" />
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
      boundaryGap: false,
      axisTick: { show: false },
      axisLine: { onZero: false, lineStyle: { color: '#fff' } },
      splitLine: { show: false },
      data: ['6.1', '6.7', '6.14', '6.22', '6.30', '7.1', '7.7', '7.14', '7.25', '7.31', '8.1', '8.7', '8.14', '8.25', '8.31', '9.1', '9.7', '9.14', '9.22']
    },

    yAxis: [{ // 纵轴标尺固定
      type: 'value',
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
        stack: '总量',
        itemStyle: {
          normal: {
            color: '#43bf96'
          }
        },
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
  background: url(../../images/dataScreen-main-cb.png) no-repeat;
  background-size: 100% 100%;
  margin: 20px 0px;

  .title {
    margin-left: 5px;

    p {
      color: white;
      font-size: 20px;
    }
  }

  .charts {
    height: calc(100% - 30px);
  }
}
</style>
