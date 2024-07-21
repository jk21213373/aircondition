import request from "@/utils/request";
import qs from 'qs';
//枚举地址
enum API {
    //获取所有房间信息或搜索
    GET_ROOMS = '/air/query/getRooms',
    DELETE_HISTORY = '/air/delete/room/',
    UPDATE_ROOM = '/modify/room/',
    ADD_ROOM = '/air/add/room/'
}
//获取用户账号信息的接口

export const reqGetRoom = (page: number, storeyId: number) => request.get(API.GET_ROOMS,
    {
        params: {
            page: `${page}`,
            storeyId: `${storeyId}`
        }
    }
);

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


