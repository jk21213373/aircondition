import { defineStore } from 'pinia';
import { reqLogin, reqUserInfo } from '@/api/user';
//引入数据类型
import type { loginForm } from '@/api/user/type';
import { constantRoute } from '@/router/routes';
//创建用户小仓库
let useUserStore = defineStore('User', {
    //小仓库存储数据地方
    state: () => {
        return {
            token: sessionStorage.getItem("TOKEN") ? sessionStorage.getItem("TOKEN") : "",
            // token: sessionStorage.getItem("TOKEN"),
            menuRoutes: constantRoute,
            privilege: [],
            username: '',
            type: '1',
        }
    },

    actions: {
        async userLogin(data: loginForm) {
            //登录请求
            let result = await reqLogin(data);
            if (result.error_message === "success") {
                // if (result.code == 200) {
                //pinia仓库存储一下token
                //由于pinialvuex存储数据其实利用js对象
                this.token = result.token;
                //本地存储持久化存储一份
                sessionStorage.setItem("TOKEN", result.token);
                return 'ok'
            } else {
                return Promise.reject(new Error(result.data));
            }
        },
        async userInfo() {
            let result: any = await reqUserInfo();
            console.log(result.error_message);
            if (result.error_message === "success") {
                this.username = result.username;
                this.privilege = result.privilege;
                // this.type = result.type;
                return 'ok';
            } else {
                return Promise.reject(new Error(result.message));
            }
            // let result = await reqUserInfo();
            // if (result.code == 200) {
            //     this.username = result.data.name;
            //     return 'ok';
            // } else {
            //     return Promise.reject(new Error(result.message));
            // }
        },
        userLogout() {
            this.token = '';
            this.username = '';
            // this.privilege = '';
            this.type = '';
            sessionStorage.removeItem('TOKEN');
        }
    },
})
//对外暴露获取小仓库方法
export default useUserStore;