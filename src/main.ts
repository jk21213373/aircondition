import { createApp } from "vue";
import App from "@/App.vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "virtual:svg-icons-register";
import Particles from "vue3-particles";
import weather from 'vue3-mini-weather';
//@ts-ignore
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
const app = createApp(App);
app.use(ElementPlus, {
  locale: zhCn,
});
//console.log(import.meta.env);
import SvgIcon from "@/components/SvgIcon/index.vue";
app.component("SvgIcon", SvgIcon);
import gloalComponent from "@/components";
import pinia from './store';
import '@/styles/index.scss';
import './permisstion';

// import axios from 'axios';
// axios({
//   url: '/api/user/login',
//   method: "post",
//   data: {
//     username: 'admin',
//     password: '111111'
//   }
// })
//安装自定义插件
import router from './router'
app.use(weather);
app.use(router);
app.use(pinia);
app.use(gloalComponent);
app.use(Particles);
app.mount("#app");



