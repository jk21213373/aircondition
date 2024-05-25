<template>
  <div class="box6">
    <div class="title">
      <p>实时耗能曲线</p>
      <img src="../../images/dataScreen-title.png" alt="" />
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

    xAxis: {
      type: 'category',
      data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '实时数据',
        type: 'line',
        data: [10, 22, 28, 33, 40, 42, 48, 53, 59, 61, 68, 75, 78, 82, 88, 91, 94, 98, 102, 106, 113, 118, 125, 130],
        lineStyle: {
          color: 'blue' // 蓝色实线  
        }
      },
      {
        name: '过往数据',
        type: 'line',
        data: [8, 18, 21, 27, 33, 35, 39, 42, 46, 48, 52, 56, 59, 63, 67, 71, 74, 78, 81, 85, 90, 94, 99, 104],
        lineStyle: {
          type: 'dashed' // 黄色虚线  
        },
        itemStyle: {
          color: 'yellow' // 线的颜色为黄色  
        }
      }
    ]
  })
})

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
