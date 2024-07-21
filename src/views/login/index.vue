<template>
    <div class="login_container">
        <Particles id="tsparticles" class="login-partic" :options="options" />
        <div class="top">
            <Top />
        </div>
        <el-form class="form" :model="loginForm" :rules="loginRules" ref="loginForms">
            <div class="form-title"><span>sign in to your</span></div>
            <div class="title-2"><span>SPACE</span></div>
            <el-form-item class="input-container" prop="username">
                <el-input class="input-username" :prefix-icon="User" type="username" placeholder="Enter username"
                    v-model="loginForm.username" />
                <span> </span>
            </el-form-item>
            <section class="bg-stars">
                <span class="star"></span>
                <span class="star"></span>
                <span class="star"></span>
                <span class="star"></span>
            </section>
            <el-form-item class="input-container" prop="password">
                <el-input class="input-pwd" :prefix-icon="Lock" v-model="loginForm.password" show-password
                    type="password" placeholder="Enter password" />
            </el-form-item>
            <el-form-item>
                <el-button :loading="loading" type="submit" class="submit" @click="login">
                    <span class="sign-text">Sign in</span>
                </el-button>
            </el-form-item>

            <p class="signup-link">
                No account?
                <a href="/#/register" class="up">Sign up!</a>
            </p>

        </el-form>
    </div>
</template>

<script setup lang='ts'>
import { User, Lock } from '@element-plus/icons-vue';
import { reactive, ref, nextTick, onMounted, toRefs } from 'vue';
import useUserStore from '@/store/modules/user';
import { useRouter, useRoute } from 'vue-router';
import { ElNotification } from 'element-plus';
import { getTime } from '@/utils/time';
import Top from './top/index.vue';
import { reqConnect, reqAddAll } from '@/api/user/index.ts';
let $router = useRouter();
let useStore = useUserStore();
let loginForms = ref();
let $route = useRoute();
//收集账号与密码的数据
let loginForm = reactive({ username: '', password: '' });
let loading = ref(false)
let routes = ['/user', '/room', '/screen'];
onMounted(() => {
    Object.assign(loginForm, {
        username: '111',
        password: '111111',
    });
    nextTick(() => {
        loginForms.value.clearValidate('username');
        loginForms.value.clearValidate('password');
    });
})
const login = async () => {
    await loginForms.value.validate()
    loading.value = true
    try {
        //保证登录成功
        //promise判断
        await useStore.userLogin(loginForm);
        //编程式导航跳转到展示数据首页
        // if($route.query.redirect === null|| $route.query.redirect === ''||$route.query.redirect === unde)
        let redirect: any = $route.query.redirect;
        try {
            await useStore.userInfo();
            $router.push({ path: redirect || routes[Number(useStore.type) - 1] });
        } catch (error) {
            await useStore.userLogout()
            ElNotification({
                type: 'error',
                message: "获取用户信息失败"
            })
            $router.push('/login');
        }
        try {
            await reqConnect();
            await reqAddAll();
            // $router.push({ path: redirect || routes[Number(useStore.type) - 1] });
        } catch (error) {
            await useStore.userLogout()
            ElNotification({
                type: 'error',
                message: "获取信息失败"
            })
            $router.push('/login');
        }
        // console.log(Number(useStore.type))
        ElNotification({
            type: 'success',
            message: '登录成功',
            title: `Hi,${useStore.username + getTime()}好`
        })
        loading.value = false
    } catch (error) {
        loading.value = false
        ElNotification({
            type: 'error',
            message: "登录失败"
        })
    }
}

//自定义校验规则函数
const validatorUsername = (rule: any, value: any, callback: any) => {
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
    } else if (value.length < 0 || value.length > 16) {
        callback(new Error('密码应为6~16位的任意组合'))
    } else {
        callback()
    }
}

const loginRules = {
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
const data = reactive({
    options: {
        fpsLimit: 60,
        interactivity: {
            detectsOn: 'canvas',
            events: {
                onClick: { // 开启鼠标点击的效果
                    enable: true,
                    mode: 'push'
                },
                onHover: { // 开启鼠标悬浮的效果(线条跟着鼠标移动)
                    enable: true,
                    mode: 'grab'
                },
                resize: true
            },
            modes: { // 配置动画效果
                bubble: {
                    distance: 400,
                    duration: 2,
                    opacity: 0.8,
                    size: 40
                },
                push: {
                    quantity: 4
                },
                grab: {
                    distance: 200,
                    duration: 0.4
                },
                attract: { // 鼠标悬浮时，集中于一点，鼠标移开时释放产生涟漪效果
                    distance: 200,
                    duration: 0.4,
                    factor: 5
                }
            }
        },
        particles: {
            color: {
                value: '#6AECFF' // 粒子点的颜色
            },
            links: {
                color: '#6AECFF', // 线条颜色
                distance: 150,
                enable: true,
                opacity: 0.5, // 不透明度
                width: 2   // 线条宽度
            },
            collisions: {
                enable: true
            },
            move: {
                attract: { enable: false, rotateX: 600, rotateY: 1200 },
                bounce: false,
                direction: 'none',
                enable: true,
                out_mode: 'out',
                random: false,
                speed: 1, // 移动速度
                straight: false
            },
            number: {
                density: {
                    enable: true,
                    value_area: 800
                },
                value: 80
            },
            opacity: {
                value: 0.5
            },
            shape: {
                type: 'circle'
            },
            size: {
                random: true,
                value: 5
            }
        },
        detectRetina: true,
    },
})


const { options } = toRefs(data) // 直接解构出来，页面上就不用data.options了
</script>

<style scoped lang="scss">
.login_container {
    width: 100%;
    height: 100vh;
    background: url('@/assets/images/bg2.jpg') no-repeat center;
    // background: red no-repeat;
    background-size: cover;
    // padding: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    // justify-content: center;
    // transform-origin: left top;

    // position: relative;
    .top {
        width: 100%;
        height: 30px;
    }

    .form {
        // position: absolute;
        position: relative;
        display: block;
        padding: 2.2rem;
        width: 370px;
        margin: 100px;
        background: linear-gradient(14deg, rgba(2, 0, 36, 0.8) 0%, rgba(24, 24, 65, 0.7) 66%,
                rgb(20, 76, 99) 100%), radial-gradient(circle, rgba(2, 0, 36, 0.5) 0%,
                rgba(32, 15, 53, 0.2) 65%, rgba(14, 29, 28, 0.9) 100%);
        border: 2px solid #fff;
        -webkit-box-shadow: rgba(0, 212, 255) 0px 0px 50px -15px;
        box-shadow: rgba(0, 212, 255) 0px 0px 50px -15px;
        overflow: hidden;
        z-index: +1;
    }

    /*------input and submit section-------*/
    .el-input {
        height: 37x;
        margin: -1px
    }

    .input-container {
        position: relative;
    }

    .input-container el-input,
    .form button {
        outline: none;
        border: 2px solid #ffffff;
        margin: 0px 0;
        height: 40px;
        font-family: monospace;
    }

    .input-container el-input {
        background-color: #fff;
        padding: 6px;
        font-size: 0.875rem;
        line-height: 1.25rem;
        width: 290px;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    }

    .input-username:focus::placeholder {
        opacity: 0;
        transition: opacity .9s;
    }

    .input-pwd:focus::placeholder {
        opacity: 0;
        transition: opacity .9s;
    }

    .submit {
        position: relative;
        display: block;
        padding: 8px;
        background-color: #c0c0c0;
        color: #ffffff;
        text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
        font-size: 0.875rem;
        line-height: 1.25rem;
        font-weight: 500;
        width: 100%;
        text-transform: uppercase;
        overflow: hidden;
    }

    .submit:hover {
        -webkit-transition: all 0.2s ease-out;
        -moz-transition: all 0.2s ease-out;
        transition: all 0.2s ease-out;
        border-radius: 3.9px;
        box-shadow: 4px 5px 17px -4px #ffffff;
        cursor: pointer;
    }

    .submit:hover::before {
        -webkit-animation: sh02 0.5s 0s linear;
        -moz-animation: sh02 0.5s 0s linear;
        animation: sh02 .5s 0s linear;
    }

    .submit::before {
        content: '';
        display: block;
        width: 0px;
        height: 85%;
        position: absolute;
        top: 50%;
        left: 0%;
        opacity: 0;
        background: #fff;
        box-shadow: 0 0 50px 30px #fff;
        -webkit-transform: skewX(-20deg);
        -moz-transform: skewX(-20deg);
        -ms-transform: skewX(-20deg);
        -o-transform: skewX(-20deg);
        transform: skewX(-20deg);
    }

    @keyframes sh02 {
        from {
            opacity: 0;
            left: 0%;
        }

        50% {
            opacity: 1;
        }

        to {
            opacity: 0;
            left: 100%;
        }
    }

    /*--------signup section---------*/

    .signup-link {
        color: #c0c0c0;
        font-size: 0.875rem;
        line-height: 1.25rem;
        text-align: center;
        font-family: monospace;
    }

    .signup-link a {
        color: #fff;
        text-decoration: none;
    }

    .up:hover {
        text-decoration: underline;
    }


    /*--------header section-----------*/

    .form-title {
        font-size: 1.25rem;
        line-height: 1.75rem;
        font-family: monospace;
        font-weight: 600;
        text-align: center;
        padding: 8px;
        color: #fff;
        text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.7);
        animation-duration: 1.5s;
        overflow: hidden;
        transition: .12s;
    }

    .form-title span {
        animation: flickering 2s linear infinite both;
    }

    .title-2 {
        display: block;
        margin-top: -0.5rem;
        margin-bottom: 1rem;
        font-size: 2.1rem;
        font-weight: 800;
        font-family: Arial, Helvetica, sans-serif;
        text-align: center;
        -webkit-text-stroke: #fff 0.1rem;
        letter-spacing: 0.2rem;
        color: transparent;
        position: relative;
        text-shadow: 0px 0px 16px #CECECE;
    }

    .title-2 span::before,
    .title-2 span::after {
        content: '—';
    }

    @keyframes flickering {

        0%,
        100% {
            opacity: 1;
        }

        41.99% {
            opacity: 1;
        }

        42% {
            opacity: 0;
        }

        43% {
            opacity: 0;
        }

        43.01% {
            opacity: 1;
        }

        47.99% {
            opacity: 1;
        }

        48% {
            opacity: 0;
        }

        49% {
            opacity: 0;
        }

        49.01% {
            opacity: 1;
        }
    }

    /*---------shooting stars-----------*/


    .bg-stars {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -2;
        background-size: cover;
        animation: animateBg 50s linear infinite;
    }

    @keyframes animateBg {

        0%,
        100% {
            transform: scale(1);
        }

        50% {
            transform: scale(1.2);
        }
    }

    .star {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 4px;
        height: 4px;
        background: #fff;
        border-radius: 50%;
        box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.1), 0 0 0 8px rgba(255, 255, 255, 0.1), 0 0 20px rgba(255, 255, 255, 0.1);
        animation: animate 3s linear infinite;
    }

    .star::before {
        content: '';
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 300px;
        height: 1px;
        background: linear-gradient(90deg, #fff, transparent);
    }

    @keyframes animate {
        0% {
            transform: rotate(315deg) translateX(0);
            opacity: 1;
        }

        70% {
            opacity: 1;
        }

        100% {
            transform: rotate(315deg) translateX(-1000px);
            opacity: 0;
        }
    }

    .star:nth-child(1) {
        top: 0;
        right: 0;
        left: initial;
        animation-delay: 0s;
        animation-duration: 1s;
    }

    .star:nth-child(2) {
        top: 0;
        right: 100px;
        left: initial;
        animation-delay: 0.2s;
        animation-duration: 3s;
    }

    .star:nth-child(3) {
        top: 0;
        right: 220px;
        left: initial;
        animation-delay: 2.75s;
        animation-duration: 2.75s;
    }

    .star:nth-child(4) {
        top: 0;
        right: -220px;
        left: initial;
        animation-delay: 1.6s;
        animation-duration: 1.6s;
    }
}
</style>
