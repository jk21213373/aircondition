<template>
    <div class="box5" id="wc">
        <div class="charts" ref="line"></div>
    </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { ref, onMounted, onBeforeUnmount } from 'vue'
//获取图形图标的节点
let line = ref()
// const watchChartWc = new ResizeObserver(() => {
// 	line.resize()
// })
onBeforeUnmount(() => {
    // watchChartWc.unobserve(document.getElementById('wc') ) 
})
onMounted(() => {
    let mycharts = echarts.init(line.value)
    //设置配置项
    mycharts.setOption({
        //标题组件
        //x|y轴
        tooltip: {
            trigger: 'item' // 当鼠标悬浮在某个数据项上时触发
        }
        ,
        xAxis: {
            type: 'category',
            //两侧不留白
            boundaryGap: false,
            //分割线不要
            splitLine: {
                show: false,
            },
            data: ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'],
            //轴线的设置
            axisLine: {
                show: true,
                lineStyle: {
                    color: "#fff",
                    width: 1,
                }

            },
            //刻度
            axisTick: {
                show: true,
            },
        },
        grid: {
            left: "0%",
            top: "0%",
            right: "0%",
            bottom: "-15px",
            containLabel: true
        },
        yAxis: {
            name: '温度',
            min: 15,
            max: 30,

            splitLine: {
                show: false,
            },
            //轴线的设置
            axisLine: {
                show: true,
            },
            //刻度


        },
        //系列
        series: [
            {
                type: 'line',
                data: [20, 20, 23, 25, 26, 26, 26, 26, 26, 27, 27, 28, 28],
                //平滑曲线的设置
                smooth: true,
                //区域填充样式
                areaStyle: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [
                            {
                                offset: 0,
                                color: 'red', // 0% 处的颜色
                            },
                            {
                                offset: 1,
                                color: 'blue', // 100% 处的颜色
                            },
                        ],
                        global: false, // 缺省为 false
                    },
                },
            },
        ],
    })
    // 使用observe开启监听, onObserve可以取消监听
    // watchChartWc.observe(document.getElementById('wc'))
})
</script>

<style scoped lang="scss">
.box5 {
    width: 100%;
    height: 100%;

    // background: url(../../images/dataScreen-main-cb.png) no-repeat;
    .charts {
        height: calc(100% - 5px);
    }
}
</style>