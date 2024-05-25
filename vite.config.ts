import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
// https://vitejs.dev/config/
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import { viteMockServe } from 'vite-plugin-mock';
export default defineConfig(({ command, mode }) => {
  let env = loadEnv(mode, process.cwd());
  // console.log(88888888888888888888888);
  // console.log(env.VITE_SERVE);
  return {
    plugins: [
      vue(),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
        symbolId: "icon-[dir]-[name]",
      }),
      viteMockServe({
        localEnabled: command === 'serve',
      })
    ],
    resolve: {
      alias: {
        "@": path.resolve("./src"),
      },
    },
    css: {
      // css预处理器
      preprocessorOptions: {
        scss: {
          // 引入 variable.scss 这样就可以在全局中使用 variable.scss中预定义的变量了
          // 给导入的路径最后加上 ; 
          javascriptEnabled: true,
          additionalData: '@import "@/styles/variable.scss";'
        }
      }
    },
    server: {
      proxy: {
        [env.VITE_APP_BASE_API]: {
          //获取数据的服务器地址设置

          target: env.VITE_SERVE,
          //话要代理跨域
          changeOrigin: true,
          //路径重写
          rewrite: (path) => path.replace(/^\/api/, ''),
        }
      }
    }
  }
});
