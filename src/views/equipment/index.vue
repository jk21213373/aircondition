<template>
    <div class="layout_container">
        <div class="layout_slider">
            <div class="top">
                <el-input style="margin-bottom:10px" prefix-icon="el-icon-sear" placeholder="请输入搜索内容" clearable>
                    <template #append>
                        <el-button class="btn"><el-icon>
                                <search />
                            </el-icon></el-button>
                    </template>
                </el-input>
            </div>
            <div class="tree">
                <el-tree style="max-width: 600px" :data="data" :props="defaultProps" @node-click="handleNodeClick" />
            </div>
        </div>
        <div class="layout_main">
            <div class="card" v-for="(forecast, index) in forecasts" :key="index" @click="handleCardClick(index)">
                <div class="bg">
                    <div class="c1">
                        <span class="zi">2001房间设备101</span>
                    </div>
                    <div class="c2">
                        <span class="feng">风速</span>
                        <el-button type="text" v-for="(speed, key) in ['低速', '中速', '高速']" :key="key"
                            :class="{ highlighted: key == forecast.speed }">
                            {{ speed }}
                        </el-button>
                    </div>
                    <div class="c3">
                        <span class="moshi">模式</span>
                        <el-icon v-if="forecast.mode">
                            <svg-icon name="snowflak" color='#808080'></svg-icon>
                            <svg-icon name="sun" color='red'></svg-icon>
                        </el-icon>
                        <el-icon v-else>
                            <svg-icon name="snowflak" color='red'></svg-icon>
                            <svg-icon name="sun" color='#808080'></svg-icon>
                        </el-icon>
                        <el-icon :style="{ 'color': forecast.powerOn ? 'red' : '#808080' }">
                            <SwitchButton />
                        </el-icon>
                    </div>
                    <div class="c4">
                        <span>当前温度</span>
                        <span> {{ forecast.temperature }}°C</span>
                    </div>
                    <div class="c5">
                        <Line></Line>
                    </div>
                </div>
                <div :class="{ blob: forecast.powerOn }"></div>
            </div>
        </div>

    </div>
</template>
<script setup lang="ts">
import { defineComponent, ref, onMounted, reactive, nextTick } from 'vue';
import { reqNodeTreeInfo, reqNodeInfo, postSpeedInfo, postModeInfo, postTempInfo } from '@/api/equipment/index.ts';
import { ElNotification } from 'element-plus';
import useLayOutSettingStore from '@/store/modules/setting';
import Line from './line/index.vue'
import { tourEmits } from 'element-plus';
let settingStore = useLayOutSettingStore();
interface Tree {
    label: string
    children?: Tree[]
}
interface Node {
    speed: number,
    temperature: number,
    mode: number,
    powerOn: number,
}


let data = ref<Tree[]>();
const forecasts = ref<Node[]>();
const handleNodeClick = (data: Tree) => {
    console.log(data)
}
onMounted(() => {
    getNodeTree();
    getNode();
})
const getNode = async () => {
    let result = await reqNodeInfo();
    forecasts.value = [{
        speed: 1,
        temperature: 20,
        mode: 0,
        powerOn: 1,
    }, {
        speed: 1,
        temperature: 20,
        mode: 0,
        powerOn: 0,
    }, {
        speed: 1,
        temperature: 20,
        mode: 0,
        powerOn: 1,
    }, {
        speed: 1,
        temperature: 20,
        mode: 2,
        powerOn: 1,
    }, {
        speed: 1,
        temperature: 20,
        mode: 2,
        powerOn: 1,
    }, {
        speed: 1,
        temperature: 20,
        mode: 2,
        powerOn: 1,
    }, {
        speed: 1,
        temperature: 20,
        mode: 2,
        powerOn: 1,
    }, {
        speed: 1,
        temperature: 20,
        mode: 2,
        powerOn: 1,
    }, {
        speed: 1,
        temperature: 20,
        mode: 2,
        powerOn: 1,
    }, {
        speed: 1,
        temperature: 20,
        mode: 2,
        powerOn: 1,
    }, {
        speed: 1,
        temperature: 20,
        mode: 2,
        powerOn: 1,
    }, {
        speed: 1,
        temperature: 20,
        mode: 2,
        powerOn: 1,
    }, {
        speed: 1,
        temperature: 20,
        mode: 2,
        powerOn: 1,
    }, {
        speed: 1,
        temperature: 20,
        mode: 2,
        powerOn: 1,
    }, {
        speed: 1,
        temperature: 20,
        mode: 2,
        powerOn: 1,
    }, {
        speed: 1,
        temperature: 20,
        mode: 2,
        powerOn: 1,
    }, {
        speed: 1,
        temperature: 20,
        mode: 2,
        powerOn: 1,
    }, {
        speed: 1,
        temperature: 20,
        mode: 2,
        powerOn: 1,
    },]
    // ...更多天气数据]
}

const speedSelect = async (speed: string) => {
    let result = await postSpeedInfo(speed);
}
const modeSelect = async (mode: string) => {
    let result = await postModeInfo(mode);
}
const tempSelect = async (num: number) => {
    let result = await postTempInfo(num);
}


const getNodeTree = async () => {
    // let result = await reqNodeTreeInfo();
    data.value = [{
        label: 'Level one 1',
        children: [
            {
                label: 'Level two 1-1',
                children: [
                    {
                        label: 'Level three 1-1-1',
                    },
                ],
            },
        ],
    },
    {
        label: 'Level one 2',
        children: [
            {
                label: 'Level two 2-1',
                children: [
                    {
                        label: 'Level three 2-1-1',
                    },
                ],
            },
            {
                label: 'Level two 2-2',
                children: [
                    {
                        label: 'Level three 2-2-1',
                    },
                ],
            },
        ],
    },
    {
        label: 'Level one 3',
        children: [
            {
                label: 'Level two 3-1',
                children: [
                    {
                        label: 'Level three 3-1-1',
                    },
                ],
            },
            {
                label: 'Level two 3-2',
                children: [
                    {
                        label: 'Level three 3-2-1',
                    },
                ],
            },
        ],
    }]
}
const defaultProps = {
    children: 'children',
    label: 'label',
}

// 示例数据，实际中可能从API获取



const handleCardClick = (index: number) => {
    // 处理卡片点击事件，这里只是简单打印索引
    console.log('Clicked card:', index);
};
// const changeSpeed = (index: number, speed: string) => {
//     // 更改风速模式
//     forecasts.value[index].speed = speed;
//     //这里可以添加逻辑来发送请求更新后端数据或执行其他操作
// };
</script>

<style scoped lang="scss">
.layout_container {
    width: 100%;
    height: 100vh;
    display: flex;

    .layout_slider {
        // background-color: red;
        // color: red;
        width: $base-menu-tree-width;
        height: 100vh;
    }

    .layout_main {
        // background-color: black;
        // color: black;
        width: calc(100% - $base-menu-tree-width);
        height: 100vh;
        overflow: auto;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
        gap: 20px;
        padding: 20px;

        .card {
            position: relative;
            width: 200px;
            height: 250px;
            border-radius: 14px;
            z-index: 1111;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            box-shadow: 20px 20px 60px #bebebe, -20px -20px 60px #ffffff;

            .bg {
                position: absolute;
                top: 5px;
                left: 5px;
                width: 190px;
                height: 240px;
                z-index: 2;
                background: rgba(255, 255, 255, .95);
                backdrop-filter: blur(24px);
                border-radius: 10px;
                overflow: hidden;
                outline: 2px solid white;
                display: flex;
                flex-direction: column;

                .c1 {
                    display: flex;
                    // background: blue;
                    flex: 1;
                    justify-content: center;
                    align-items: center;
                    // background: linear-gradient(to right, #66648e, #5c5c87);
                    // border-radius: 14px;
                    // margin: 5px;

                    .zi {
                        margin: 5px;
                        font-size: 14px;
                        color: black;
                    }
                }

                .c2 {
                    display: flex;
                    // background: green;
                    flex: 1;
                    justify-content: center;
                    align-items: center;

                    .highlighted {
                        color: yellow;
                    }

                    .feng {
                        margin: 5px;
                        margin-right: 20px;
                    }
                }

                .c3 {
                    justify-content: center;
                    align-items: center;
                    display: flex;
                    // background: yellow;
                    flex: 1;
                    gap: 38px;

                    .el-icon {
                        gap: 15px;
                    }
                }

                .c4 {
                    display: flex;
                    // background: blue;
                    flex: 1;
                    padding: 10px;
                    align-items: center;
                    gap: 55px;
                    justify-content: center;
                }

                .c5 {
                    // background: pink;
                    flex: 1.5;
                }
            }
        }

        .blob {
            position: absolute;
            z-index: 1;
            top: 50%;
            left: 50%;
            width: 150px;
            height: 150px;
            border-radius: 50%;
            background-color: #183a5d;
            opacity: 1;
            filter: blur(12px);
            animation: blob-bounce 5s infinite ease;
        }

        @keyframes blob-bounce {
            0% {
                transform: translate(-100%, -100%) translate3d(0, 0, 0);
            }

            25% {
                transform: translate(-100%, -100%) translate3d(100%, 0, 0);
            }

            50% {
                transform: translate(-100%, -100%) translate3d(100%, 100%, 0);
            }

            75% {
                transform: translate(-100%, -100%) translate3d(0, 100%, 0);
            }

            100% {
                transform: translate(-100%, -100%) translate3d(0, 0, 0);
            }
        }
    }
}

.btn {
    background: #fff;
    border-color: #ccccd8;
    // outline: none;
    cursor: pointer;

}

.el-button:hover {
    border-color: #9c9ca1 !important;
}
</style>