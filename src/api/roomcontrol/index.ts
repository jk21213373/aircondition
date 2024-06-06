import request from "@/utils/request";
import qs from 'qs';
//枚举地址
enum API {
    //获取该页控制信息
    GET_ROOMS = '/air/query/rooms/',
    DELETE_HISTORY = '/air/delete/room/',
    UPDATE_ROOM = '/modify/room/',
    ADD_ROOM = '/air/add/room/',
}
//获取用户账号信息的接口

export const reqQueRoom = () => request.get(API.GET_ROOMS);

export const reqDeleteRoom = (id: number) => request.post(API.DELETE_HISTORY,
    qs.stringify({ "id": id })
);
export const reqAddRoom = (data: any) => {
    //携带参数有ID更新
    if (data.id) {
        return request.post(API.UPDATE_ROOM, qs.stringify(data));
    } else {
        return request.post(API.ADD_ROOM, qs.stringify(data));
    }
}

export const postBuilding = (name: string, poweron: boolean) => request.post(API.DELETE_HISTORY,
    qs.stringify({ name, poweron }));
export const postStorey = (id: number, poweron: boolean) => request.post(API.DELETE_HISTORY,
    qs.stringify({ id, poweron }));

