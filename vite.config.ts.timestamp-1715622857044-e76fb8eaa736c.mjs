// vite.config.ts
import { defineConfig, loadEnv } from "file:///C:/Users/Dell/Desktop/air-conditioning/node_modules/.pnpm/vite@5.2.0_@types+node@20.12.7_sass@1.75.0/node_modules/vite/dist/node/index.js";
import vue from "file:///C:/Users/Dell/Desktop/air-conditioning/node_modules/.pnpm/@vitejs+plugin-vue@5.0.4_vite@5.2.0_vue@3.4.21/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import path from "path";
import { createSvgIconsPlugin } from "file:///C:/Users/Dell/Desktop/air-conditioning/node_modules/.pnpm/vite-plugin-svg-icons@2.0.1_vite@5.2.0/node_modules/vite-plugin-svg-icons/dist/index.mjs";
import { viteMockServe } from "file:///C:/Users/Dell/Desktop/air-conditioning/node_modules/.pnpm/vite-plugin-mock@2.9.6_mockjs@1.1.0_rollup@2.79.1_vite@5.2.0/node_modules/vite-plugin-mock/dist/index.js";
var vite_config_default = defineConfig(({ command, mode }) => {
  let env = loadEnv(mode, process.cwd());
  return {
    plugins: [
      vue(),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
        symbolId: "icon-[dir]-[name]"
      }),
      viteMockServe({
        localEnabled: command === "serve"
      })
    ],
    resolve: {
      alias: {
        "@": path.resolve("./src")
      }
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
          rewrite: (path2) => path2.replace(/^\/api/, "")
        }
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxEZWxsXFxcXERlc2t0b3BcXFxcYWlyLWNvbmRpdGlvbmluZ1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcRGVsbFxcXFxEZXNrdG9wXFxcXGFpci1jb25kaXRpb25pbmdcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL0RlbGwvRGVza3RvcC9haXItY29uZGl0aW9uaW5nL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBsb2FkRW52IH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCB2dWUgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXZ1ZVwiO1xuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5pbXBvcnQgeyBjcmVhdGVTdmdJY29uc1BsdWdpbiB9IGZyb20gXCJ2aXRlLXBsdWdpbi1zdmctaWNvbnNcIjtcbmltcG9ydCB7IHZpdGVNb2NrU2VydmUgfSBmcm9tICd2aXRlLXBsdWdpbi1tb2NrJztcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBjb21tYW5kLCBtb2RlIH0pID0+IHtcbiAgbGV0IGVudiA9IGxvYWRFbnYobW9kZSwgcHJvY2Vzcy5jd2QoKSk7XG4gIC8vIGNvbnNvbGUubG9nKDg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4KTtcbiAgLy8gY29uc29sZS5sb2coZW52LlZJVEVfU0VSVkUpO1xuICByZXR1cm4ge1xuICAgIHBsdWdpbnM6IFtcbiAgICAgIHZ1ZSgpLFxuICAgICAgY3JlYXRlU3ZnSWNvbnNQbHVnaW4oe1xuICAgICAgICBpY29uRGlyczogW3BhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCBcInNyYy9hc3NldHMvaWNvbnNcIildLFxuICAgICAgICBzeW1ib2xJZDogXCJpY29uLVtkaXJdLVtuYW1lXVwiLFxuICAgICAgfSksXG4gICAgICB2aXRlTW9ja1NlcnZlKHtcbiAgICAgICAgbG9jYWxFbmFibGVkOiBjb21tYW5kID09PSAnc2VydmUnLFxuICAgICAgfSlcbiAgICBdLFxuICAgIHJlc29sdmU6IHtcbiAgICAgIGFsaWFzOiB7XG4gICAgICAgIFwiQFwiOiBwYXRoLnJlc29sdmUoXCIuL3NyY1wiKSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBjc3M6IHtcbiAgICAgIC8vIGNzc1x1OTg4NFx1NTkwNFx1NzQwNlx1NTY2OFxuICAgICAgcHJlcHJvY2Vzc29yT3B0aW9uczoge1xuICAgICAgICBzY3NzOiB7XG4gICAgICAgICAgLy8gXHU1RjE1XHU1MTY1IHZhcmlhYmxlLnNjc3MgXHU4RkQ5XHU2ODM3XHU1QzMxXHU1M0VGXHU0RUU1XHU1NzI4XHU1MTY4XHU1QzQwXHU0RTJEXHU0RjdGXHU3NTI4IHZhcmlhYmxlLnNjc3NcdTRFMkRcdTk4ODRcdTVCOUFcdTRFNDlcdTc2ODRcdTUzRDhcdTkxQ0ZcdTRFODZcbiAgICAgICAgICAvLyBcdTdFRDlcdTVCRkNcdTUxNjVcdTc2ODRcdThERUZcdTVGODRcdTY3MDBcdTU0MEVcdTUyQTBcdTRFMEEgOyBcbiAgICAgICAgICBqYXZhc2NyaXB0RW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgICBhZGRpdGlvbmFsRGF0YTogJ0BpbXBvcnQgXCJAL3N0eWxlcy92YXJpYWJsZS5zY3NzXCI7J1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBzZXJ2ZXI6IHtcbiAgICAgIHByb3h5OiB7XG4gICAgICAgIFtlbnYuVklURV9BUFBfQkFTRV9BUEldOiB7XG4gICAgICAgICAgLy9cdTgzQjdcdTUzRDZcdTY1NzBcdTYzNkVcdTc2ODRcdTY3MERcdTUyQTFcdTU2NjhcdTU3MzBcdTU3NDBcdThCQkVcdTdGNkVcblxuICAgICAgICAgIHRhcmdldDogZW52LlZJVEVfU0VSVkUsXG4gICAgICAgICAgLy9cdThCRERcdTg5ODFcdTRFRTNcdTc0MDZcdThERThcdTU3REZcbiAgICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXG4gICAgICAgICAgLy9cdThERUZcdTVGODRcdTkxQ0RcdTUxOTlcbiAgICAgICAgICByZXdyaXRlOiAocGF0aCkgPT4gcGF0aC5yZXBsYWNlKC9eXFwvYXBpLywgJycpLFxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBOFMsU0FBUyxjQUFjLGVBQWU7QUFDcFYsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sVUFBVTtBQUVqQixTQUFTLDRCQUE0QjtBQUNyQyxTQUFTLHFCQUFxQjtBQUM5QixJQUFPLHNCQUFRLGFBQWEsQ0FBQyxFQUFFLFNBQVMsS0FBSyxNQUFNO0FBQ2pELE1BQUksTUFBTSxRQUFRLE1BQU0sUUFBUSxJQUFJLENBQUM7QUFHckMsU0FBTztBQUFBLElBQ0wsU0FBUztBQUFBLE1BQ1AsSUFBSTtBQUFBLE1BQ0oscUJBQXFCO0FBQUEsUUFDbkIsVUFBVSxDQUFDLEtBQUssUUFBUSxRQUFRLElBQUksR0FBRyxrQkFBa0IsQ0FBQztBQUFBLFFBQzFELFVBQVU7QUFBQSxNQUNaLENBQUM7QUFBQSxNQUNELGNBQWM7QUFBQSxRQUNaLGNBQWMsWUFBWTtBQUFBLE1BQzVCLENBQUM7QUFBQSxJQUNIO0FBQUEsSUFDQSxTQUFTO0FBQUEsTUFDUCxPQUFPO0FBQUEsUUFDTCxLQUFLLEtBQUssUUFBUSxPQUFPO0FBQUEsTUFDM0I7QUFBQSxJQUNGO0FBQUEsSUFDQSxLQUFLO0FBQUE7QUFBQSxNQUVILHFCQUFxQjtBQUFBLFFBQ25CLE1BQU07QUFBQTtBQUFBO0FBQUEsVUFHSixtQkFBbUI7QUFBQSxVQUNuQixnQkFBZ0I7QUFBQSxRQUNsQjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFDQSxRQUFRO0FBQUEsTUFDTixPQUFPO0FBQUEsUUFDTCxDQUFDLElBQUksaUJBQWlCLEdBQUc7QUFBQTtBQUFBLFVBR3ZCLFFBQVEsSUFBSTtBQUFBO0FBQUEsVUFFWixjQUFjO0FBQUE7QUFBQSxVQUVkLFNBQVMsQ0FBQ0EsVUFBU0EsTUFBSyxRQUFRLFVBQVUsRUFBRTtBQUFBLFFBQzlDO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFsicGF0aCJdCn0K
