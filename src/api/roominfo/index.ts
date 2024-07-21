import request from "@/utils/request";
import qs from 'qs';
//枚举地址
enum API {
    //获取该页控制信息
    GET_STOREY_ROOM = '',
    EXCEPTION_URL = ' ',
    POST_ROOMINFOCONTROL = '/mgtt/AddCommandHistory/'
}
//获取用户账号信息的接口
export const reqGetStoreyRoom = (storeyId: number, roomId: number) => request.get(API.GET_STOREY_ROOM,
    {
        params: {
            storeyId: `${storeyId}`,
            roomId: `${roomId}`
        }
    }
);
export const reqExceptionInfo = () => request.post(API.EXCEPTION_URL);
export const postRoomInfoControl = (cmd: string, params: string) => request.post(API.POST_ROOMINFOCONTROL, {
    params: {
        cmd: `${cmd}`,
        params: `${params}`
    }
});
