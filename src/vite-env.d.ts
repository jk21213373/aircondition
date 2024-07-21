/// <reference types="vite/client" />

declare module "*.vue" {
  import { ComponentOptions } from "vue";

  const componentOptions: ComponentOptions;

  export default componentOptions;
}
// import { defineConfig } from 'vite'

// import { loadEnv as myLoadEnv } from './loadEnv.js'

// export default defineConfig(({ command, mode }) => {
//   myLoadEnv(mode)
//   return {
//     // 添加需要的内容，此处省略
//   }
// })
declare module 'qs'
declare module 'axios'
declare module 'element-plus'
declare module 'nprogress'
declare module '@element-plus/icons-vuenprogress'
declare module 'vue3-particles';
declare module 'tsparticles';
declare module 'tsparticles-engine';
declare module "@/utils/request";




