<template>
  <div class="box6">
    <div class="title">
      <p>时间频次统计</p>
      <img src="@/views/screen/images/dataScreen-title.png" alt="" />
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
      type: 'value'
    },
    series: [
      {
        data: [804, 905, 1206, 901, 402, 403, 104, 1005, 201, 502, 603, 701, 802, 603, 1101, 505, 504, 606, 703, 1006],
        type: 'bar'
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
  background: url(@/views/screen/images/dataScreen-main-cb.png) no-repeat;
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
