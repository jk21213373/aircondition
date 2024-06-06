//统一管理咱们项目用户相关的接口
import request from "@/utils/request";
//统一管理接口
enum API {
    ENERGYLINE_URL = "  ",
    ENERGYAREA_URL = "/user/account/register/",
    ROOMENERGY_URL = "/air/query/roomsEnergy/",
    UNITEXCEPTION = "/user/account/info/",
}
//暴露请求函数
//登录接口方法

export const reqEnergyLine = () => request.post(API.ENERGYLINE_URL);
export const reqEnergyArea = () => request.post(API.ENERGYAREA_URL);
// 查询开关机掉线状态
export const reqRoomEnergy = () => request.get(API.ROOMENERGY_URL);
export const reqUnitException = () => request.get(API.UNITEXCEPTION);
// , qs.stringify(data), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
// export const reqLogin = (data: loginForm) => request.post(API.LOGIN_URL, data);
// export const reqRegister = (data: registerForm) => request.post(API.REGISTER_URL, qs.stringify(data));
// //获取用户信息接口方法
// export const reqUserInfo = () => request.get(API.USERINFO_URL);
//退出登录
