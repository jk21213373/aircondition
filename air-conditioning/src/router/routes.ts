export const constantRoute = [
    {
        path: '/login',
        component: () => import('@/views/login/index.vue'),
        name: 'login',
        meta: {
            title: 'login',
            hidden: true,
        },
    },
    {
        path: '/',
        component: () => import('@/layout/index.vue'),
        name: 'layout',
        meta: {
            title: '',
            hidden: false,
            icon: '',
        },
        redirect: '/home',
        children: [
            {
                path: '/home',
                component: () => import('@/views/home/index.vue'),
                meta: {
                    title: '首页',
                    hidden: false,
                    icon: 'HomeFilled',
                },
            },
            {
                path: '/user',
                component: () => import('@/views/user/index.vue'),
                name: 'User',
                meta: {
                    title: '用户管理',
                    hidden: false,
                    icon: 'User',
                }
            },
            {
                path: '/permission',
                component: () => import('@/views/permission/index.vue'),
                name: 'Permission',
                meta: {
                    title: '节点管理',
                    hidden: false,
                    icon: 'List',
                },
            },
            {
                path: '/product',
                component: () => import('@/views/product/index.vue'),
                name: 'product',
                meta: {
                    title: '设备信息',
                    icon: 'Management',
                    hidden: false,
                },
            },
            {
                path: '/control',
                component: () => import('@/views/control/index.vue'),
                name: 'control',
                meta: {
                    title: '空调控制',
                    icon: 'Edit',
                    hidden: false,
                },
            },
            {
                path: '/history',
                component: () => import('@/views/history/index.vue'),
                name: 'history',
                meta: {
                    title: '历史数据',
                    icon: 'Clock',
                    hidden: false,
                },
            },
        ]
    },
    // {
    //     path: '/',
    //     component: () => import('@/layout/index.vue'),
    //     name: 'Screen',
    //     meta: {
    //         title: '',
    //         hidden: false,
    //         icon: '',
    //     },
    //     redirect: '/screen',
    //     children: [
    //         {
    //             path: '/screen',
    //             component: () => import('@/views/screen/index.vue'),
    //             meta: {
    //                 title: 'shuda',
    //                 hidden: false,
    //                 icon: 'HomeFilled',
    //             },
    //         },
    //     ],
    // },
    {
        path: '/screen',
        component: () => import('@/views/screen/index.vue'),
        meta: {
            title: '数据大屏',
            hidden: false,
            icon: 'Platform',
        },
    },
    {
        path: '/404',
        component: () => import('@/views/404/index.vue'),
        name: '404',
        meta: {
            title: '404',
            hidden: true,
        },
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/404',
        name: 'Any',
        meta: {
            title: '任意路由',
            hidden: true,
        }
    }
]
