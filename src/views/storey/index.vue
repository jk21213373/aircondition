<template>
    <el-card style="margin:10px 0px;">
        <el-button class="btn" type="primary" size="default" @click="addStorey"><span>添加楼层</span></el-button>
        <el-popconfirm :title="`你确定要删除?`" width="260px" @confirm="AlldeleteStorey()">
            <template #reference>
                <el-button class="btn" type="primary'" size="default"
                    :disabled="table.length ? false : true"><span>批量删除</span></el-button>
            </template>
        </el-popconfirm>
        <el-table style="margin:10px 0px;border" :data="stroeys" @selection-change="updateTable">
            <el-table-column type="selection" align="center"></el-table-column>
            <el-table-column label="序号" width="80px" align="center" type="index"></el-table-column>
            <el-table-column label="ID" align="center" prop="id"></el-table-column>
            <el-table-column label="楼层名" align="center" prop="name" show-overflow-tooltip></el-table-column>
            <el-table-column label="操作" width="300px" align="center">
                <template #="{ row, $index }">
                    <el-button class="btn" type="primary" size="small" @click="updateStorey(row)">
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
    </el-card>
    <el-drawer v-model="drawer">
        <template #header>
            <h4>{{ storeyParams.id ? '更新楼层' : '添加楼层' }}</h4>
        </template>
        <el-form :model="storeyParams" :rules="rules" ref="formRef">
            <el-form-item label="楼层名称" prop="name">
                <el-input placeholder="请您输入楼层名称" v-model="storeyParams.name"></el-input>
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
import { reqGetStroey, reqDeleteStorey, reqAddStorey } from '@/api/storey'
import { ElMessage } from 'element-plus';
import useLayOutSettingStore from '@/store/modules/setting';
let settingStore = useLayOutSettingStore();
const reset = () => {
    settingStore.refsh = !settingStore.refsh;
}
//楼层数组
let stroeys = ref([]);
// 多选框
let table = ref([])
let tableCount = ref(0)
// 修改信息
let drawer = ref(false);


let formRef = ref();
let storeyParams = reactive({
    id: '',
    name: '',
})
onMounted(() => {
    getStorey();
})
const getStorey = async () => {
    let result = await reqGetStroey();
    if (result) {
        stroeys.value = result;
    }
}
const deleteStorey = async (id) => {
    let result = await reqDeleteStorey(id);
    if (result) {
        if (result.error_message === 'success') {
            getStorey();//没有分页
            ElMessage({ type: 'success', message: '删除成功' });
        } else {
            ElMessage({ type: 'success', message: '删除失败' });
        }
    } else {
        ElMessage({ type: 'success', message: '删除失败!' });
    }
}
const updateTable = (selection) => {
    table.value = selection.map(item => item.id)
    tableCount.value = selection.length
}
const AlldeleteStorey = async () => {
    if (tableCount.value > 0) {
        table.value?.forEach((item) => {
            deleteStorey(item)
        })
    }
}
const addStorey = () => {
    drawer.value = true;
    // 存储收集已有的账号信息
    Object.assign(storeyParams, {
        id: '',
        name: ''
    })
    nextTick(() => {
        formRef.value.clearValidate('name');
    });
}
const updateStorey = (raw) => {
    drawer.value = true;
    Object.assign(storeyParams, raw);
    nextTick(() => {
        formRef.value.clearValidate('name');
    });
}
//保存按钮的回调
const save = async () => {
    await formRef.value.validate();
    drawer.value = false;
    let result = await reqAddStorey(storeyParams);
    if (result && result.error_message === 'success') {
        ElMessage({ type: 'success', message: storeyParams.id ? '更新成功' : '添加成功' });
        // window.location.reload();
        reset();
        // getStorey();
    } else {
        ElMessage({ type: 'error', message: storeyParams.id ? '更新失败' : '添加失败' });
    }
}
const cancel = () => {
    drawer.value = false;
}
const rules = {
    name: [
        { required: true, message: '请输入楼层名称', trigger: 'blur' },
        { min: 0, max: 6, message: '长度应该在0到6之间', trigger: 'blur' },
    ]
}
</script>

<style scoped>
.form {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.btn {
    width: 90px;
    height: 33px;
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
