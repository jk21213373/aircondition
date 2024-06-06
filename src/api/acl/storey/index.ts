import request from "@/utils/request";
import qs from 'qs';
//枚举地址
enum API {
    //获取该页控制信息
    GET_STOREY = '/air/query/storey/',
    DELETE_STOREY = '/air/delete/storey/',
    UPDATE_STOREY = '/air/modify/storey/',
    ADD_STOREY = '/air/add/storey/'
}
//获取用户账号信息的接口
export const reqGetStroey = () => request.get(API.GET_STOREY);

export const reqDeleteStorey = (id: number) => request.post(API.DELETE_STOREY,
    qs.stringify({ "id": id })
);
export const reqAddStorey = (data: any) => {
    //携带参数有ID更新
    if (data.id && data.id != '') {
        return request.post(API.UPDATE_STOREY, qs.stringify(data));
    } else {
        return request.post(API.ADD_STOREY, qs.stringify(data));
    }
}
