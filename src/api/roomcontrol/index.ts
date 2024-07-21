import request from "@/utils/request";
//枚举地址
enum API {
    //获取该页控制信息
    GET_ROOMS = '/air/query/rooms/',
    GET_ROOMSCONTROL = '/air/query/getRooms',
    // POST_ROOMSCONTROL = '/mgtt/AddCommandHistory/',
    POST_ROOMSCONTROL = '/mgtt/AddCommandHistor',
    SELECT_STOREY = '/air/query/roomGroup/',
}
//获取用户账号信息的接口
export const reqGetRooms = () => request.get(API.GET_ROOMS);
export const reqGetRoomControl = () => request.get(API.GET_ROOMSCONTROL);
export const postRoomControl = (cmd: string, params: string) => request.post(API.POST_ROOMSCONTROL, {
    params: {
        cmd: `${cmd}`,
        params: `${params}`
    }
});
export const selectStorey = (name: string) => request.get(API.SELECT_STOREY, {
    params: {
        name: `${name}`,
    }
});


