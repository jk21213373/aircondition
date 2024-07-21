<template>
  <div class="box6">
    <div class="title">
      <p>设备状态统计</p>
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
  getHasUser()
  //一个容器可以同时展示多种类型的图形图标
  let mychart = echarts.init(charts.value)
  //设置配置项
  mychart.setOption({

    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
      data: [

        'Union Ads',
        'Video Ads',
        'Baidu',
        'Google',

      ]
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        selectedMode: 'single',
        radius: [0, '30%'],
        label: {
          position: 'inner',
          fontSize: 14
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 775, name: '运行:80' },
          { value: 679, name: '未运行:98', selected: true }
        ]
      },
      {
        name: 'Access From',
        type: 'pie',
        radius: ['45%', '60%'],
        labelLine: {
          length: 30
        },
        label: {
          formatter: '{b|{b}：}{c}  {per|{d}%}  ',
          backgroundColor: '#F6F8FC',
          borderColor: '#8C8D8E',
          borderWidth: 1,
          borderRadius: 4,

          rich: {
            a: {
              color: '#6E7079',
              lineHeight: 22,
              align: 'center'
            },
            hr: {
              borderColor: '#8C8D8E',
              width: '100%',
              borderWidth: 1,
              height: 0
            },
            b: {
              color: '#4C5058',
              fontSize: 14,
              fontWeight: 'bold',
              lineHeight: 33
            },
            per: {
              color: '#fff',
              backgroundColor: '#4C5058',
              padding: [3, 4],
              borderRadius: 4
            }
          }
        },
        data: [
          { value: 234, name: '关机:70' },
          { value: 147, name: '故障:10' },
          { value: 135, name: '正常:88' },
          { value: 102, name: '效率低:10' }
        ]
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
  display: flex;
  flex-direction: column;

  .title {
    flex: 1;
    // margin-left: 150px;
    display: flex;
    justify-content: center;
    // background-color: #1580dc;
    background: url(../../images/Group17.png) no-repeat center;

    // align-items: flex-end;

    img {
      height: 20px;
      width: auto;
    }

    p {
      margin-top: 20px;
      letter-spacing: 10px;
      color: #fdfdfd;
      font-size: 26px;
      margin-inline: 5px;
      font-weight: 500;
      text-shadow: 0 0 10px rgb(158, 209, 227), 0 0 20px rgb(158, 204, 220), 0 0 30px rgb(133, 178, 193), 0 0 40px rgb(119, 187, 214), 0 0 50px rgb(120, 193, 222), 0 0 60px rgb(105, 174, 201);
    }
  }

  .charts {
    flex: 5;
    height: calc(100% - 65px);
  }
}
</style>
