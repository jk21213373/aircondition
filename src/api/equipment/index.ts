import request from "@/utils/request";
import qs from 'qs';
//枚举地址
enum API {
    //获取全部己有用户账号信息
    NODEDTREEDATA_URL = '/test/getAllNode/getAllNode',
    //添加用户
    NODEDATA_URL = "/user/account/register/",

    SPEED_URL = "/user/account/register/",

    MODE_URL = "/user/account/register/",

    TEMP_URL = "/user/account/register/",

    //删别除某一个账号
}
//获取用户账号信息的接口
// export const reqUserInfo = (page: number) => request.get(API.ALLUSER_URL + `${page}`);
export const reqNodeTreeInfo = () => request.post(API.NODEDTREEDATA_URL);

export const reqNodeInfo = (index?: number, name?: string) => request.post(API.NODEDATA_URL,
    {
        params: { index: `${index}`, name: `${name}` }
    }
);

export const postSpeedInfo = (speed: string) => request.get(API.SPEED_URL,
    {
        params: { speed: `${speed}` }
    }
);
export const postModeInfo = (mode: string) => request.get(API.MODE_URL,
    {
        params: { mode: `${mode}` }
    }
);
export const postTempInfo = (temp: number) => request.get(API.TEMP_URL,
    {
        params: { temp: `${temp}` }
    }
);
