import { defineStore } from 'pinia';
import { reqLogin, reqUserInfo, reqLogout } from '@/api/user';
//引入数据类型
import type { loginForm } from '@/api/user/type';
import { constantRoute } from '@/router/routes';
//创建用户小仓库
let useUserStore = defineStore('User', {
    //小仓库存储数据地方
    state: () => {
        return {
            token: localStorage.getItem("TOKEN"),
            menuRoutes: constantRoute,
            username: '',
            avatar: '',
        }
    },
    //异步1逻辑的地方
    actions: {
        async userLogin(data: loginForm) {
            //登录请求
            let result = await reqLogin(data);
            console.log(result);
            if (result.code == 200) {
                //pinia仓库存储一下token
                //由于pinialvuex存储数据其实利用js对象
                this.token = result.data;
                //本地存储持久化存储一份
                localStorage.setItem("TOKEN", result.data);
                return 'ok'
            } else {
                return Promise.reject(new Error(result.data));
            }
        },
        async userInfo() {
            //获取用户信息进行存储仓库当中[用户头像、名字]
            let result = await reqUserInfo();
            //  console.log(result);
            if (result.code == 200) {
                this.username = result.data.name;
                this.avatar = result.data.avatar;
                return 'ok';
            } else {
                return Promise.reject(new Error(result.message));
            }
        },
        async userLogout() {
            let result = await reqLogout();
            if (result.code == 200) {
                this.token = '';
                this.username = '';
                this.avatar = '';
                localStorage.removeItem('TOKEN');
            } else {
                return Promise.reject(new Error(result.message));
            }

        }
    },
    getters: {
    }
})
//对外暴露获取小仓库方法
export default useUserStore;