import SvgIcon from "./SvgIcon/index.vue";
import Pagination from "./Pagination/index.vue";
//全局对象
const allGloablComponent = { SvgIcon, Pagination };
import *as ElementPlusIconsVue from '@element-plus/icons-vue'
//对外暴露插件对象
export default {
  install(app: any) {
    //注册项目全部的全局组件
    Object.keys(allGloablComponent).forEach((key) => {
      //注册为全局组件
      app.component(key, (allGloablComponent as any)[key]);
    });
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  },
};
