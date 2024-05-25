<template>
    <div class="container">
        <div class="app-container">
            <div class="left">
                <el-input style="margin-bottom:10px" type="text" prefix-icon="el-icon-sear"></el-input>
                <!--树形组件-->
                <Tree></Tree>
            </div>
            <div class="right">
                <!--列表组件-->

                <div class="weather-forecast">
                    <div class="card" v-for="(forecast, index) in forecasts" :key="index"
                        @click="handleCardClick(index)">
                        <div class="day">
                            <span>风速</span>
                            <el-button type="text">低速</el-button>
                            <el-button type="text">中速</el-button>
                            <el-button type="text">高速</el-button>
                        </div>
                        <el-divider border-style="double" />
                        <div class="temperature" style="display: grid;">
                            <div class="first-element">
                                <span>模式</span>
                                <el-icon>
                                    <svg-icon name="snowflak"></svg-icon>
                                </el-icon>
                                <el-icon>
                                    <svg-icon name="sun"></svg-icon>
                                </el-icon>
                            </div>
                            <div class="second-element">
                                <span>当前温度</span>
                                <span> {{ forecast.temperature }}</span>
                            </div>
                        </div>
                        <el-divider border-style="double" />
                        <div class="control-buttons">
                            <el-icon>
                                <SwitchButton />
                            </el-icon>
                            <el-icon>
                                <CaretTop />
                            </el-icon>
                            <el-icon>
                                <CaretBottom />
                            </el-icon>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import Tree from '@/views/tree/index.vue';
import { defineComponent, ref } from 'vue';
const forecasts = ref([
    // 示例数据，实际中可能从API获取
    { day: '星期三', temperature: '0°C', isSunny: true, speed: 'medium' },
    { day: '星期四', temperature: '5°C', isSunny: false, speed: 'low' },
    { day: '星期四', temperature: '5°C', isSunny: false, speed: 'low' },
    { day: '星期四', temperature: '5°C', isSunny: false, speed: 'low' },
    { day: '星期四', temperature: '5°C', isSunny: false, speed: 'low' },
    { day: '星期四', temperature: '5°C', isSunny: false, speed: 'low' },
    { day: '星期四', temperature: '5°C', isSunny: false, speed: 'low' },
    { day: '星期四', temperature: '5°C', isSunny: false, speed: 'low' },
    { day: '星期四', temperature: '5°C', isSunny: false, speed: 'low' },
    { day: '星期四', temperature: '5°C', isSunny: false, speed: 'low' },
    // ...更多天气数据
]);
const handleCardClick = (index: number) => {
    // 处理卡片点击事件，这里只是简单打印索引
    console.log('Clicked card:', index);
};
const changeSpeed = (index: number, speed: string) => {
    // 更改风速模式
    forecasts.value[index].speed = speed;
    //这里可以添加逻辑来发送请求更新后端数据或执行其他操作
};
</script>

<style scoped lang='scss'>
.app-container {
    background: #FFF;
    display: flex;

    .left {
        width: 200px;
        padding: 20px;
        border-right: 1px solid #eaeef4;
    }

    .right {
        flex: 1;
        padding: 10px;
        position: absolute;
        width: calc(100% - 230px);
        left: 230px;
        overflow: auto;

        .weather-forecast {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
        }

        .card {
            background-color: #f5f5f5;
            padding: 10px;
            border-radius: 5px;
            cursor: pointer;

            .day {

                margin-bottom: 0px;
            }

            .temperature {
                font-size: 16px;
                color: #333;

                .first-element {
                    padding: 5px;
                }

                .second-element {
                    padding: 5px;
                }
            }

            .control-buttons {
                display: flex;
                gap: 5px;
            }

            .el-divider--horizontal {
                margin: 10px 0;
                // background-color: black
            }
        }
    }
}
</style>
