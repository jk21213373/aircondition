export interface loginForm {
    username: string,
    password: string
}
export interface registerForm {
    username: string,
    userId: String,
    password: string,
    confirmedPassword: String
}
interface dataType {
    token: string
}
//登录接口返回数据类型
export interface loginResponseData {
    code: number,
    data: dataType
}
interface userInfo {
    userId: number,
    username: string,
    password: string,
    desc: string,
    roles: string[],
    buttons: string[],
    routes: string[],
    token: string
}
//定义服务器返回用户倍恩相关的数据类型
interface user {
    checkUser: userInfo
}
export interface userResponseData {
    code: number
    data: user
}