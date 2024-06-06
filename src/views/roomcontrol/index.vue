<template>
    <div class="miancontainer">
        <div class="screen" ref="screen">
            <div class="top">
                <Top />
            </div>
            <svg @click='goBack' t="1715947177382" class="icon" viewBox="0 0 1029 1024" version="1.1"
                xmlns="http://www.w3.org/2000/svg" p-id="2793" width="48" height="48">
                <path
                    d="M1001.423238 494.592q21.504 20.48 22.528 45.056t-16.384 40.96q-19.456 17.408-45.056 16.384t-40.96-14.336q-5.12-4.096-31.232-28.672t-62.464-58.88-77.824-73.728-78.336-74.24-63.488-60.416-33.792-31.744q-32.768-29.696-64.512-28.672t-62.464 28.672q-10.24 9.216-38.4 35.328t-65.024 60.928-77.824 72.704-75.776 70.656-59.904 55.808-30.208 27.136q-15.36 12.288-40.96 13.312t-44.032-15.36q-20.48-18.432-19.456-44.544t17.408-41.472q6.144-6.144 37.888-35.84t75.776-70.656 94.72-88.064 94.208-88.064 74.752-70.144 36.352-34.304q38.912-37.888 83.968-38.4t76.8 30.208q6.144 5.12 25.6 24.064t47.616 46.08 62.976 60.928 70.656 68.096 70.144 68.096 62.976 60.928 48.128 46.592zM447.439238 346.112q25.6-23.552 61.44-25.088t64.512 25.088q3.072 3.072 18.432 17.408l38.912 35.84q22.528 21.504 50.688 48.128t57.856 53.248q68.608 63.488 153.6 142.336l0 194.56q0 22.528-16.896 39.936t-45.568 18.432l-193.536 0 0-158.72q0-33.792-31.744-33.792l-195.584 0q-17.408 0-24.064 10.24t-6.656 23.552q0 6.144-0.512 31.232t-0.512 53.76l0 73.728-187.392 0q-29.696 0-47.104-13.312t-17.408-37.888l0-203.776q83.968-76.8 152.576-139.264 28.672-26.624 57.344-52.736t52.224-47.616 39.424-36.352 19.968-18.944z"
                    p-id="2794" fill="#0eedfd"></path>
            </svg>
            <div class="bottom">
                <div class="rtop">
                    <div v-for="(room, key) in rooms" :key="key" class="roominfo" @click="checkroom(key)"
                        :style="{ 'background-color': colors[Number(room.state)] }">
                        <span class="span1">{{ room.name }}</span>
                        <div class="span2">
                            <span>{{ room.tem ? room.tem + '℃' : '--' }}</span>
                            <span>{{ room.time ? room.time + 'h' : '--' }}</span>
                        </div>
                    </div>
                    <!-- <el-button type="text" v-for="(speed, key) in ['低速', '中速', '高速']" :key="key"
                            :class="{ highlighted: key == forecast.speed }">
                            {{ speed }}
                        </el-button> -->
                </div>
                <div class="rbottom">
                    <div class="b1">
                        <div v-for="(building, key) in buildings" :key="key" class="buildinginfo">
                            <span class="buildingspan" @click="buildingselect(key)">{{ building.name }}</span>
                            <div v-if='building.poweron' @click="buildingselect(key)">
                                <img src="@/views/screen/images/u461.svg">
                            </div>
                            <div v-else @click="buildingselect(key)">
                                <img src="@/views/screen/images/u460.svg">
                            </div>
                        </div>
                        <div class="storeyinfo">
                            <span>房间楼层：</span>
                            <el-select v-model="value" style="width: 60px; height: 80px ; ">
                                <el-option v-for="item in options" :key="item.value" :value="item.value"
                                    :label="item.value + 'F'" />
                            </el-select>
                            <div v-if='options[Number(value) - 1].poweron' @click="storeyselect">
                                <img src="@/views/screen/images/u461.svg">
                            </div>
                            <div v-else @click="storeyselect">
                                <img src="@/views/screen/images/u460.svg">
                            </div>
                        </div>
                    </div>
                    <!-- </div>
                        <div>  <img src="@/views/screen/images/u461.svg"></div>
                        <div>   <img src="@/views/screen/images/u461.svg">  </div>
                       
                        <img src="@/views/screen/images/u461.svg">
                    </div> -->
                    <div class="b2">
                        <div class="mode">
                            <span>模式</span>
                            <img src="@/views/screen/images/u442.svg">
                            <div v-if=modeinfo>
                                <img src="@/views/screen/images/u444.svg">
                                <img @click="modechange" src="@/views/screen/images/u440.svg">
                            </div>
                            <div v-else>
                                <img @click="modechange" src="@/views/screen/images/u443.svg">
                                <img src="@/views/screen/images/u441.svg">
                            </div>
                        </div>
                        <div class="speed">
                            <span>风速</span>
                            <img src="@/views/screen/images/u442.svg">
                            <el-button @click="speedchage(key)" v-for="(speed, key) in ['低速', '中速', '高速', '自动']"
                                :key="key" :class="{ highlighted: key == speedinfo }">
                                <span>{{ speed }}</span>
                            </el-button>
                        </div>
                        <div class="temperature">
                            <span>温度</span>
                            <img src="@/views/screen/images/u442.svg">
                            <img src="@/views/screen/images/u455.svg">
                            <span>{{ temperatureinfo + '℃' }}</span>
                            <div class="add">
                                <img @click="temperaturechage(1)" src="@/views/screen/images/u457.svg">
                                <img @click="temperaturechage(-1)" src="@/views/screen/images/u456.svg">
                            </div>
                        </div>
                    </div>
                    <div class="b3">
                        <div class="time" v-for="(time, key) in times" :key="key">
                            <!-- <el-button><span>{{ time + 'AM' }}</span></el-button> -->
                            <Button :message="key"></Button>
                            <span class="to">to</span>
                            <!-- <el-button><span>{{ time + 'AM' }}</span> </el-button> -->
                            <Button :message="key"></Button>
                            <input type="checkbox" id="checkbox" style="width: 20px;height: 20px"
                                v-model="checkeds[key]">
                            <label for="checkbox">启用</label></input>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
//引入顶部的子组件
import Top from '@/views/login/top/index.vue'
//引入左侧三个子组件
// import Line from './components/line/index.vue'
// import Area from './components/area/index.vue'
// import Bar from './components/bar/index.vue'
// import School from './components/school/index.vue'
import useLayOutRoomStore from '@/store/modules/room';
//引入中间两个子组件
//引入右侧三个子组件
import Pie from './components/pie/index.vue'
import Button from './button/index.vue'
import useUserStore from '@/store/modules/user';
import { reqDeleteRoom, reqAddRoom } from '@/api/acl/room'
import { reqQueRoom, postBuilding, postStorey } from '@/api/roomcontrol';
import { useRouter } from 'vue-router'
import { ElNotification } from 'element-plus';
import useRoomTime from '@/store/modules/roomcontrol.ts'
let useRoomtime = useRoomTime();
let $router = useRouter();
let checkeds = ref([false, false, false, true]);
let modeinfo = ref(false);
let speedinfo = ref(1)
const modechange = () => {
    modeinfo.value = !modeinfo.value;
}
const speedchage = (key: any) => {
    speedinfo.value = key;
}
let temperatureinfo = ref(20)
const temperaturechage = (num: any) => {
    temperatureinfo.value += num
}
const value = ref(1);
const options = reactive([
    {
        value: '1',
        poweron: false
    },
    {
        value: '2',
        poweron: true
    },
])
const storeyselect = async () => {
    options[Number(value.value) - 1].poweron = !options[Number(value.value)].poweron;
    await postStorey(Number(value.value), options[value.value].poweron);
}

interface roomnode {
    name: string,
    tem: string,
    time: string,
    state: string,
    floor: string,
}
let useStore = useUserStore();
// 0 关 1开 2 故障
let colors = ['#ee6666', '#15c50b', '#797979']
//获取数据大屏展示内容盒子的DOM元素
let screen = ref()
let rooms = ref<roomnode[]>([
    // {
    //     name: '201',
    //     temperature: '23',
    //     time: '1.2',
    //     state: '3',
    //     floor: "2F"
    // },
    // {
    //     name: '202',
    //     temperature: '30',
    //     time: '1.7',
    //     state: '2',
    //     floor: "2F"
    // },
    // {
    //     name: '203',
    //     temperature: '23',
    //     time: '1.2',
    //     state: '1',
    //     floor: "2F"
    // },
    // {
    //     name: '204',
    //     temperature: '23',
    //     time: '1.2',
    //     state: '3',
    //     floor: "2F"
    // },
    // {
    //     name: '205',
    //     temperature: '23',
    //     time: '1.2',
    //     state: '2',
    //     floor: "2F"
    // },
    // {
    //     name: '206',
    //     temperature: '23',
    //     time: '1.2',
    //     state: '1',
    //     floor: "2F"
    // },
    // {
    //     name: '207',
    //     temperature: '23',
    //     time: '1.2',
    //     state: '3',
    //     floor: "2F"
    // },
    // {
    //     name: '208',
    //     temperature: '23',
    //     time: '1.2',
    //     state: '3',
    //     floor: "2F"
    // },
    // {
    //     name: '209',
    //     temperature: '23',
    //     time: '1.2',
    //     state: '2',
    //     floor: "2F"
    // },
    // {
    //     name: '210',
    //     temperature: '23',
    //     time: '1.2',
    //     state: '1',
    //     floor: "2F"
    // },
    // {
    //     name: '301',
    //     temperature: '23',
    //     time: '1.2',
    //     state: '1',
    //     floor: "2F"
    // },
    // {
    //     name: '302',
    //     temperature: '23',
    //     time: '1.2',
    //     state: '3',
    //     floor: "2F"
    // },
    // {
    //     name: '303',
    //     temperature: '23',
    //     time: '1.2',
    //     state: '1',
    //     floor: "2F"
    // },
    // {
    //     name: '304',
    //     temperature: '23',
    //     time: '1.2',
    //     state: '2',
    //     floor: "2F"
    // },
    // {
    //     name: '305',
    //     temperature: '23',
    //     time: '1.2',
    //     state: '3',
    //     floor: "2F"
    // },
    // {
    //     name: '306',
    //     temperature: '23',
    //     time: '1.2',
    //     state: '1',
    //     floor: "2F"
    // },
    // {
    //     name: '307',
    //     temperature: '23',
    //     time: '1.2',
    //     state: '2',
    //     floor: "2F"
    // },
    // {
    //     name: '308',
    //     temperature: '23',
    //     time: '1.2',
    //     state: '2',
    //     floor: "2F"
    // },
    // {
    //     name: '309',
    //     temperature: '23',
    //     time: '1.2',
    //     state: '2',
    //     floor: "2F"
    // },
    // {
    //     name: '310',
    //     temperature: '23',
    //     time: '1.2',
    //     state: '1',
    //     floor: "2F"
    // },
    // {
    //     name: '401',
    //     temperature: '23',
    //     time: '1.2',
    //     state: '2',
    //     floor: "2F"
    // },
    // {
    //     name: '402',
    //     temperature: '23',
    //     time: '1.2',
    //     state: '1',
    //     floor: "2F"
    // },
    // {
    //     name: '403',
    //     temperature: '23',
    //     time: '1.2',
    //     state: '1',
    //     floor: "2F"
    // },
    // {
    //     name: '404',
    //     temperature: '23',
    //     time: '1.2',
    //     state: '2',
    //     floor: "2F"
    // },
    // {
    //     name: '405',
    //     temperature: '23',
    //     time: '1.2',
    //     state: '3',
    //     floor: "2F"
    // },
    // {
    //     name: '406',
    //     temperature: '23',
    //     time: '1.2',
    //     state: '3',
    //     floor: "2F"
    // },
]);
let roomStore = useLayOutRoomStore();
let buildings = reactive([{ name: '办公室', poweron: false }, { name: '会议室', poweron: false }, { name: '实验室', poweron: true }]);
let times = ['9:00', '10:00', '11:00', '12:00']
const buildingselect = async (key: any) => {
    buildings[key].poweron = !buildings[key].poweron;
    await postBuilding(buildings[key].name, buildings[key].poweron);
}
interface buildingnode {
    mode: string,
    speed: string,
    temperature: string,
    holidayStarttime: string,
    holidayEndtime: string,
    workdayStarttime: string
    workdayEndtime: string,
    building: [{
        name: string,
        poweron: string,
        temperature: string,
    },]
}
// let buildings = ref<buildingnode>();
onMounted(() => {
    getRoom();
    useRoomtime.Times = times;
    screen.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`
})
const goBack = () => {
    $router.push('/screen');
}

const getRoom = async () => {

    let result = await reqQueRoom();
    if (result) {
        rooms.value = result.rooms;
    } else {
        ElNotification({ type: 'error', message: '获取房间信息失败' });
    }

    // let result = await reqGetBuilding();
    // if (result) {
    //     buildings.value = result.buildings;
    // } else {
    //     ElMessage({ type: 'error', message: '获取总控信息失败' });
    // }

}
const checkroom = (key: number) => {
    roomStore.storeyRoomID = rooms.value[key].floor + " " + rooms.value[key].name
    $router.push({ path: '/roominfo' });
}
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

<style lang="scss">
.miancontainer {
    width: 100vw;
    height: 100vh;
    background: url(@/views/screen/images/bg.png) no-repeat;
    background-size: cover;

    .screen {
        position: fixed;
        width: 1920px;
        height: 1080px;
        left: 50%;
        top: 50%;
        transform-origin: left top;

        //     .top{
        //      height: 50px;
        // }
        .svg {
            position: absolute;
            top: 20px;
            left: 20px;
        }

        .bottom {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-content: center;
            gap: 20px;
            background: url(@/views/screen/images/u83.svg) no-repeat;
            background-size: cover;
            padding: 20px;

            .rtop {
                // background-color: yellow;
                flex: 5;
                display: grid;
                grid-template-columns: repeat(10, 1fr);
                grid-template-rows: repeat(7, 1fr);

                .roominfo {
                    // position: relative;
                    // width: 192px;
                    // height: 110px;
                    display: flex;
                    // background-color: blue;
                    flex-direction: column;

                    // gap: 10px;
                    .span1 {
                        margin: 10px;
                        color: white;
                        font-size: 23px;
                        font-weight: bold;

                    }

                    .span2 {
                        display: flex;
                        gap: 50px;
                        // justify-content: center;
                        margin: 10px;

                        span {

                            color: white;
                            font-size: 20px;
                        }
                    }
                }
            }

            .rbottom {
                // background-color: black;
                background: url(@/views/screen/images/login_userbox_u438.svg) no-repeat;
                background-size: cover;
                flex: 3.5;
                display: flex;
                flex-direction: column;


                .b1 {
                    display: flex;
                    justify-content: center;
                    // align-content: center;
                    // background-color: aqua;
                    gap: 100px;

                    .buildinginfo {
                        margin-top: 40px;
                        display: flex;
                        justify-content: center;
                        align-content: center;
                        gap: 10px;


                    }

                    .storeyinfo {
                        margin-top: 40px;
                        display: flex;
                        justify-content: center;
                        align-content: center;
                        gap: 10px;

                        .el-select {
                            margin-top: 5px;

                            .el-input {
                                input {
                                    font-size: 12px;
                                    height: 45px;
                                    border-color: rgba(44, 137, 229, 0.5);
                                }
                            }
                        }

                        // span {
                        //     color: white;
                        //     font-size: 35px;
                        //     font-weight: bold;
                        // }
                    }

                    span {
                        color: white;
                        font-size: 35px;
                        font-weight: bold;
                    }

                }

                .b2 {
                    // background-color: red;
                    display: flex;
                    justify-content: center;
                    // align-content: center;
                    // gap: 100px;

                    .mode {
                        display: flex;
                        justify-content: center;
                        align-content: center;
                        gap: 10px;
                        width: 340px;

                        img {
                            margin-left: 20px;
                        }
                    }

                    span {
                        color: white;
                        font-size: 35px;
                        font-weight: bold;
                    }

                    .speed {
                        width: 650px;
                        display: flex;
                        justify-content: center;
                        align-content: center;
                        gap: 10px;
                        margin-right: 20px;

                        .el-button {
                            border-radius: 10px;
                            width: 90px;
                            height: 40px;
                            background-color: blue;

                            span {
                                color: white;
                                font-size: 28px;
                                font-weight: 500;
                            }

                        }


                        .highlighted {
                            background-color: #15c50b;
                        }
                    }

                    .temperature {
                        display: flex;
                        width: 300px;
                        // height: 80px;
                        // justify-content: center;
                        // align-content: center;
                        // background-color: red;
                        gap: 20px;

                        .add {
                            display: flex;
                            flex-direction: column;
                            gap: 10px;

                            img {
                                width: 180%;
                                height: auto;
                            }

                        }
                    }
                }

                .b3 {
                    display: flex;
                    justify-content: center;
                    gap: 30px;
                    flex-wrap: wrap;
                    width: 1400px;
                    height: 190px;
                    // background-color: antiquewhite;
                    align-content: center;
                    margin-left: 260px;

                    .time {
                        margin-left: 60px;
                        // background-color: #15c50b;
                        display: flex;
                        justify-content: center;
                        align-content: center;
                        gap: 20px;

                        .el-button {
                            border-radius: 10px;
                            width: 140px;
                            height: 50px;
                            // background-color: blue;
                            background: linear-gradient(to top, #19597a, #1080b5, #079fee);

                            span {
                                color: white;
                                font-size: 30px;
                                font-weight: 500;
                            }
                        }

                        .to {
                            margin-top: 10px;
                            color: white;
                            font-size: 25px;
                            font-weight: bold;
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
            }
        }
    }
}
</style>