<template>
    <div class="container">
        <div class="app-container">
            <div class="left">
                <el-input style="margin-bottom:10px" type="text" prefix-icon="el-icon-sear"></el-input>
                <!--树形组件-->
                <Tree></Tree>
                <!-- <el-tree style="max-width: 600px" :data="data" :props="defaultProps" @node-click="handleNodeClick" /> -->
            </div>
            <div class="right">
                <!--表格组件-->
                <el-card style="margin:10px 0px;">
                    <el-button type="primary" size="default" @click="addUser">添加用户</el-button>
                    <el-button type="primary'" size="default">批量删除</el-button>
                    <el-table style="margin:10px 0px;" border :data="userArr">
                        <el-table-column type="selection" align="center"></el-table-column>
                        <el-table-column label="第几个" align="center" type="index"></el-table-column>
                        <el-table-column label="设备ID" align="center" prop="id"></el-table-column>
                        <el-table-column label="楼层名" align="center" prop="username"
                            show-overflow-tooltip></el-table-column>
                        <!-- <el-table-column label="用户名称" align="center" prop="name" show-overflow-tooltip></el-table-column> -->
                        <el-table-column label="房间名" align="center" prop="roleName"
                            show-overflow-tooltip></el-table-column>
                        <el-table-column label="节假日开关时间" align="center" prop="createTime"
                            show-overflow-tooltip></el-table-column>
                        <el-table-column label="工作日开关时间" align="center" prop="quanxianxinxi"
                            show-overflow-tooltip></el-table-column>
                        <el-table-column label="操作" width="180px" align="center">
                            <template #="{ row, $index }">
                                <el-button type="primary" size="small" icon="Edit"
                                    @click="updateuser(row)">编辑</el-button>
                                <el-button type="primary" size="small" icon="Delete">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize"
                        :page-sizes="[5, 7, 9, 11]" :background="true" layout="prev,pager,next,jumper,->,sizes,total"
                        :total="total" @current-change="getHasUser" @size-change="handler" />
                </el-card>
                <!--分页-->
                <el-drawer v-model="drawer">
                    <template #header>
                        <h4>添加用户</h4>
                    </template>
                    <el-form>
                        <el-form-item label="用户姓名">
                            <el-input placeholder="请您输入用户姓名" v-model="userParams.username"></el-input>
                        </el-form-item>
                        <el-form-item label="用户密码">
                            <el-input placeholder="请您输入用户密码" v-model="userParams.password"></el-input>
                        </el-form-item>
                        <el-form-item label="用户类型">
                            <el-checkbox-group v-model="userParams.rolename" :min="0" :max="1">
                                <el-checkbox v-for="role in roles" :key="role" :label="role" :value="role">
                                    {{ role }}
                                </el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                    </el-form>
                    I<template #footer>
                        <div style="flex:auto">
                            <el-button>取消</el-button>
                            <el-button type="primary" @click="save">确定</el-button>
                        </div>
                    </template>
                </el-drawer>
            </div>
        </div>
    </div>
</template>
<script setup>
import Tree from '@/views/tree/index.vue';
import { ref, onMounted, reactive } from 'vue';
import { reqUserInfo, reqAddOrUpdateUser } from '@/api/acl/user'
//默认页码
let pageNo = ref(1);
//一页展示几条数据
let pageSize = ref(5);
let total = ref(0);
let userArr = ref([]);
let drawer = ref(false);
let qiyong = ref(false);
let userParams = reactive({
    username: '',
    password: '',
    rolename: ['超级用户'],
    id: ''
})
const checkList = ref(['Value A']);
const roles = ['超级用户', '运维人员', '展示人员', '普通用户'];
onMounted(() => {
    getHasUser();

})
const getHasUser = async (pager = 1) => {
    //收集当前页码
    pageNo.value = pager;
    let result = await reqUserInfo(pageNo.value, pageSize.value);
    if (result.code == 200) {
        total.value = result.data.total;
        userArr.value = result.data.records;
    }
}
const handler = () => {
    getHasUser()
}
const addUser = () => {
    drawer.value = true;
}
const updateuser = (raw) => {
    drawer.value = true;
}
//保存按钮的回调
const save = async () => {
    //保存按纽：添加新的用户|更新已有的用户账号信息
    let result = await reqAddOrUpdateUser(userParams);
    //添加或者更新成功
    if (result.code = 200) {
        //关闭抽屉
        drawer.value = false;
        //提示消息
        ElMessage({ type: 'success', message: userParams.id ? '更新成功' : '添加成功' });
        getHasUser();
    } else {
        //关闭抽屉
        drawer.value = false;
        //提示消息
        ElMessage({ type: 'success', message: userParams.id ? '更新失败' : '添加成功' });
    }
}
</script>

<style scoped lang='scss'>
.app-container {
    background: #FFF;
    display: flex;

    .left {
        width: 200px;
        padding: 20px;
        border-right: 1px solid #eaeef4;
    }

    .right {
        flex: 1;
        padding: 10px;
        position: absolute;
        width: calc(100% - 230px);
        left: 230px;
        overflow: auto;
    }
}
</style>
