import request from "@/utils/request";
//枚举地址
enum API {
    //获取全部己有用户账号信息
    ALLUSER_URL = '/admin/acl/user/',
    //添加用户
    ADDUSER_URL = "/admin/acl/user/save",
    //更新已有的用户账号
    UPDATEUSER_URL = '/admin/acl/user/update',
    //删别除某一个账号
    DELETEUSER_URL = '/admin/acl/user/remove/{id}',
}
//获取用户账号信息的接口
export const reqUserInfo = (page: number, limit: number) => request.get(API.ALLUSER_URL + `${page}/${limit}`);
export const reqAddOrUpdateUser = (data: any) => {
    //携带参数有ID更新
    if (data.id) {
        return request.put(API.UPDATEUSER_URL, data);
    } else {
        return request.post(API.ADDUSER_URL, data);
    }
}