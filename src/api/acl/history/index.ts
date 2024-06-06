import request from "@/utils/request";
import qs from 'qs';
//枚举地址
enum API {
    //获取该页控制信息
    ALLUSER_URL = '/air/query/queryCommandHistory/',
    DELETE_HISTORY = '/air/delete/commandHistory/'
}
//获取用户账号信息的接口
// export const reqUserInfo = (page: number) => request.get(API.ALLUSER_URL + `${page}`);
export const reqGetHistory = (page: number) => request.get(API.ALLUSER_URL,
    {
        params: { page: `${page}` }
    }
);

export const reqDeleteHistory = (id: number) => request.post(API.DELETE_HISTORY,
    qs.stringify({ "id": id })
);
