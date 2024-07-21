<template>
    <div class="display">
        <div class="grid">
            <div v-for="(room, key) in userooms.Rooms" :key="key" class="roominfo" @click="checkroom(key)"
                :style="{ backgroundImage: `url(${getimages(colors[Number(room.state)])})`, backgroundSize: '100% 100%', backgroundRepeat: 'no-repeat' }">
                <span class="span1">{{ room.name }}</span>
                <div class="span2">
                    <img :src='geticons(icons[Number(room.state)])'
                        style="width: 40px; height: 40px;margin-inline: 10px;margin-top: 8px;" />
                    <div class="span3">
                        <span>{{ prompts[Number(room.state)] }}</span>
                        <span>{{ (room.tem ? room.tem + '℃' : '--') + ' | ' + (room.time ? room.time + 'h' : '--'
                        ) }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref, onMounted, reactive, onBeforeMount } from 'vue'
import useUserStore from '@/store/modules/user';
import { reqGetRooms } from '@/api/roomcontrol'
import { useRouter } from 'vue-router'
import { ElNotification } from 'element-plus';
import useLayOutRoomStore from '@/store/modules/room';
import useRoomControl from '@/store/modules/roomcontrol';
let userooms = useRoomControl();
let roomStore = useLayOutRoomStore();
let $router = useRouter();
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
    // await postStorey(Number(value.value), options[value.value].poweron);
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
//获取数据大屏展示内容盒子的DOM元素
let screen = ref()
let buildings = reactive([{ name: '办公室', poweron: false }, { name: '会议室', poweron: false }, { name: '实验室', poweron: true }]);
let times = ['9:00', '10:00', '11:00', '12:00']
const buildingselect = async (key: any) => {
    buildings[key].poweron = !buildings[key].poweron;
    // await postBuilding(buildings[key].name, buildings[key].poweron);
}
// onBeforeMount(() => {
//     getRoom();
// })
onMounted(() => {
    getRoom();
})
const getRoom = async () => {
    let result = await reqGetRooms();
    if (typeof result !== 'undefined' && result !== null) {
        // rooms.value = result.rooms;
        userooms.Rooms = result.rooms;
        userooms.DisplayRooms = result.rooms;

        //

    } else {
        ElNotification({ type: 'error', message: '获取房间信息失败' });
    }
}
const checkroom = (key: number) => {
    roomStore.storeyRoomID = userooms.DisplayRooms[key].floor + " " + userooms.DisplayRooms[key].name
    roomStore.roomID = userooms.DisplayRooms[key].id;
    $router.push({ path: '/roominfo' });
}
function getimages(name: string) {
    return new URL(`${name}`, import.meta.url).href;
}
function geticons(name: string) {
    return new URL(`${name}`, import.meta.url).href;
}
let colors = ['../images/fgp3.png', '../images/fgp11.png', '../images/fgp10.png']
let icons = ['../images/fgp13.png', '../images/fgp4.png', '../images/fgp12.png']
let prompts = ['未开机', '设备正常', '设备异常']
</script>
<style scoped lang='scss'>
.display {
    width: 100%;
    height: 80vh;
    display: flex;
    padding-inline: 120px;
    padding-top: 50px;
    padding-bottom: 50px;
    background: url(../images/fgp5.png) no-repeat center;
    background-size: 90% 93%;
    background-position: bottom 6px;

    .grid {
        display: grid;
        overflow: auto;
        width: 100%;
        height: 100%;
        grid-template-columns: repeat(8, 1fr);
        grid-template-rows: repeat(5, 1fr);
        gap: 10px;
        animation: fadenum 0.8s 1;

        .roominfo {
            flex-direction: column;
            padding-top: 10px;
            height: 90px;
            width: 195px;

            .span1 {
                margin-left: 10px;
                color: rgb(255, 255, 255);
                font-size: 23px;
                font-weight: bold;

            }

            .span2 {
                display: flex;

                .span3 {
                    display: flex;
                    // flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    // padding-left: 10px;
                    flex-wrap: wrap;

                    span {
                        text-align: center;
                        color: white;
                        font-size: 18px;
                        margin-inline: 4px;
                    }
                }
            }
        }
    }

    @keyframes fadenum {
        0% {
            opacity: 0;
        }

        100% {
            opacity: 1;
        }
    }
}
</style>
