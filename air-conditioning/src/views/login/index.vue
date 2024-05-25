<template>
    <div class="login_container">
        <el-row>
            <el-col :span="12" :xs="0"> </el-col>
            <el-col :span="12" :xs="24">
                <el-form class="login_form" :model="loginForm" :rules="rules" ref="loginForms">
                    <h1>Hello</h1>
                    <h2>欢迎来到硅谷甄选</h2>
                    <el-form-item prop="username">
                        <el-input :prefix-icon="User" v-model="loginForm.username"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input type="password" :prefix-icon="Lock" v-model="loginForm.password"
                            show-password></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button :loading="loading" class="login_btn" type="primary" size="default"
                            @click="login">登录</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang='ts'>

import { User, Lock } from '@element-plus/icons-vue';
import { reactive, ref } from 'vue';
import useUserStore from '@/store/modules/user';
import { useRouter, useRoute } from 'vue-router';
import { ElNotification } from 'element-plus';
import { getTime } from '@/utils/time';
let $router = useRouter();
let useStore = useUserStore();
let loginForms = ref();
let $route = useRoute();

//收集账号与密码的数据
let loginForm = reactive({ username: 'admin', password: '111111' })
let loading = ref(false)
const login = async () => {
    await loginForms.value.validate()
    loading.value = true
    try {
        //保证登录成功
        //promise判断
        await useStore.userLogin(loginForm);
        //编程式导航跳转到展示数据首页
        let redirect: any = $route.query.redirect;
        $router.push({ path: redirect || '/' });
        ElNotification({
            type: 'success',
            message: '登录成功',
            title: `Hi,${getTime()}好`
        })
        loading.value = false
    } catch (error) {
        loading.value = false
        ElNotification({
            type: 'error',
            message: "budui"
        })
    }
}

//自定义校验规则函数
const validatorUsername = (rule: any, value: any, callback: any) => {
    //console.log("8888888888888" + value);
    if (value.length === 0) {
        callback(new Error('请输入账号'))
    } else {
        callback()
    }
}
const validatorPassword = (rule: any, value: any, callback: any) => {
    // console.log(value?.length + "8888888888888");
    if (value.length === 0) {
        callback(new Error('请输入密码'))
    } else if (value.length < 6 || value.length > 16) {
        callback(new Error('密码应为6~16位的任意组合'))
    } else {
        callback()
    }
}

const rules = {
    username: [
        {
            trigger: 'change',
            validator: validatorUsername,
        },
    ],
    password: [
        {
            trigger: 'change',
            validator: validatorPassword,
        },
    ],
}
</script>

<style scoped lang="scss">
.login_container {
    width: 100%;
    height: 100vh;
    background: url('@/assets/images/background.jpg') no-repeat;
    // background: red no-repeat;
    background-size: cover;
    padding: 40px;

    h1 {
        color: white;
        font-size: 40px;
    }

    h2 {
        font-size: 20px;
        color: white;
        margin: 20px 0px;
    }

    .login_btn {
        width: 100%
    }
}

.login_form {
    position: relative;
    width: 80%;
    top: 30vh;
    background: url("@/assets/images/login_form.png") no-repeat;
    background-size: cover;
}
</style>
