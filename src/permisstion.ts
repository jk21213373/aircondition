import router from '@/router'
import setting from './setting'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import pinia from './store'
import useUserStore from './store/modules/user'
nprogress.configure({ showSpinner: false })
let userStore = useUserStore(pinia)
// 全局前置守卫
router.beforeEach(async (to: any, from: any, next: any) => {
    document.title = to.meta.title + ` | ${setting.title}`
    nprogress.start()
    let token = userStore.token
    let username = userStore.username
    if (token === null || token === '') {
        if (to.name)
            if (to.path == '/') next('/login');
            else next({ path: '/login', query: { redirect: to.path } })
        else next();
    }
    else {
        if (username) {
            if (to.name && !to.meta.type.includes(String(userStore.type))) {
                next({ path: '/404' });
            } else if (to.path == '/login' || to.path == '/register') {
                next(false);
            } else {
                // if()
                // if(to.path !== '/login'||$route.query.redirect !== '/register')
                // next({ path: to.path, query: { redirect: to.path } });
                next();
            }
        } else {
            try {
                await userStore.userInfo();
                // $router.push({ path: redirect || routes[Number(useStore.type) - 1] });
                next()
            } catch (error) {
                await userStore.userLogout()
                next({ path: '/login', query: { redirect: to.path } })
            }

        }
    }
})
// 全局后置守卫
router.afterEach((route) => {
    nprogress.done()
})
