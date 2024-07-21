<template>
    <div class="container">
        <!-- 数据大屏展示内容区域 -->
        <div class="screen" ref="screen">
            <!-- 数据大屏顶部 -->
            <div class="top">
                <Top />
            </div>
            <div class="bottom">
                <Display></Display>
                <Control></Control>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
//引入顶部的子组件
import Top from './top/index.vue'
import Control from './control/index.vue'
import Display from './display/index.vue'
import Line from '@/views/screen/components/line/index.vue'
import Area from '@/views/screen/components/area/index.vue'
import Bar from '@/views/screen/components/bar/index.vue'
import School from '@/views/screen/components/school/index.vue'
import Equipment from '@/views/screen/components/equipment/index.vue'
import Pie from '@/views/screen/components/pie/index.vue'
import Table from '@/views/screen/components/table/index.vue'
import Time from '@/views/screen/components/time/index.vue'
import useLayOutSettingStore from '@/store/modules/setting';
let settingStore = useLayOutSettingStore();
import useUserStore from '@/store/modules/user';
let useStore = useUserStore();
//获取数据大屏展示内容盒子的DOM元素
let screen = ref()
onMounted(() => {
    settingStore.generalControl = '数据大屏';
    screen.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`
})
//定义大屏缩放比例
function getScale(w = 1920, h = 1080) {
    const ww = window.innerWidth / w
    const wh = window.innerHeight / h
    return ww < wh ? ww : wh
}
//监听视口变化
window.onresize = () => {
    screen.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`
}
</script>

<style scoped lang="scss">
.container {
    width: 100vw;
    height: 100vh;
    background: url(@/views/screen/images/Group6.png) no-repeat;
    background-size: cover;

    .screen {
        position: fixed;
        width: 1920px;
        height: 1080px;
        left: 50%;
        top: 50%;
        transform-origin: left top;
        background: url(@/views/screen/images/Group6.png) no-repeat;
        background-size: cover;

        .top {
            width: 100%;
            height: 87px;

        }

        .bottom {
            // padding: 15px;

            display: flex;
            // background-color: antiquewhite;
            height: 993px;
            flex-direction: column;

            .display {
                flex: 1;
                // background-color: bisque;
            }

            .control {
                flex: 0.9;
                // background-color: aqua;
            }

        }
    }
}
</style>