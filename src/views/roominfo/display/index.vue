<template>
    <div class="display">
        <!-- <div class="box" @click="roominfo">
        </div> -->
        <div class="display1">
            <div class="text1">
                <p class="p1">{{ roomInfo.DisplayRooms.tem + '℃' }}</p>
                <p class="p2">当前温度</p>
            </div>
            <div class="text2">
                <p class="p1">6h</p>
                <p class="p2">开机时长</p>
            </div>
        </div>
        <div class="text3">
            <p class="p3_1">274</p>
            <p class="p3_2">数据展示</p>
        </div>
        <div class="display2">
            <div class="text4">
                <p class="p1">{{ roomInfo.DisplayRooms.state ? '开' : '关' }}</p>
                <p class="p2">当前状态</p>
            </div>
            <div class="text5">
                <p class="p1">9:00</p>
                <p class="p2">开机时间</p>
            </div>
        </div>
    </div>

</template>

<script setup lang='ts'>
import useroomInfo from '@/store/modules/roominfo'
let roomInfo = useroomInfo();
import { useRouter, useRoute } from 'vue-router';

</script>
<style scoped lang='scss'>
.display {
    width: 100%;
    height: 100%;
    display: flex;
    // background-color: bisque;
    background: url(../images/spg11.png) no-repeat center;
    background-size: 75% auto;
    background-position: bottom;

    .display1 {
        flex: 1;
        display: flex;
        flex-direction: column;



        .text1 {
            flex: 1;
            display: flex;
            flex-direction: column;
            padding-top: 20px;

            // justify-content: right;
            // align-content: right;

        }

        .p1 {
            margin-top: 80px;
        }

        p {

            margin-left: 160px;
        }


        .text2 {
            flex: 1;
            display: flex;
            flex-direction: column;
        }

        // background-color: yellow;
    }

    .text3 {
        flex: 1.6;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-content: center;

        .p3_1 {
            margin-top: 35px;
            text-align: center;
            line-height: 34px;
            color: white;
            font-size: 65px;
            font-weight: 550;

        }

        .p3_2 {
            text-align: center;
            // text-align: left;
            // line-height: 34px;
            margin-top: 25px;
            color: white;
            font-size: 20px;
            letter-spacing: 3px;
        }

        // background-color: aqua;
    }

    .display2 {
        flex: 1;
        display: flex;
        flex-direction: column;

        .text4 {
            flex: 1;
            display: flex;
            flex-direction: column;
            padding-top: 20px;
        }

        .text5 {
            flex: 1;
            display: flex;
            flex-direction: column;
        }

        .p1 {
            margin-top: 80px;
        }

        // background-color: red;

    }

    .p1 {
        // text-align: left;
        line-height: 34px;
        color: white;
        font-size: 45px;
        font-weight: 550;

    }

    .p2 {
        // text-align: left;
        // line-height: 34px;
        margin-top: 20px;
        color: white;
        font-size: 20px;
        letter-spacing: 3px;
    }

    // .box {
    //     margin: 50px;
    //     // background-color: aqua;
    //     width: 100%;
    //     height: auto;
    //     background: url(../../images/school.png) no-repeat center;
    //     background-size: 90%;

    // }
}
</style>
