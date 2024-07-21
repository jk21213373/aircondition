<template>
    <el-card style="height:80px;">
        <el-form @submit.native.prevent :inline="true" class="form">
            <el-form-item label="用户名：">
                <el-input placeholder="请你输入搜索用户名" v-model="keyword"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button class="btn" type="primary" size="default" @click="scearch"><span>搜索</span></el-button>
                <el-button class="btn" type="primary" size="default" @click="reset"><span>重置</span></el-button>
            </el-form-item>
        </el-form>
    </el-card>
    <el-card style="margin:10px 0px;">
        <el-button class="btn" type="primary" size="default" @click="addUser"><span>添加用户</span></el-button>
        <el-button class="btn" type="primary'" size="default" :disabled="selectIdArr.length ? false : true"
            @click="deleteSelectUser"><span>批量删除</span></el-button>
        <el-table @selection-change="selectChange" style="margin:10px 0px;" :data="userArr">
            <el-table-column type="selection" align="center"></el-table-column>
            <el-table-column label="#" align="center" type="index"></el-table-column>
            <el-table-column label="ID" align="center" prop="userId"></el-table-column>
            <el-table-column label="用户名字" align="center" prop="name" show-overflow-tooltip></el-table-column>
            <el-table-column label="用户类型" align="center" prop="type" show-overflow-tooltip></el-table-column>
            <el-table-column label="创建时间" align="center" prop="createTime" show-overflow-tooltip></el-table-column>
            <el-table-column label="是否启用" align="center" prop="defunct" show-overflow-tooltip>
                <template #default="scope">
                    <el-switch style="--el-switch-on-color: #141c42" v-model="scope.row.defunct" active-value="Y"
                        inactive-value="N" @change="changeStatus(scope.row)" />
                </template>
            </el-table-column>
            <el-table-column label="操作" width="300px" align="center">
                <template #="{ row, $index }">
                    <el-button class="btn" type="primary" size="small" @click="roomPermission(row)"><el-icon
                            style="color: #555666;">
                            <User />
                        </el-icon>
                        <span>权限分配</span></el-button>
                    <el-popconfirm :title="`你确定要删除${row.name}?`" width="260px" @confirm="deleteUser(row.userId)">
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
        <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :background="true"
            layout="prev,pager,next,jumper,->,total" :total="total" @current-change="getHasUser" @size-change="handler"
            class="el-pagination" />
    </el-card>
    <el-drawer v-model="drawer">
        <template #header>
            <h4>{{ userParams.id ? '分配房间权限' : '添加用户' }}</h4>
        </template>
        <el-form :model="userParams" :rules="rules" ref="formRef" v-if="userParams.id == ''">
            <el-form-item label="用户ID " prop="userId">
                <el-input class="input-reader-name" placeholder="请您输入用户ID" v-model="userParams.userId"></el-input>
            </el-form-item>
            <el-form-item label="用户姓名" prop="username">
                <el-input placeholder="请您输入用户姓名" v-model="userParams.username"></el-input>
            </el-form-item>
            <el-form-item label="用户密码" prop="password_first">
                <el-input type="password" placeholder="请您输入用户密码" v-model="userParams.password_first"
                    show-password></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="password_second">
                <el-input type="password" :prefix-icon="Lock" v-model="userParams.password_second" show-password
                    placeholder="确认密码"></el-input>
            </el-form-item>
        </el-form>
        <el-checkbox-group v-model="userrooms" v-else>
            <el-row :gutter="10">
                <el-col v-for="room in rooms" :key="room" :span="15">
                    <el-checkbox :label="room" style="margin: 1px 0;" :value="room" border> 房间id：{{ room.id }} ，房间名：{{
                        room.name }}</el-checkbox>
                </el-col>
            </el-row>
        </el-checkbox-group>
        I<template #footer>
            <div style="flex:auto">
                <el-button class="btn" @click="cancel"><span>取消</span></el-button>
                <el-button class="btn" type="primary" @click="save"><span>确定</span></el-button>
            </div>
        </template>
    </el-drawer>
</template>

<script setup>
import { ref, onMounted, reactive, nextTick } from 'vue';
import { reqUserInfo, reqRoomInfo, reqRoomsInfo, postRoomsInfo, reqRemoveUser, checkUserInfo, changeUserStatus } from '@/api/acl/index.ts';
import { ElNotification } from 'element-plus';
import useLayOutSettingStore from '@/store/modules/setting';
let settingStore = useLayOutSettingStore();
//默认页码
let pageNo = ref(1);
//一页展示几条数据
let pageSize = ref(8);
let total = ref(0);
let userArr = ref([]);
let drawer = ref(false);
let userParams = reactive({
    id: '',
    userId: '',
    username: '',
    password_first: '',
    password_second: '',

})
let formRef = ref();
let keyword = ref();
let selectIdArr = ref([]);
const rooms = ref([]);
const userrooms = ref([]);

onMounted(() => {
    console.log("11111111111")
    getHasUser();
})
const roomPermission = async (row) => {
    drawer.value = true;
    userParams.id = row.userId;
    try {
        let result = await reqRoomInfo(row.userId);
        userrooms.value = result.assigns;
        console.log(result)
        console.log('result已打印')
    } catch (error) {
        ElNotification({
            type: 'error',
            message: "获取用户房间信息失败"
        })
    }
}
const getHasUser = async (pager = 1) => {
    //收集当前页码
    pageNo.value = pager;
    try {
        let result = await reqUserInfo(pageNo.value);
        total.value = result.users_count;
        console.log(result)
        userArr.value = result.users;
    } catch (error) {
        ElNotification({
            type: 'error',
            message: "获取用户信息失败"
        })
    }
    try {
        let result = await reqRoomsInfo();
        rooms.value = result.names;
    } catch (error) {
        ElNotification({
            type: 'error',
            message: "获取房间信息失败"
        })
    }
}

const handler = () => {
    getHasUser()
}
const addUser = () => {
    drawer.value = true;
    Object.assign(userParams, {
        id: '',
        userId: '',
        username: '',
        password_first: '',
        password_second: '',
    });
    nextTick(() => {
        userParams.value.clearValidate('userId');
        userParams.value.clearValidate('username');
        userParams.value.clearValidate('password_first');
        userParams.value.clearValidate('password_second');
    });
}
const save = async () => {
    if (!userParams.id) {
        await formRef.value.validate();
        drawer.value = false;
        let result = await postRoomInfo({
            userId: userParams.userId,
            username: userParams.username,
            password: userParams.password_first,
            confirmedPassword: userParams.password_second
        });
        if (result.error_message == "success") {
            window.location.reload();
            ElNotification({
                type: 'success',
                message: '添加成功',
            })
        } else {
            ElNotification({
                type: 'error',
                message: "添加失败"
            })
        }
    } else {
        drawer.value = false;
        let result = await postRoomsInfo(userrooms.value);
        if (result.error_message == "success") {
            window.location.reload();
            ElNotification({
                type: 'success',
                message: '分配成功',
            })
        } else {
            ElNotification({
                type: 'error',
                message: "分配失败"
            })
        }
        userParams.id = '';
    }
}
const cancel = () => {
    drawer.value = false;
    userParams.id = '';
}
const changeStatus = async (row) => {
    try {
        await changeUserStatus(row.userId);
    } catch (error) {
        console.log(error);
    }
}
const validatorUsername = (rule, value, callBack) => {
    //用户名字I呢称，长度至少五位
    if (value.trim().length >= 5) {
        callBack();
    } else {
        callBack(new Error('用户名字至少五位'))
    }
}
const validatorUserId = (rule, value, callBack) => {
    //用户名字I呢称，长度至少五位
    if (value.trim().length >= 5) {
        callBack();
    } else {
        callBack(new Error('用户ID至少五位'))
    }
}
const validatorPasswordFirst = (rule, value, callback) => {
    if (value.length === 0) {
        callback(new Error('请输入密码'))
    } else if (value.length < 6 || value.length > 16) {
        callback(new Error('密码应为6~16位的任意组合'))
    } else {
        callback()
    }
}
const validatorPasswordSecond = (rule, value, callback) => {
    if (value.length === 0) {
        callback(new Error('密码不能为空'))
    } else if (userParams.password_first != userParams.password_second) {
        callback(new Error('两次输入密码不一致！'))
    } else {
        callback()
    }
}
const rules = {
    userId: [
        {
            trigger: 'blur',
            validator: validatorUserId,
        },
    ],
    username: [
        {
            trigger: 'blur',
            validator: validatorUsername,
        },
    ],
    password_first: [
        {
            trigger: 'blur',
            validator: validatorPasswordFirst,
        },
    ],
    password_second: [
        {
            trigger: 'blur',
            validator: validatorPasswordSecond,
        },
    ],
}
const scearch = async () => {

    let result = await checkUserInfo(keyword.value);
    total.value = result.users_count;
    userArr.value = result.users;
    console.log(result);
    if (result.error_message == "success") {
        ElNotification({
            type: 'success',
            message: "搜索用户信息成功"
        })
    } else {
        // userArr.value = [];
        ElNotification({
            type: 'error',
            message: "搜索用户信息失败"
        })
    }
    keyword.value = '';
    //     reset();
}

const deleteUser = async (userId) => {
    let result;
    try {
        result = await reqRemoveUser(userId);
        getHasUser(userArr.value.length > 1 ? pageNo.value : pageNo.value - 1);
    } catch (error) {
        console.log(result + "00000000000000000")
        ElNotification({
            type: 'error',
            message: "删除失败"
        })
    }
}
const selectChange = (value) => {
    selectIdArr.value = value;
}
const deleteSelectUser = () => {
    try {
        for (var i = 0; i < selectIdArr.value.length; i++) {
            deleteUser(i);
        }
        ElNotification({
            type: 'success',
            message: '删除成功',
        })
    } catch (error) {
        ElNotification({
            type: 'error',
            message: "删除失败"
        })
    }
}
const reset = () => {
    settingStore.refsh = !settingStore.refsh;
}
</script>

<style scoped lang="scss">
.form {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.input-reader-name {
    margin-left: 13px;
}

.btn {
    width: 90px;
    height: 33px;
    /* background: linear-gradient(to top, #00154c, #12376e, #23487f); */
    // background: linear-gradient(to right, #1d335f, #204667, #1f506b);
    // background: linear-gradient(to right, #2e3863, #435a91, #31426b);
    background: #fff;
    border-radius: 50px;
    // border-color: black;
    // border-color: #555666;
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
    // color: black;
    color: #555666;
    transition: top 0.5s;
}
</style>
