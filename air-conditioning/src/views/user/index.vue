<template>
    <el-card style="height:80px;">
        <el-form :inline="true" class="form">
            <el-form-item label="用户名：">
                <el-input placeholder="请你输入搜索用户名"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="default">搜索</el-button>
                <el-button type="primary" size="default">重置</el-button>
            </el-form-item>
        </el-form>
    </el-card>
    <el-card style="margin:10px 0px;">
        <el-button type="primary" size="default" @click="addUser">添加用户</el-button>
        <el-button type="primary'" size="default">批量删除</el-button>
        <el-table style="margin:10px 0px;" border :data="userArr">
            <el-table-column type="selection" align="center"></el-table-column>
            <el-table-column label="#" align="center" type="index"></el-table-column>
            <el-table-column label="ID" align="center" prop="id"></el-table-column>
            <el-table-column label="用户名字" align="center" prop="username" show-overflow-tooltip></el-table-column>
            <!-- <el-table-column label="用户名称" align="center" prop="name" show-overflow-tooltip></el-table-column> -->
            <el-table-column label="用户类型" align="center" prop="roleName" show-overflow-tooltip></el-table-column>
            <el-table-column label="创建时间" align="center" prop="createTime" show-overflow-tooltip></el-table-column>
            <el-table-column label="权限信息" align="center" prop="quanxianxinxi" show-overflow-tooltip></el-table-column>
            <el-table-column label="是否启用" align="center" prop="shifouqiyong" show-overflow-tooltip>
                <template #default="scope">
                    <el-switch v-model="scope.row.changer" :before-change="beforeChange" />
                </template>
            </el-table-column>
            <el-table-column label="操作" width="300px" align="center">
                <template #="{ row, $index }">
                    <el-button type="primary" size="small" icon="User">权限分配</el-button>
                    <el-button type="primary" size="small" icon="Edit" @click="updateuser(row)">编辑</el-button>
                    <el-popconfirm :title="`你确定要删除${row.username}?`" width="260px" @confirm="deleteUser(row.id)">
                        <template #reference>
                            <el-button type="primary" size="small" icon="Delete">删除</el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[5, 7, 9, 11]"
            :background="true" layout="prev,pager,next,jumper,->,sizes,total" :total="total"
            @current-change="getHasUser" @size-change="handler" />
    </el-card>
    <el-drawer v-model="drawer">
        <template #header>
            <h4>{{ userParams.id ? '更新用户' : '添加用户' }}</h4>
        </template>
        <el-form :model="userParams" :rules="rules" ref="formRef">
            <el-form-item label="用户姓名" prop="username">
                <el-input placeholder="请您输入用户姓名" v-model="userParams.username"></el-input>
            </el-form-item>
            <el-form-item label="用户密码" prop="password">
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
                <el-button @click="cancel">取消</el-button>
                <el-button type="primary" @click="save">确定</el-button>
            </div>
        </template>
    </el-drawer>
</template>

<script setup>
import { ref, onMounted, reactive, nextTick } from 'vue';
import { reqUserInfo, reqAddOrUpdateUser } from '@/api/acl/user'
//默认页码
let pageNo = ref(1);
//一页展示几条数据
let pageSize = ref(5);
let total = ref(0);
let userArr = ref([]);
let drawer = ref(false);
let userParams = reactive({
    id: '',
    username: '',
    password: '',
    rolename: ['超级用户']
})
let formRef = ref();
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
    Object.assign(userParams, {
        id: '',
        username: '',
        password: '',
        rolename: ['超级用户']
    });
    nextTick(() => {
        formRef.value.clearValidate('username');
        formRef.value.clearValidate('password');
    });
}
const updateuser = (raw) => {
    drawer.value = true;
    //存储收集已有的账号信息
    Object.assign(userParams, raw);
    nextTick(() => {
        formRef.value.clearValidate('username');
    });
}
//保存按钮的回调
const save = async () => {
    await formRef.value.validate();
    //保存按纽：添加新的用户|更新已有的用户账号信息
    let result = await reqAddOrUpdateUser(userParams);
    //添加或者更新成功
    if (result.code = 200) {
        //关闭抽屉
        drawer.value = false;
        //提示消息
        ElMessage({ type: 'success', message: userParams.id ? '更新成功' : '添加成功' });
        // getHasUser(userParams.id ? pageNo.value : 1);
        window.location.reload();
    } else {
        //关闭抽屉
        drawer.value = false;
        //提示消息
        ElMessage({ type: 'error', message: userParams.id ? '更新失败' : '添加成功' });
    }
}
const cancel = () => {
    drawer.value = false;
}
const validatorUsername = (rule, value, callBack) => {
    //用户名字I呢称，长度至少五位
    if (value.trim().length >= 5) {
        callBack();
    } else {
        callBack(new Error('用户名字至少五位'))
    }
}
const validatorPassword = (rule, value, callBack) => {
    //用户名字|呢称，长度至少五位
    if (value.trim().length >= 6) {
        callBack();
    }
    else {
        callBack(new Error('用户密码至六位'))
    }
}
const rules = {
    username: [{ required: true, trigger: 'blur', validator: validatorUsername }],
    //用户的密码
    password: [{ required: true, trigger: 'blur', validator: validatorPassword }],
}
</script>

<style scoped>
.form {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>
