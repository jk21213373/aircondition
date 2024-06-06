import request from "@/utils/request";
import qs from 'qs';
//枚举地址
enum API {
    //获取全部己有用户账号信息
    ALLUSER_URL = '/user/permissions/getPermissions/',
    //添加用户
    ADDUSER_URL = "/user/account/register/",
    //删别除某一个账号
    DELETEUSER_URL = '/admin/acl/user/remove/',

    GETROOMS_URL = '/air/query/queryRooms/',

    GETROOM_URL = '/user/permissions/getAssign/',

    POSTROOMS_URL = '/user/permissions/updateUser/updateUser',

    CHANGESTATUS_URL = '/user/permissions/changeUserStatus/',


}
//获取用户账号信息的接口
// export const reqUserInfo = (page: number) => request.get(API.ALLUSER_URL + `${page}`);
export const reqUserInfo = (page: number) => request.get(API.ALLUSER_URL,
    {
        params: { page: `${page}` }
    }
);

export const reqUpdateUser = (data: any) => {
    return request.post(API.ADDUSER_URL, qs.stringify(data));
}

export const reqRemoveUser = (userId: number) => request.post(API.DELETEUSER_URL, qs.stringify({"userId":userId}));

export const reqRoomsInfo = () => request.post(API.GETROOMS_URL);

export const reqRoomInfo = (userId: number) => request.post(API.GETROOM_URL, qs.stringify({"userId":userId}));

export const postRoomsInfo = (data: any) => {
    return request.post(API.POSTROOMS_URL, qs.stringify(data));
}

export const checkUserInfo = (name: string) => request.get(API.ALLUSER_URL,
    {
        params: { page: `${name}` }
    }
);

export const changeUserStatus = (userId: number) => request.post(API.CHANGESTATUS_URL, qs.stringify({"userId":userId}));