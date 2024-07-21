<template>
    <div class="control">
        <div class="top">
            <p>控制中心</p>
        </div>
        <div class="center">
            <div class="power">
                <Dashboard ref="child"></Dashboard>
                <div class="col">
                    <img src="../images/add.png" alt=""
                        @click="handleData('temperature', roomControlInfo.temperature += 1)">
                    <img src="../images/minus.png" alt=""
                        @click="handleData('temperature', roomControlInfo.temperature -= 1)">
                </div>
            </div>
            <div class="speed"></div>
            <div class="tep">
                <el-button type="text" v-for="(speed, key) in ['低速', '中速', '高速']" :key="key"
                    :class="{ highlighted: key == Number(roomControlInfo.speed) - 1 }"
                    @click="handleData('speed', roomControlInfo.speed = String(key + 1))">
                    {{ speed }}
                </el-button>
                <el-button @click="handleData('state', roomControlInfo.state = !roomControlInfo.state)">
                    <el-icon :style="{ 'color': roomControlInfo.state ? '#33CCCC' : '#808080' }"
                        style="font-size: 55px">
                        <SwitchButton />
                    </el-icon>
                </el-button>
            </div>
            <div class="button">
                <div class="time" v-for="(time, key) in 4" :key="key">
                    <!-- <el-button><span>9:00AM</span></el-button> -->
                    <!-- <Button :message="key" :flag='0'></Button> -->
                    <div class="button">
                        {{ roomInfo.Times[0][key] < '12:00' ? `${roomInfo.Times[0][key]}AM` :
                            `${String(parseInt(roomInfo.Times[0][key].split(':')[0], 10) - 12).padStart(2, '0'
                            )}:${roomInfo.Times[0][key].split(':')[1]}PM` }}<span class="button-border"></span>
                            <!-- room<span class="button-border"></span> -->
                            <Button :message="key" :flag='0'></Button>
                    </div>
                    <span class="to">to</span>
                    <div class="button">
                        {{ roomInfo.Times[1][key] < '12:00' ? `${roomInfo.Times[1][key]}AM` :
                            `${String(parseInt(roomInfo.Times[1][key].split(':')[0], 10) - 12).padStart(2, '0'
                            )}:${roomInfo.Times[1][key].split(':')[1]}PM` }}<span class="button-border"></span>
                            <!-- room<span class="button-border"></span> -->
                            <Button :message="key" :flag='1'></Button>
                    </div>
                    <input type="checkbox" id="checkbox" style="width: 20px;height: 20px;" v-model="checkeds[key]">
                    <label for="checkbox" style="color: aliceblue;">启用</label></input>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeMount } from 'vue'
import useroomInfo from '@/store/modules/roominfo'
import Button from '@/views/roominfo/button/index.vue'
import { postRoomInfoControl } from '@/api/roominfo/index.ts'
import Dashboard from '../dashboard/index.vue'
import useLayOutRoomStore from '@/store/modules/room';
let roomStore = useLayOutRoomStore();
let child = ref(null);
let checkeds = ref([false, false, false, true]);
import { useRouter, useRoute } from 'vue-router';
let roomInfo = useroomInfo();
import { reqGetStoreyRoom } from '@/api/roominfo/index.ts'
let roomControlInfo = ref();
onBeforeMount(() => {
    getControlInfo();
})
onMounted(() => {
    child.value.changeTemperature(String(roomControlInfo.value?.temperature));
}
)
const getControlInfo = async () => {
    // 收集
    // try {
    //     let result = await reqGetStoreyRoom();
    //     // roomControlInfo.value = result.roomcontrol;
    // } catch (error) {
    //     ElNotification({
    //         type: 'error',
    //         message: "获取控制信息失败"
    //     })
    // }
    roomControlInfo.value = {
        temperature: Number('23'),
        times: [['19:00', '10:00', '11:00', '12:00'], ['13:00', '14:00', '15:00', '19:00']],
        state: Boolean('1'),
        floor: "2F",
        storey: '实验楼',
        speed: '1',
        mode: '1'
    };
    // roomInfo.Times = roomControlInfo.value.times;

    roomInfo.DisplayRooms.tem = roomControlInfo.value.temperature;
    roomInfo.DisplayRooms.state = roomControlInfo.value.state;

    // roomInfo.DisplayRooms.time = roomControlInfo.value.;

}
// onBeforeMount(() => {
//     roomInfo.Times = roomControlInfo.value.times;
// }
// )
const handleData = async (cmd, param) => {
    if (cmd === 'temperature') {
        child.value.changeTemperature(param);
        roomInfo.DisplayRooms.tem = param;
    }
    else if (cmd === 'state') {
        roomInfo.DisplayRooms.state = param;
    }
    let result = await postRoomInfoControl(cmd, String(param));
    if (result.error_message === 'success') {
        ElNotification({
            type: 'success',
            message: '更改' + `${param}` + '成功',
        })
    } else {
        ElNotification({
            type: 'error',
            message: '更改' + `${param}` + '失败',
        })
    }
}

</script>
<style scoped lang='scss'>
.control {
    width: 100%;
    height: 100%;
    display: flex;
    align-content: center;
    justify-content: center;
    // background-color: bisque;
    background: url(../images/spg2.png) no-repeat center;
    background-size: 87% 98%;
    background-position: bottom;
    flex-direction: column;

    .top {
        flex: 1;
        background: url(../images/spg.png) no-repeat center;
        background-size: 83% 69%;
        // background-color: red;
        background-position: bottom;

        p {
            margin-top: 30px;
            margin-left: 370px;
            // text-align: left;
            line-height: 34px;
            color: white;
            font-size: 28px;
            font-weight: 550;
            letter-spacing: 16px;
        }
    }

    .center {
        flex: 4;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-content: center;

        // background: url(../images/spg2.png) no-repeat center;
        // background-size: 87% 87%;
        .power {
            flex: 3;
            display: flex;
            // flex-direction: column;
            justify-content: center;
            align-content: center;

            .col {
                display: flex;
                flex-direction: column;
                padding-top: 60px;
                padding-right: 20px;
            }

            // background-color: aqua;
            img {
                // margin-r: 35px;
                margin-top: 10px;
                width: 50px;
                height: 50px;
            }
        }



        .tep {
            flex: 1;
            // background-color: blue;
            display: flex;
            justify-content: center;
            align-content: center;
            margin-bottom: 20px;

            gap: 30px;

            .highlighted {

                --color: red !important;
            }

            .el-button {
                // margin-left: 60px;
                width: 100px;
                height: 100px;
                background: url(../images/control41.png) no-repeat center;
                background-size: 90% 90%;
                color: aquamarine;
                font-size: 24px;
                font-weight: 600;
                border: none;
                // background-color: aqua;
            }

            .highlighted {
                color: red;
            }
        }

        .button {
            flex: 1.1;
            display: flex;
            justify-content: center;
            // gap: 30px;
            // background-color: red;
            flex-wrap: wrap;
            padding-bottom: 20px;
            gap: 10px;

            .time {
                // margin-left: 60px;
                // background-color: #15c50b;
                display: flex;
                justify-content: center;
                align-content: center;

                .button {
                    margin: 5px;
                    padding: 0.5rem 1.2rem;
                    border-radius: .5rem;
                    border: none;
                    font-size: 1.5rem;
                    font-weight: 400;
                    color: #f4f0ff;
                    text-align: center;
                    backdrop-filter: blur(10px);
                    cursor: pointer;
                }

                .button::before {
                    content: "";
                    display: block;
                    position: absolute;
                    left: 0;
                    top: 0;
                    height: 100%;
                    width: 100%;
                    border-radius: .5rem;
                    background: linear-gradient(180deg, rgba(8, 77, 126, 0) 0%, rgba(8, 77, 126, 0.42) 100%), rgba(47, 255, 255, .24);
                    box-shadow: inset 0 0 12px rgba(151, 200, 255, .44);
                    z-index: -1;
                }

                .button::after {
                    content: "";
                    display: block;
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(180deg, rgba(8, 77, 126, 0) 0%, rgba(8, 77, 126, 0.42) 100%), rgba(47, 255, 255, .24);
                    box-shadow: inset 0 0 12px rgba(151, 200, 255, .44);
                    border-radius: .5rem;
                    opacity: 0;
                    z-index: -1;
                    transition: all .3s ease-in;
                }

                .button:hover::after {
                    opacity: 1;
                }

                .button-border {
                    position: absolute;
                    top: 0;
                    left: 0;
                    height: 100%;
                    width: 100%;
                    border-radius: .5rem;
                    z-index: -1;
                }

                .button-border::before {
                    content: "";
                    position: absolute;
                    border-radius: .5rem;
                    padding: 1px;
                    inset: 0;
                    background: linear-gradient(180deg, rgba(184, 238, 255, 0.24) 0%, rgba(184, 238, 255, 0) 100%), linear-gradient(0deg, rgba(184, 238, 255, 0.32), rgba(184, 238, 255, 0.32));
                    // -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
                    // -webkit-mask-composite: xor;
                    pointer-events: none;
                }

                .to {
                    margin-top: 10px;
                    color: white;
                    font-size: 25px;

                }

                input {
                    margin-top: 12px;
                }

                label {
                    margin-top: 12px;
                    color: white;
                    font-size: 20px;
                }
            }

            // background-color: beige;
        }

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
