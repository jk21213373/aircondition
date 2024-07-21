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
            token: localStorage.getItem("TOKEN") ? localStorage.getItem("TOKEN") : "",
            menuRoutes: constantRoute,
            privilege: [],
            username: '',
            type: '',
        }
    },

    actions: {
        async userLogin(data: loginForm) {
            //登录请求
            let result = await reqLogin(data);
            if (result.error_message === "success") {
                this.token = result.token;
                //本地存储持久化存储一份
                localStorage.setItem("TOKEN", result.token);
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
                this.type = '1';
                // console.log("00000000000000000000" + this.type);
                return 'ok';
            } else {
                return Promise.reject(new Error(result.message));
            }
        },
        userLogout() {
            this.token = '';
            this.username = '';
            this.type = '';
            localStorage.removeItem('TOKEN');
        }
    },
})
//对外暴露获取小仓库方法
export default useUserStore;