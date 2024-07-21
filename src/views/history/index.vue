<template>
    <el-card style="margin:10px 0px;">
        <el-popconfirm :title="`你确定要删除?`" width="260px" @confirm="AllDeleteHistory()">
            <template #reference>
                <el-button type="primary'" size="default" class="btn"
                    :disabled="table.length ? false : true"><span>批量删除</span></el-button>
            </template>
        </el-popconfirm>
        <el-table style="margin:10px 0px;" border :data="userArr" @selection-change="updateTable">
            <el-table-column type="selection" align="center"></el-table-column>
            <el-table-column width="55" label="序号" align="center" type="index"></el-table-column>
            <el-table-column width="50" label="ID" align="center" prop="id"></el-table-column>
            <el-table-column width="70" label="结点ID" align="center" prop="nodeId"
                show-overflow-tooltip></el-table-column>
            <el-table-column width="90" label="发送时间" align="center" prop="time" show-overflow-tooltip></el-table-column>
            <el-table-column width="90" label="由谁发出" align="center" prop="userId"
                show-overflow-tooltip></el-table-column>
            <el-table-column width="90" label="控制温度" align="center" prop="temperature"
                show-overflow-tooltip></el-table-column>
            <el-table-column width="60" label="模式" align="center" prop="mode" show-overflow-tooltip></el-table-column>
            <el-table-column width="60" label="风速" align="center" prop="wind" show-overflow-tooltip></el-table-column>
            <el-table-column width="60" label="cmd" align="center" prop="cmd" show-overflow-tooltip></el-table-column>
            <el-table-column width="60" label="ip" align="center" prop="ip" show-overflow-tooltip></el-table-column>
            <el-table-column width="60" label="uuid" align="center" prop="uuid" show-overflow-tooltip></el-table-column>
            <el-table-column label="操作" width="180px" align="center">
                <template #="{ row, $index }">
                    <el-popconfirm :title="`你确定要删除  ${row.id}?`" width="260px" @confirm="deleteHistory(row.id)">
                        <template #reference>
                            <el-button class="btn" type="primary" size="small">
                                <el-icon style="color: #555666;">
                                    <Delete />
                                </el-icon>
                                <span>删除</span></el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination v-model:current-page="pageNo" :background="true" layout="prev,pager,next,jumper,->,sizes,total"
            :total="total" @current-change="getHistory" @size-change="handler" />
    </el-card>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { reqGetHistory, reqDeleteHistory } from '@/api/history'
//默认页码
let pageNo = ref(1);
//一页展示几条数据
let total = ref(0);
let userArr = ref([{
    id: 1, nodeId: 2, time: 3, userId: 4, temperature: 5, mode: 6, wind: 7, cmd: 8, ip: 9, uuid: 10
}]);
// 多选框
let table = ref([])
let tableCount = ref(0)

onMounted(() => {
    getHistory();
})
const getHistory = async (pager = 1) => {
    //收集当前页码
    pageNo.value = pager;
    let result = await reqGetHistory(pageNo.value);
    if (result) {
        total.value = result.list_count;
        userArr.value = result.list;
    }
}
const deleteHistory = async (id) => {
    //收集当前页码
    let result = await reqDeleteHistory(id);
    if (result) {
        if (result.error_message === 'success') {
            // getHistory();
            getHistory(userArr.value.length > 1 ? pageNo.value : pageNo.value - 1)
            // ElMessage({ type: 'error', message: '删除成功' });
        } else {
            // console.log('historey delete ' + result.error_message)
            ElMessage({ type: 'error', message: result.error_message });
        }
    } else {
        ElMessage({ type: 'error', message: '删除失败' });
    }
}
const updateTable = (selection) => {
    table.value = selection.map(item => item.id)
    tableCount.value = selection.length
}
const AllDeleteHistory = async () => {
    if (tableCount.value > 0) {
        table.value?.forEach((item) => {
            deleteHistory(item)
        })
    }
}


</script>

<style scoped>
.form {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.btn {
    width: 83px;
    height: 28px;
    /* background: linear-gradient(to top, #00154c, #12376e, #23487f); */
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
</style>
