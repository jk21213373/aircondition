import request from "@/utils/request";
import qs from 'qs';
//枚举地址
enum API {
    //获取所有节点信息或搜索
    GET_NODES = '/air/query/getNodes/',
    //获取所有房间和ID
    GET_ROOMS = '/air/query/getNodes/',
    //删除一个节点
    DELETE_NODE = '/air/delete/node/',
    //更新一个节点
    UPDATE_NODE = '/air/modify/node/',
    //增加一个节点
    ADD_NODE = '/air/add/node/',
}
//获取用户账号信息的接口

export const reqGetNode = (page: number, roomId: number) => request.get(API.GET_NODES,
    {
        params: {
            page: `${page}`,
            roomId: `${roomId}`
        }
    }
);
export const reqDeleteNode = (id: number) => request.post(API.DELETE_NODE,
    qs.stringify({ "id": id })
);
export const reqAddNode = (data: any) => {
    //携带参数有ID更新
    if (data.id) {
        return request.post(API.UPDATE_NODE, qs.stringify(data));
    } else {
        return request.post(API.ADD_NODE, qs.stringify(data));
    }
}


