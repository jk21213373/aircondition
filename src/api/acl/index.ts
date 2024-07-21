import request from "@/utils/request";
import qs from 'qs';
//枚举地址
enum API {
    //获取全部己有用户账号信息
    ALLUSER_URL = '/user/permissions/getPermissions/',
    //添加用户
    ADDUSER_URL = "/user/account/register/",
    //删除某一个账号

    DELETEUSER_URL = '/user/permissions/deleteUser/',
    //获取所有房间
    GETROOMS_URL = '/air/query/queryRooms/',
    //获取某一个房间
    GETROOM_URL = '/user/permissions/getAssign/',
    //提交已选择房间
    POSTROOMS_URL = '/user/permissions/updateUser/updateUser',
    //改变启用状态
    CHANGESTATUS_URL = '/user/permissions/changeUserStatus/',
    //查询
    CHECK_URL = '/user/permissions/',

}
//获取用户账号信息的接口
// export const reqUserInfo = (page: number) => request.get(API.ALLUSER_URL + `${page}`);
//获取全部己有用户账号信息
export const reqUserInfo = (page: number) => request.get(API.ALLUSER_URL,
    {
        params: { page: `${page}` }
    }
);
//添加用户
export const reqUpdateUser = (data: any) => {
    return request.post(API.ADDUSER_URL, qs.stringify(data));
}
//删除某一个账号
export const reqRemoveUser = (userId: number) => request.post(API.DELETEUSER_URL, qs.stringify({ "userId": userId }));
//获取所有房间
export const reqRoomsInfo = () => request.post(API.GETROOMS_URL);
//获取某一个房间
export const reqRoomInfo = (userId: number) => request.post(API.GETROOM_URL, qs.stringify({ "userId": userId }));
//提交已选择房间
export const postRoomsInfo = (data: any) => {
    return request.post(API.POSTROOMS_URL, qs.stringify(data));
}
//查询
export const checkUserInfo = (name: string) => request.get(API.CHECK_URL,
    {
        params: { name: `${name}` }
    }
);
//改变启用状态
export const changeUserStatus = (userId: number) => request.post(API.CHANGESTATUS_URL, qs.stringify({ "userId": userId }));