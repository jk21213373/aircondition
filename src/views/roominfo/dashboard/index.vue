<template>
    <div class="box6">

        <!-- 图形图标的容器 -->
        <div class="charts" ref="charts"></div>
    </div>
</template>
<script setup lang="ts">
import * as echarts from 'echarts'
import { ref, onMounted, defineExpose } from 'vue'
// let data = ref([]);
//获取DOM节点
// let temperature = ref<number>();
let charts = ref()
const changeTemperature = (data = 0) => {
    let mychart = echarts.init(charts.value, null, {
        width: 250,
        height: 250
    })
    //设置配置
    // temperature.value = data;
    mychart.setOption({
        // grid: {
        //     left: '3%',
        //     right: '4%',
        //     bottom: '13%',
        //     // containLabel: true
        // },
        // backgroundColor: "#0b3c66",
        series: [
            {
                name: '实时数据',
                type:
                    'gauge',
                center: [
                    '50%',
                    '55%'
                ],
                radius: '90%',
                startAngle: 220,
                endAngle: -40,
                min: 0,
                max: 40,
                axisLine: {
                    show: true,
                    lineStyle: {
                        width: 3,
                        color: [
                            [
                                1,
                                new echarts.graphic.LinearGradient(
                                    0, 0, 1, 0, [
                                    {
                                        offset: 0,
                                        color: 'rgba(22, 148, 255, 0.1)',
                                    },
                                    {
                                        offset: 1,
                                        color: 'rgba(63, 250, 250, 0.9)',
                                    }
                                ]
                                )
                            ],
                        ]
                    }
                },
                axisLabel: {
                    show: 0
                },
                axisTick: {
                    lineStyle: {
                        color: 'rgba(63,250,250,0.7)',
                        width: 1
                    },
                    length: 5
                },
                splitLine: {
                    length: 4,
                    lineStyle: {
                        color: 'rgba(63,250,250,0.8)',
                        width: 3
                    }
                },
            },
            // 外围刻度（第二层）
            {
                type: 'gauge',
                center: [
                    '50%',
                    '55%'
                ],
                radius: '85%', // 1行3个
                min: 0,
                max: 40,
                startAngle: 220,
                endAngle: -40,
                axisLine: { // 坐标轴线
                    lineStyle: { // 属性lineStyle控制线条样式
                        color: [
                            [
                                1,
                                new echarts.graphic.LinearGradient(
                                    0, 0, 1, 0, [
                                    {
                                        offset: 0,
                                        color: '#32abff',
                                    },
                                    {
                                        offset: 1,
                                        color: 'rgba(63, 250, 250, 0.9)',
                                    }
                                ]
                                )
                            ],
                        ],
                        fontSize: 20,
                        width: 2,
                        opacity: 1, //刻度背景宽度
                    }
                },
                splitLine: {
                    show: false
                },
                axisLabel: {
                    show: false
                },
                axisTick: {
                    show: false
                },
            },
            // 外围刻度（中间有背景颜色那块，包括里面的刻度）
            {
                type: 'gauge',
                center: [
                    '50%',
                    '55%'
                ],
                radius: '85%', // 1行3个
                splitNumber: 10,
                min: 0,
                max: 40,
                startAngle: 220,
                endAngle: -40,
                //分隔线样式
                axisTick: {
                    lineStyle: {
                        color: 'rgba(63,250,250,0.8)',
                        width: 1
                    },
                    length: 4
                },
                //刻度样式
                axisLine: {
                    show: true,
                    lineStyle: {
                        width: 50,
                        color: [
                            [
                                1,
                                new echarts.graphic.LinearGradient(
                                    0, 0, 1, 0, [
                                    {
                                        offset: 0,
                                        color: 'rgba(0, 132, 255, 0.2)',
                                    },
                                    {
                                        offset: 1,
                                        color: 'rgba(63, 250, 250, 0.4)',
                                    }
                                ]
                                )
                            ],
                        ]
                    }
                },
                //整数分隔线
                splitLine: {
                    show: true,
                    length: 3,
                    lineStyle: {
                        color: 'rgba(63, 250, 250, 0.8)',
                        width: 2
                    }
                },
                //刻度数字
                axisLabel: {
                    show: true,
                    distance: 1,
                    textStyle: {
                        color: 'rgba(63, 250, 250, 0.8)',
                        fontSize: '10',
                        fontWeight: 'bold'
                    }
                },
            },
            //从外数第三条线
            {
                type: 'gauge',
                center: [
                    '50%',
                    '55%'
                ],
                radius: '65%', // 1行3个
                splitNumber: 10,
                min: 0,
                max: 40,
                startAngle: 220,
                endAngle: -40,
                axisLine: { // 坐标轴线
                    lineStyle: { // 属性lineStyle控制线条样式
                        color: [
                            [
                                1,
                                new echarts.graphic.LinearGradient(
                                    0, 0, 1, 0, [
                                    {
                                        offset: 0,
                                        color: 'rgba(66, 180, 255, 0.09)',
                                    },
                                    {
                                        offset: 1,
                                        color: 'rgba(63, 250, 250, 0.9)'
                                    }
                                ]
                                )
                            ],
                        ],
                        fontSize: 15,
                        width: 2,
                        opacity: 1, //刻度背景宽度
                    }
                },
                splitLine: {
                    show: false
                },
                axisLabel: {
                    show: false
                },
                pointer: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                detail: {
                    show: 0
                }
            },
            // 内侧指针、数值显示
            {
                name: '',
                center: [
                    '50%',
                    '50%'
                ],
                type: 'gauge',
                radius: '74%', // 1行3个
                splitNumber: 10,
                min: 0,
                max: 40,
                startAngle: 220,
                endAngle: -40,
                axisLine: {
                    show: true,
                    lineStyle: {
                        width: 50,
                        color: [
                            [
                                1,
                                new echarts.graphic.LinearGradient(
                                    0, 0, 1, 0, [
                                    {
                                        offset: 0,
                                        color: 'rgba(0, 199, 187, 0)',
                                    },
                                    {
                                        offset: 1,
                                        color: 'rgba(0, 199, 187, 0)',
                                    }
                                ]
                                )
                            ],
                        ]
                    }
                },
                axisTick: {
                    show: 0,
                },
                splitLine: {
                    show: 0,
                },
                axisLabel: {
                    show: 0
                },
                pointer: {
                    show: true,
                    length: '90%',
                    width: 5,
                    color: '#9bd6ff'

                },
                data: [
                    {
                        value: data,
                        name: '温度(℃)',
                        title: {
                            offsetCenter: ['0%', '50%'],
                            fontSize: 25,
                            color: '#4fe8d6'
                        },
                        detail: {
                            offsetCenter: ['0%', '20%'],
                            valueAnimation: true,
                            fontSize: 32,
                            color: '#4fe8d6'
                        }
                    }
                ]
            }
        ]
    });
    // console.log(temperature.value)
}
// 主动暴露childMethod方法
defineExpose({ changeTemperature })

//组件挂载完毕
// onMounted(() => {
//     // changeTemperature();
//     // getHasUser();
//     //一个容器可以同时展示多种类型的图形图标
//     // let mychart = echarts.init(charts.value, null, {
//     //     width: 200,
//     //     height: 200
//     // })
//     changeTemperature();
// })

</script>

<style scoped lang="scss">
.box6 {
    width: 50%;
    height: 80%;
    justify-content: center;
    align-content: center;
    // background-color: aqua;
    padding-left: 120px;
    // display: flex;
    // background-color: aqua;
    // .charts {
    //     margin-left: 75px;
    //     margin-top: 30px;
    //     // margin-bottom: 20px;
    // }
}
</style>
