<template>
    <el-card style="height:80px;">
        <el-form @submit.native.prevent :inline="true" class="form">
            <el-form-item label="楼层ID">
                <el-input placeholder="请你输入搜索楼层ID" v-model="storeyId"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button class="btn" type="primary" size="default" @click="getRoom"
                    :disabled="storeyId == null || storeyId === '' ? true : false"><span>搜索</span></el-button>
                <el-button class="btn" type="primary" size="default" @click="reSet"><span>重置</span></el-button>
            </el-form-item>
        </el-form>
    </el-card>
    <el-card style="margin:10px 0px;">
        <el-button class="btn" type="primary" size="default" @click="addRoom"><span>添加房间</span></el-button>
        <el-popconfirm :title="`你确定要删除?`" width="260px" @confirm="AlldeleteRoom()">
            <template #reference>
                <el-button class="btn" type="primary'" size="default"
                    :disabled="table.length ? false : true"><span>批量删除</span></el-button>
            </template>
        </el-popconfirm>
        <el-table style="font-size:12px; margin:10px 0px;border" :data="rooms" @selection-change="updateTable">
            <el-table-column type="selection" align="center"></el-table-column>
            <el-table-column width="80" label="序号" align="center" type="index"></el-table-column>
            <el-table-column width="80" label="楼层ID" align="center" prop="storeyId"
                show-overflow-tooltip></el-table-column>
            <el-table-column width="80" label="房间名称" align="center" prop="name" show-overflow-tooltip></el-table-column>
            <el-table-column width="80" label="房间ID" align="center" prop="id"></el-table-column>
            <el-table-column width="80" label="房间面积" align="center" prop="area" show-overflow-tooltip></el-table-column>
            <el-table-column width="80" label="房间控制面板数" align="center" prop="count"
                show-overflow-tooltip></el-table-column>
            <el-table-column width="100" label="节假日开空调时间" align="center" prop="holidayStarttime"
                show-overflow-tooltip></el-table-column>
            <el-table-column width="100" label="节假日关空调时间" align="center" prop="holidayEndtime"
                show-overflow-tooltip></el-table-column>
            <el-table-column width="100" label="工作日开空调时间" align="center" prop="workdayStarttime"
                show-overflow-tooltip></el-table-column>
            <el-table-column width="100" label="工作日关空调时间" align="center" prop="workdayEndtime"
                show-overflow-tooltip></el-table-column>
            <el-table-column label="操作" width="160px" align="center">
                <template #="{ row, $index }">
                    <el-button class="btn1" type="primary" size="small" @click="updateRoom(row)">
                        <span class="show">修改信息</span>
                    </el-button>
                    <el-popconfirm :title="`你确定要删除  ${row.id}?`" width="260px" @confirm="deleteRoom(row.id)">
                        <template #reference>
                            <el-button class="btn1" type="primary" size="small">
                                <span class="show">删除</span></el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination v-model:current-page="pageNo" :background="true" layout="prev,pager,next,jumper,->,sizes,total"
            :total="total" @current-change="getRoom" @size-change="handler" />
    </el-card>
    <el-drawer v-model="drawer">
        <template #header>
            <h4>{{ roomParams.id ? '更新用户' : '添加用户' }}</h4>
        </template>
        <el-form :model="roomParams" :rules="rules" ref="formRef">
            <el-form-item label="所在楼层" prop="storeyId">
                <el-input placeholder="请您输入所在楼层" v-model="roomParams.storeyId"></el-input>
            </el-form-item>
            <el-form-item label="房间名称" prop="name">
                <el-input placeholder="请您输入房间名称" v-model="roomParams.name"></el-input>
            </el-form-item>
            <el-form-item label="房间面积" prop="area">
                <el-input placeholder="请您输入房间面积" v-model="roomParams.area"></el-input>
            </el-form-item>
            <el-form-item label="房间控制面板数" prop="count">
                <el-input placeholder="房间控制面板数" v-model="roomParams.count"></el-input>
            </el-form-item>
            <el-form-item label="节假日开空调时间" prop="holidayStarttime">
                <el-form-item prop="holidayStarttime">
                    <el-time-picker format='HH:mm' value-format='HH:mm' v-model="roomParams.holidayStarttime"
                        placeholder="请输入节假日开空调时间" :style="{ width: '100 %' }" />
                </el-form-item>
            </el-form-item>
            <el-form-item label="节假日关空调时间" prop="holidayEndtime">
                <el-form-item prop="holidayEndtime">
                    <el-time-picker format='HH:mm' value-format='HH:mm' v-model="roomParams.holidayEndtime"
                        placeholder="请输入节假日关空调时间" :style="{ width: '100 %' }" />
                </el-form-item>
            </el-form-item>
            <el-form-item label="工作日开空调时间" prop="workdayStarttime">
                <el-form-item prop="workdayStarttime">
                    <el-time-picker format='HH:mm' value-format='HH:mm' v-model="roomParams.workdayStarttime"
                        placeholder="请输入工作日开空调时间" :style="{ width: '100 %' }" />
                </el-form-item>
            </el-form-item>
            <el-form-item label="工作日关空调时间" prop="workdayEndtime">
                <el-form-item prop="workdayEndtime">
                    <el-time-picker format='HH:mm' value-format='HH:mm' v-model="roomParams.workdayEndtime"
                        placeholder="请输入工作日关空调时间" :style="{ width: '100 %' }" />
                </el-form-item>
            </el-form-item>
        </el-form>
        I<template #footer>
            <div>
                <el-button class="btn" @click="cancel"><span>取消</span></el-button>
                <el-button class="btn" type="primary" @click="save"><span>确定</span></el-button>
            </div>
        </template>
    </el-drawer>
</template>

<script setup>
import { ref, onMounted, reactive, nextTick } from 'vue';
import { reqGetRoom, reqDeleteRoom, reqAddRoom } from '@/api/room'
import { useRouter, useRoute } from 'vue-router';
import useLayOutRoomStore from '@/store/modules/room';
import { ElNotification } from 'element-plus';
import useLayOutSettingStore from '@/store/modules/setting';
let settingStore = useLayOutSettingStore();
let roomStore = useLayOutRoomStore();

let $router = useRouter();
//默认页码
let pageNo = ref(1);
//一页展示几条数据
let total = ref(0);
// 多选框
let table = ref([])
let tableCount = ref()
let rooms = ref([]);
// 修改信息
let drawer = ref(false);
let storeyId = ref('');

let formRef = ref();
let roomParams = reactive({
    id: '',
    storeyId: '',
    name: '',
    area: '',
    count: '',
    holidayStarttime: '',
    holidayEndtime: '',
    workdayStarttime: '',
    workdayEndtime: ''
})
onMounted(() => {
    getRoom();
})
const handler = () => {
    getRoom()
}
const getRoom = async (pager = 1) => {
    //收集当前页码
    pageNo.value = pager;
    let result;
    if (storeyId.value === '') { result = await reqGetRoom(pageNo.value, 0); }
    else {
        result = await reqGetRoom(pageNo.value, storeyId.value);
    }
    if (result) {
        total.value = result.rooms_count;
        rooms.value = result.rooms;
    } else {
        ElNotification({ type: 'success', message: '获取房间失败' });
    }
    if (storeyId.value != 0) reset();
}
const reSet = () => {
    settingStore.refsh = !settingStore.refsh;
}
const deleteRoom = async (id) => {
    //收集当前页码
    let result = await reqDeleteRoom(id);
    if (result) {
        if (result.error_message === 'success') {
            getRoom(rooms.value.length > 1 ? pageNo.value : pageNo.value - 1)
        } else {
            console.log(result.error_message)
        }
    } else {
        console.log('删除失败')
    }
}
const updateTable = (selection) => {
    table.value = selection.map(item => item.id)
    tableCount.value = selection.length
    console.log(table.value);
}
const AlldeleteRoom = async () => {
    if (tableCount.value > 0) {
        table.value?.forEach((item) => {
            deleteRoom(item)
        })
    }
}
const addRoom = () => {
    drawer.value = true;
    // 存储收集已有的账号信息
    Object.assign(roomParams, {
        id: '',
        storeyId: '',
        name: '',
        area: '',
        count: '',
        holidayStarttime: '',
        holidayEndtime: '',
        workdayStarttime: '',
        workdayEndtime: ''
    });
    nextTick(() => {
        formRef.value.clearValidate('storeyId')
        formRef.value.clearValidate('name')
        formRef.value.clearValidate('area')
        formRef.value.clearValidate('count')
        formRef.value.clearValidate('holidayStarttime')
        formRef.value.clearValidate('holidayEndtime')
        formRef.value.clearValidate('workdayStarttime')
        formRef.value.clearValidate('workdayEndtime')
    })
}
const checkRoom = (raw) => {
    roomStore.storeyRoomID = raw.storeyId + " " + raw.name
    $router.push({ path: '/roominfo' });
}
const updateRoom = (raw) => {
    drawer.value = true;
    Object.assign(roomParams, raw);
    nextTick(() => {
        formRef.value.clearValidate('storeyId')
        formRef.value.clearValidate('name')
        formRef.value.clearValidate('area')
        formRef.value.clearValidate('count')
        formRef.value.clearValidate('holidayStarttime')
        formRef.value.clearValidate('holidayEndtime')
        formRef.value.clearValidate('workdayStarttime')
        formRef.value.clearValidate('workdayEndtime')
    })
}
//保存按钮的回调
const save = async () => {
    await formRef.value.validate();
    drawer.value = false;
    let result = await reqAddRoom(roomParams);
    if (result.error_message === 'success') {
        // drawer.value = false;
        ElNotification({ type: 'success', message: roomParams.id ? '更新成功' : '添加成功' });
        window.location.reload();
    } else {
        drawer.value = false;
        ElNotification({ type: 'error', message: roomParams.id ? '更新失败' : '添加成功' });
    }
}
const cancel = () => {
    drawer.value = false;
}
const rules = {
    storeyId: [
        { required: true, message: '请输入楼层ID', trigger: 'blur' },
        { min: 3, max: 6, message: '长度应该在3到6之间', trigger: 'blur' },
    ],
    name: [
        { required: true, message: '请输入房间名称', trigger: 'blur' },
        { min: 2, max: 6, message: '长度应该在2到6之间', trigger: 'blur' },
    ],
    area: [
        { required: true, message: '请输入房间吗面积，单位为平方米', trigger: 'blur' },
        { pattern: /^-?\d+\.?\d*$/, message: '应当只包含数字', trigger: 'blur' },
    ],

    count: [
        { required: true, message: '请输入控制面板数', trigger: 'blur' },
        { pattern: /^-?\d+\.?\d*$/, message: '应当只包含数字', trigger: 'blur' },
    ],

    holidayStarttime: [
        { required: true, message: '请输入节假日开空调时间', trigger: 'blur' },
    ],
    holidayEndtime: [
        { required: true, message: '请输入节假日关空调时间', trigger: 'blur' },
    ],
    workdayStarttime: [
        { required: true, message: '请输入工作日开空调时间', trigger: 'blur' },
    ],
    workdayEndtime: [
        { required: true, message: '请输入工作日关空调时间', trigger: 'blur' },
    ],
}
</script>

<style scoped lang="scss">
.el-table {
    width: 100%;
    margin-bottom: 10px;

    &::before {
        display: none;
    }

    .el-table__body {
        -webkit-border-horizontal-spacing: 5px;
        -webkit-border-vertical-spacing: 10px;
    }

    thead th {
        font-size: 14px;
        color: #575757;

        &:nth-last-child(2) {
            border-right: 1px solid rgba(0, 0, 0, 0.1) !important;
            border-radius: 0 5px 5px 0;
            right: 1px;
        }

    }

    thead th,
    .el-table__row td {
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        padding: 10px 0;
        border-top: 1px solid rgba(0, 0, 0, 0.1) !important;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1) !important;

        &:first-child {
            border-left: 1px solid rgba(0, 0, 0, 0.1) !important;
            border-radius: 5px 0 0 5px;
        }
    }

    .el-table__row>td {
        font-size: 12px;
        color: #333333;

        &:last-child {
            border-right: 1px solid rgba(0, 0, 0, 0.1) !important;
            border-radius: 0 5px 5px 0;
            right: 1px;
        }
    }

    .el-table__body tr:hover>td.el-table__cell {
        background-color: rgba(0, 110, 255, 0.05);
    }

    .el-table__fixed::before {
        display: none;
    }
}

.form {
    display: flex;
    justify-content: space-between;
    align-items: center;
}



.btn1 {
    width: 62px;
    height: 28px;
    background: #fff;
    border-color: #ccccd8;
    border-radius: 50px;
    outline: none;
    cursor: pointer;
    position: relative;
    overflow: hidden;

    .show {
        font-size: 11px;
    }
}




.btn {
    width: 90px;
    height: 33px;
    background: #fff;
    border-radius: 50px;
    border-color: #ccccd8;
    outline: none;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.el-button:hover {
    border-color: #555666 !important;
}

.btn span {
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: #555666;
    transition: top 0.5s;
}

.btn1 span {
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: #555666;
    transition: top 0.5s;
}
</style>
