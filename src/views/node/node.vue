<template>
    <el-card style="height:80px;">
        <el-form :inline="true" class="form">
            <el-form-item label="房间名字或ID">
                <div class="m-4">
                    <el-select v-model="searchroom" filterable remote reserve-keyword placeholder="请输入房间名字或ID"
                        remote-show-suffix :remote-method="remoteMethod" :loading="loading" style="width:200px">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                </div>
            </el-form-item>
            <el-form-item>
                <el-button class="btn" type="primary" size="default"
                    @click="getNode(1, searchroom)"><span>搜索</span></el-button>
                <el-button class="btn" type="primary" size="default" @click="reSet"><span>重置</span></el-button>
            </el-form-item>
        </el-form>
    </el-card>
    <el-card style="margin:10px 0px;">
        <el-button class="btn" type="primary" size="default" @click="addNode"><span>添加节点</span></el-button>
        <el-popconfirm :title="`你确定要删除?`" width="260px" @confirm="AlldeleteNode()">
            <template #reference>
                <el-button class="btn" type="primary'" size="default"
                    :disabled="table.length ? false : true"><span>批量删除</span></el-button>
            </template>
        </el-popconfirm>
        <el-table style=" margin:10px 0px;border" :data="nodes" @selection-change="updateTable">
            <el-table-column type="selection" align="center"></el-table-column>
            <el-table-column width="90" label="#" align="center" type="index"></el-table-column>
            <el-table-column width="120" label="节点ID" align="center" prop="id" show-overflow-tooltip></el-table-column>
            <el-table-column width="180" label="节点名称" align="center" prop="deviceId"
                show-overflow-tooltip></el-table-column>
            <el-table-column width="120" label="房间ID" align="center" prop="roomId"
                show-overflow-tooltip></el-table-column>
            <el-table-column width="140" label="设备序号" align="center" prop="numberId"
                show-overflow-tooltip></el-table-column>
            <el-table-column label="操作" width="240px" align="center">
                <template #="{ row, $index }">
                    <el-button class="btn" type="primary" size="small" @click="updateNode(row)">
                        <el-icon style=";color: #555666">
                            <Edit />
                        </el-icon>
                        <span>修改信息</span></el-button>
                    <el-popconfirm :title="`你确定要删除  ${row.id}?`" width="260px" @confirm="deleteStorey(row.id)">
                        <template #reference>
                            <el-button class="btn" type="primary" size="small"><el-icon style="color:#555666">
                                    <Delete />
                                </el-icon>
                                <span>删除</span></el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination v-model:current-page="pageNo" :background="true" layout="prev,pager,next,jumper,->,sizes,total"
            :total="total" @current-change="getNode" @size-change="handler" />
    </el-card>
    <el-drawer v-model="drawer">
        <template #header>
            <h4>{{ nodeParams.id ? '更新节点' : '添加节点' }}</h4>
        </template>
        <el-form :model="nodeParams" :rules="rules" ref="formRef">
            <el-form-item label="设备名称" prop="deviceId">
                <el-input placeholder="请您输入设备名称" v-model="nodeParams.deviceId"></el-input>
            </el-form-item>
            <el-form-item label="房间ID" prop="roomId">
                <el-select v-model="nodeParams.roomId" filterable remote reserve-keyword placeholder="请您选择房间ID"
                    remote-show-suffix :remote-method="remoteMethod" :loading="loading"
                    style="width: 285px;height: 30px;">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="第几个" prop="numberId">
                <el-input placeholder="请您输入第几个设备" v-model="nodeParams.numberId"></el-input>
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
import { reqGetNode, reqDeleteNode, reqAddNode } from '@/api/node/index.ts'
import { ElNotification } from 'element-plus';
import useLayOutSettingStore from '@/store/modules/setting';
import { reqRoomsInfo } from '@/api/acl/index.ts';
let settingStore = useLayOutSettingStore();
//默认页码
let pageNo = ref(1);
//一页展示几条数据
let total = ref(0);
// 多选框
let table = ref([])
let tableCount = ref()
// 修改信息
let drawer = ref(false);
let roomId = ref();
let formRef = ref();
// interface nodeType {
//     id: string,
//     deviceId: string,
//     roomId: string,
//     numberId: string,
// }
// let nodes = ref<nodeType[]>()
let nodes = ref([])
let nodeParams = reactive({
    id: '',
    deviceId: '',
    roomId: '',
    numberId: '',
})
onMounted(() => {
    getNode();

})
const handler = () => {
    getNode()
}
const list = ref([])
const options = ref([])
const searchroom = ref()
const loading = ref(false)
const remoteMethod = (query) => {
    if (query) {
        loading.value = true
        setTimeout(() => {
            loading.value = false
            options.value = list.value.filter((item) => {
                return item.label.toLowerCase().includes(query.toLowerCase())
            })
        }, 200)
    } else {
        options.value = list.value;
    }
}
let states = [
]
const getNode = async (pager = 1, roomid = 0) => {
    //收集当前页码
    pageNo.value = pager;
    roomId.value = roomid;
    // storey = 0 获取全部
    let result = await reqGetNode(pageNo.value, roomId.value);
    if (result) {
        total.value = result.nodes_count;
        nodes.value = result.nodes;
    } else {
        ElNotification({ type: 'error', message: '获取节点失败' });
    }
    result = await reqRoomsInfo();
    try {
        states = result.names;

    } catch (error) {
        ElNotification({ type: 'error', message: '获取房间信息失败' });
    }
    list.value = states.map((item) => {
        return { value: `value:${item.id}`, label: `房间名:${item.name} 房间ID:${item.id}` }
    })
}
const reSet = () => {
    settingStore.refsh = !settingStore.refsh;
}
const deleteNode = async (id) => {
    //收集当前页码
    let result = await reqDeleteNode(id);
    if (result) {
        if (result.error_message === 'success') {
            getNode(nodes.value.length > 1 ? pageNo.value : pageNo.value - 1)
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
const AlldeleteNode = async () => {
    if (tableCount.value > 0) {
        table.value?.forEach((item) => {
            deleteNode(item)
        })
    }
}
const addNode = () => {
    drawer.value = true;
    // 存储收集已有的账号信息
    Object.assign(nodeParams, {
        id: '',
        deviceId: '',
        roomId: '',
        numberId: '',
    });
    nextTick(() => {
        formRef.value.clearValidate('id')
        formRef.value.clearValidate('deviceId')
        formRef.value.clearValidate('roomId')
        formRef.value.clearValidate('numberId')
    })
}
const updateNode = (raw) => {
    drawer.value = true;
    // selectroom.value = roomId;
    Object.assign(nodeParams, raw);
    nextTick(() => {
        formRef.value.clearValidate('id')
        formRef.value.clearValidate('deviceId')
        formRef.value.clearValidate('roomId')
        formRef.value.clearValidate('numberId')
    })
}
//保存按钮的回调
const save = async () => {
    await formRef.value.validate();
    drawer.value = false;
    let result = await reqAddNode(nodeParams);
    if (result.error_message === 'success') {
        ElNotification({ type: 'success', message: nodeParams.id ? '更新成功' : '添加成功' });
        // window.location.reload();
        reSet();

    } else {
        drawer.value = false;
        ElNotification({ type: 'error', message: nodeParams.id ? '更新失败' : '添加失败' });
    }
    console.log(result.error_message);
}
const cancel = () => {
    drawer.value = false;
}
// const rules = {
//     deviceId: [
//         { required: true, message: '请输入设备名称', trigger: 'blur' },
//         { min: 0, max: 6, message: '长度应该在0到6之间', trigger: 'blur' },
//     ],
//     roomId: [
//         { required: true, message: '请输入房间ID', trigger: 'blur' },
//         { min: 0, max: 6, message: '长度应该在0到6之间', trigger: 'blur' },
//     ],
//     numberId: [
//         { required: true, message: '请输入第几个设备', trigger: 'blur' },
//         { min: 0, max: 6, message: '长度应该在0到6之间', trigger: 'blur' },
//     ],
// }
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
    width: 70px;
    height: 30px;
    /* background: linear-gradient(to top, #00154c, #12376e, #23487f); */
    background: #fff;
    border-color: #ccccd8;
    border-radius: 50px;
    outline: none;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    margin-inline: 10px;

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
