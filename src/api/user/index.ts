//统一管理咱们项目用户相关的接口
import request from "@/utils/request";
import qs from 'qs';
import type { loginForm, registerForm } from "./type";
//统一管理接口
enum API {
    // LOGIN_URL = "/admin/acl/index/login",
    // REGISTER_URL = "/admin/acl/index/register",
    // USERINFO_URL = "/admin/acl/index/info",
    LOGIN_URL = "/user/account/token/",
    REGISTER_URL = "/user/account/register/",
    USERINFO_URL = "/user/account/info/",
    CONNECT_URL = "/mqtt/connect/",
    ADDALL_URL = "/mqtt/addAll/",

}
//暴露请求函数
//登录接口方法
export const reqLogin = (data: loginForm) => request.post(API.LOGIN_URL, qs.stringify(data), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
export const reqRegister = (data: registerForm) => request.post(API.REGISTER_URL, qs.stringify(data));
//获取用户信息接口方法
export const reqUserInfo = () => request.get(API.USERINFO_URL);
export const reqConnect = () => request.get(API.CONNECT_URL);
export const reqAddAll = () => request.get(API.ADDALL_URL);
//退出登录
