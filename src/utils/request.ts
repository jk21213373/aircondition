import axios from "axios";
import ElMessage from "element-plus";
import useUserStore from "@/store/modules/user";
//第一步：利用axios对象的create方法，去创建axios实例（其他的配置：基础路径、超时的时而
let request = axios.create({
    // baseURL: import.meta.env.VITE_APP_BASE_API,//基础路径上会携带/api
    // timeout: 5000

    baseURL: import.meta.env.VITE_SERVE,
});
request.interceptors.request.use((config: any) => {
    let userStore = useUserStore();

    if (userStore.token && userStore.token != '') {

        // config.header['Authorization']=`Bearer ${userStore.token}`
        config.headers.Authorization = 'Bearer ' + userStore.token;
    }
    // if (userStore.token) {
    //     config.headers.token = userStore.token
    // }
    //config配置对象，headers网性请求头，经常给服务器端携带公共参数
    //返回配置对象
    return config;
});
//第三步：响应拦截器
request.interceptors.response.use((response: any) => {
    return response.data;
}, (error: any) => {
    let message = '';
    //http状态码
    let status = error.response.status;
    switch (status) {
        case 401:
            message = "TOKEN过期"
            break;
        case 403:
            message = "无权访问"
            break;
        case 404:
            message = "请求地址错误"
            break;
        case 500:
            message = "服务器出现问题"
            break;
        default:
            message = "网络出现问题"
            break;
    }
    //提示错误信息
    // ElMessage({
    //     type: 'error',
    //     message
    // });
    return Promise.reject(error);
})
export default request;

