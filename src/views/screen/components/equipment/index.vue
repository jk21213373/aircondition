<template>

    <div class="equipment" @click="roominfo">
        <div class="line"></div>
        <div class="box"></div>
    </div>
</template>

<script setup lang='ts'>
import { useRouter, useRoute } from 'vue-router';
let $router = useRouter();
const roominfo = () => {
    $router.push('/roomcontrol');
}
</script>

<style scoped lang='scss'>
.equipment {
    width: 100%;
    height: 100%;
    display: flex;
    align-content: center;
    justify-content: center;
    flex-direction: column;

    // background-color: red;
    // background: url(../../images/3.jpg) no-repeat;
    // background-size: 100% 100%;
    .line {
        // height: 3px;
        flex: 0.15;
        width: 100%;
        background: url(../../images/Group14.png) no-repeat center;
        background-position: top;
        background-size: 97% 100%;
    }

    .box {
        flex: 10;
        width: 100%;
        height: auto;
        background: url(../../images/structure.png) no-repeat center;
        background-size: 65%;

    }
}
</style>
