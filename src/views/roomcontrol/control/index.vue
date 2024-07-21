<template>
    <div class="control">
        <div class="top">
            <div class="left">
                <div class="lefttop">
                    <span class="span1">{{ `${roomControlInfo.storey + roomControlInfo.floor} ` }}</span>
                    <el-dropdown @command="handleStorey">
                        <span class="el-dropdown-link">
                            选择房间
                            <el-icon class="el-icon--right">
                                <arrow-down />
                            </el-icon>
                        </span>
                        <template #dropdown>
                            <el-dropdown-menu class="transparent-menu">
                                <el-dropdown-item command="办公室">办公室</el-dropdown-item>
                                <el-dropdown-item command="会议室">会议室</el-dropdown-item>
                                <el-dropdown-item command="实验楼">实验室</el-dropdown-item>
                                <el-dropdown-item command="无">无</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                    <el-dropdown @command="handleFloor">
                        <span class="el-dropdown-link">
                            选择楼层
                            <el-icon class="el-icon--right">
                                <arrow-down />
                            </el-icon>
                        </span>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item command="1F">1F</el-dropdown-item>
                                <el-dropdown-item command="2F">2F</el-dropdown-item>
                                <el-dropdown-item command="3F">3F</el-dropdown-item>
                                <el-dropdown-item command="无">无</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </div>
                <div class="leftbottom">
                </div>
            </div>
            <div class="center">
                <Dashboard ref="child"></Dashboard>
            </div>
            <div class="centerright">
                <div class="righttop"></div>
                <div class="rightbottom">
                    <img src="../images/minus.png" alt=""
                        @click="handleData('temperature', roomControlInfo.temperature -= 1)">
                    <img src="../images/add.png" alt=""
                        @click="handleData('temperature', roomControlInfo.temperature += 1)">
                </div>
            </div>
            <div class="right">
                <div class="poweron">
                    <div class="gas kr" :class="{ highlighted: roomControlInfo.state }"
                        @click="handleData('state', roomControlInfo.state = !roomControlInfo.state)">
                        <!-- <span class="number">36</span> -->
                        <div class="symbol">
                            <el-icon :style="{ 'color': roomControlInfo.state ? '#33CCCC' : '#808080' }"
                                style="font-size: 70px">
                                <SwitchButton />
                            </el-icon>
                        </div>
                    </div>
                </div>
                <!-- <div class="poweron"></div> -->
            </div>
        </div>
        <div class="bottom">
            <div class="left">
                <el-button type="text" v-for="(speed, key) in ['低速', '中速', '高速']" :key="key"
                    :class="{ highlighted: key == Number(roomControlInfo?.speed) - 1 }"
                    @click="handleData('speed', roomControlInfo.speed = String(key + 1))">
                    {{ speed }}
                </el-button>
            </div>
            <div class="center">
                <div class="time" v-for="(time, key) in 4" :key="key">
                    <div class="button">
                        {{ roomControl.Times[0][key] < '12:00' ? `${roomControl.Times[0][key]}AM` :
                            `${String(parseInt(roomControl.Times[0][key].split(':')[0], 10) - 12).padStart(2, '0'
                            )}:${roomControl.Times[0][key].split(':')[1]}PM` }}<span class="button-border"></span>
                            <Button :message="key" :flag='0'></Button>
                    </div>
                    <span class="to">to</span>
                    <div class="button">
                        {{ roomControl.Times[1][key] < '12:00' ? `${roomControl.Times[1][key]}AM` :
                            `${String(parseInt(roomControl.Times[1][key].split(':')[0], 10) - 12).padStart(2, '0'
                            )}:${roomControl.Times[1][key].split(':')[1]}PM` }}<span class="button-border"></span>
                            <Button :message="key" :flag='1'></Button>
                    </div>
                    <input type="checkbox" id="checkbox" style="width: 20px;height: 20px;" v-model="checkeds[key]">
                    <label for="checkbox" style="color: aliceblue;">启用</label></input>
                </div>
            </div>
            <div class="right"></div>
        </div>

    </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';
// import Dashboard from './inde.vue'
import Dashboard from '../dashboard/index.vue'
import { ref, onMounted, onBeforeMount } from 'vue'
import Button from '../button/index.vue'
import { selectStorey } from '@/api/roomcontrol/index.ts'
import { ElNotification } from 'element-plus';
import useRoomControl from '@/store/modules/roomcontrol'
import { ArrowDown } from '@element-plus/icons-vue'
import { postRoomInfoControl } from '@/api/roominfo'
import { reqGetStoreyRoom } from '@/api/roominfo/index.ts'
let child = ref(null);

const handleData = async (cmd, param) => {
    if (cmd === 'temperature') child.value.changeTemperature(param);
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

let roomControl = useRoomControl();
let checkeds = ref([false, false, false, true]);
let roomControlInfo = ref({});
// onBeforeMount(() => {
//     getControlInfo();
// })
onBeforeMount(async () => {
    getControlInfo();
})

onMounted(async () => {
    // try {
    //     let result = await reqGetStoreyRoom(1, 1);

    // } catch (error) {
    //     ElNotification({
    //         type: 'error',
    //         message: "获取控制信息失败"
    //     })
    // }
    child.value.changeTemperature(roomControlInfo.value?.temperature);
    // getControlInfo();
    // child.value!.changeTemperature(roomControlInfo.value!.temperature);
}
)

const getControlInfo = async () => {
    try {
        let result = await reqGetStoreyRoom(1, 1);

    } catch (error) {
        ElNotification({
            type: 'error',
            message: "获取控制信息失败"
        })
    }
    console.log(11111111);
    roomControlInfo.value = {
        temperature: Number('23'),
        times: [['19:00', '10:00', '11:00', '12:00'], ['13:00', '14:00', '15:00', '19:00']],
        state: Boolean('1'),
        floor: "2F",
        storey: '实验室',
        speed: '1',
        mode: '1'
    };
    // roomControl.Times = roomControlInfo.value.times;
}


const handleStorey = async (command) => {
    if (roomControlInfo.value.floor === '无' && command === '无') roomControl.DisplayRooms = roomControl.Rooms;
    else if (command === '无') roomControl.DisplayRooms = roomControl.Rooms.filter(room => room.floor === roomControlInfo.value.floor);
    else {
        let result = await selectStorey(command);
        if (result.error_message === 'error') {
            ElNotification({
                type: 'error',
                message: '选择' + `${command}` + '失败',
            })
        }
        roomControlInfo.value.storey = command;
        let map = new Map();
        for (let room of result.error_message.rooms) {
            map.set(room.id, true);
        }
        if (roomControlInfo.value.floor === '无') roomControl.DisplayRooms = roomControl.Rooms.filter(room => map.get(room.id));
        else roomControl.DisplayRooms = roomControl.Rooms.filter(room => room.floor === roomControlInfo.value.floor && map.get(room.id));
    }
}
const handleFloor = async (command) => {
    roomControlInfo.value.floor = command;
    handleStorey(roomControlInfo.value.storey);
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
    background: url(../images/fgp82.png) no-repeat center;
    background-size: 90% 100%;
    background-position: bottom;
    flex-direction: column;

    .top {
        flex: 2.4;
        // background-color: aqua;
        display: flex;

        .left {
            flex: 0.8;
            // background-color: green;
            display: flex;
            flex-direction: column;
            margin-left: 30px;
            margin-right: -30px;

            .lefttop {
                flex: 1.5;
                background: url(../images/fgp6.png) no-repeat right;
                background-size: 90% 50%;
                background-position: right;
                margin-top: 25px;
                display: flex;
                justify-content: center;
                align-content: center;
                gap: 10px;
                padding-top: 50px;
                padding-left: 40px;

                .example-showcase .el-dropdown-link {
                    // margin-left: 10px;
                    cursor: pointer;
                    color: var(--el-color-primary);
                    display: flex;
                    align-items: center;
                    background-color: transparent;
                }

                .transparent-menu {
                    background-color: rgba(151, 12, 12, 0.5);
                    // color: aliceblue;
                    /* 或者直接设置为透明 */
                }

                .span1 {
                    // margin-top: 20px;
                    // margin-right: 10px;
                    // position: absolute;
                    color: white;
                    font-size: 34px;
                    margin-inline: 40px;
                    // margin-bottom: 20px;

                }

                span {
                    // margin-top: 20px;
                    // margin-right: 10px;
                    // position: absolute;
                    color: rgba(255, 255, 255, 0.753);
                    font-size: 24px;
                    margin: 3px;
                }



                // background-color: antiquewhite;

            }

            .leftbottom {
                flex: 3;
                background: url(../images/control6.png) no-repeat center;
                background-size: 60% 90%;
                background-position: top;
                // background-color: aqua;
            }

            // margin-bottom: -5px;
        }

        .center {
            flex: 0.6;
            background-color: palegreen;
            background: url(../images/control10.png) no-repeat center;
            background-size: 85% 76%;
            // background-position: ;
            margin-top: 20px;
            padding: 15px;
            margin-left: 1px;
        }

        .centerright {
            flex: 0.4;
            display: flex;
            flex-direction: column;
            // background-color: rgb(255, 0, 212);

            .righttop {
                flex: 1.6;
                // background-color: purple;
                // background: url(../images/control2.png) no-repeat center;
                // background-size: 70% 70%;
                // background-position: bottom left 20px;
            }

            .rightbottom {
                flex: 1;
                background-color: black;
                background: url(../images/control5.png) no-repeat center;
                background-size: 80% 90%;
                background-position: bottom;
                display: flex;
                // justify-content: center;
                // align-content: center;
                // gap: 40px;

                img {
                    margin-left: 35px;
                    margin-top: 30px;
                    width: 50px;
                    height: 50px;
                }
            }
        }

        .right {
            flex: 0.5;
            // background-color: pink;
            // display: flex;
            // justify-content: center;
            // align-content: center;
            background: url(../images/control9.png) no-repeat center;
            background-size: 57% 70%;
            background-position: left;

            .poweron {


                flex: 1.1;

                #gasses {

                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;

                }

                .gas {
                    margin-left: 55px;
                    margin-top: 105px;
                    --blur: 1.75rem;
                    --box-blur: calc(0.5 * var(--blur));
                    --glow: var(--color);
                    --size: 7.8rem;
                    align-items: center;
                    border-radius: 100px;
                    border: 4px solid currentColor;
                    box-shadow:
                        /* --- "glass" tube --- */
                        /* inside */
                        inset 0 0 0 2px rgba(0, 0, 0, 0.15),
                        /* outside */
                        0 0 0 2px rgba(0, 0, 0, 0.15),
                        /* --- glow --- */
                        /* inside */
                        inset 0 0 var(--box-blur) var(--glow),
                        /* outside */
                        0 0 var(--box-blur) var(--glow);
                    color: var(--color, white);
                    display: inline-flex;
                    flex-direction: column;
                    font-family: system-ui, sans-serif;
                    height: var(--size);
                    justify-content: space-around;
                    padding: 1rem;
                    width: var(--size);
                }



                .symbol {
                    // font-size: 3rem;
                    // font-family: "Neon Glow";
                    text-shadow: 0 0 var(--blur) var(--glow);
                }

                .highlighted {

                    --color: #0bc5c5ec !important;
                }

                .gas.kr {
                    // --color: #0bc5c5ec;
                    --color: #808080;
                    filter: saturate(200%);
                    cursor: pointer;
                }

                .gas.kr:hover {
                    filter: brightness(120%) drop-shadow(0 0 10px var(--glow));
                }
            }
        }
    }

    .bottom {
        flex: 1;
        // background-color: red;
        display: flex;

        .left {
            flex: 1;
            // background-color: blue;
            display: flex;
            justify-content: right;
            margin-bottom: 25px;

            .el-button {
                // margin-left: 60px;
                width: 120px;
                height: 120px;
                background: url(../images/control4.png) no-repeat center;
                background-size: 70% 90%;
                // background-color: aqua;
            }

            .highlighted {
                color: red;
            }
        }

        .center {
            flex: 1.5;
            // background-color: orange;
            display: flex;
            justify-content: center;
            // gap: 30px;
            // background-color: red;
            flex-wrap: wrap;
            padding-bottom: 40px;
            gap: 10px;
            // padding-top: 10px;

            .time {

                // margin-left: 60px;
                // background-color: #15c50b;
                display: flex;
                justify-content: center;
                align-content: center;

                .button {
                    margin: 5px;
                    padding: 0.5rem 1rem;
                    border-radius: .5rem;
                    border: none;
                    font-size: 1.3rem;
                    font-weight: 350;
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
        }

        .right {
            flex: 1;
            background-color: yellow;
            background: url(../images/control7.png) no-repeat center;
            background-size: 70% 80%;
            background-position: top left 30px;
        }
    }
}
</style>
