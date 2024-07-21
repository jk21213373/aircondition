<template>

    <div class="school">
        <div class="box" @click="roominfo">
        </div>
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
.school {
    width: 100%;
    height: 100%;
    display: flex;
    align-content: center;
    justify-content: center;
    // background-color: bisque;
    // background: url(../../images/3.jpg) no-repeat;
    // background-size: 100% 100%;

    .box {
        margin: 50px;
        // background-color: aqua;
        width: 100%;
        height: auto;
        background: url(../../images/school.png) no-repeat center;
        background-size: 90%;

    }
}
</style>
