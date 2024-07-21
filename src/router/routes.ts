
export const constantRoute = [
    {
        path: '/login',
        component: () => import('@/views/login/index.vue'),
        meta: {
            title: 'login',
            hidden: true,
            type: ['1', '2', '3'],
        },
    },
    {
        path: '/register',
        component: () => import('@/views/register/index.vue'),
        meta: {
            title: 'register',
            hidden: true,
            type: ['1', '2', '3'],
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
            type: ['1', '2', '3'],
        },
        children: [
            {
                path: '/user',
                component: () => import('@/views/user/index.vue'),
                name: 'User',
                meta: {
                    title: '用户管理',
                    hidden: false,
                    icon: 'User',
                    type: ['1'],
                }
            },
            {
                path: '/storey',
                component: () => import('@/views/storey/index.vue'),
                name: 'Stroey',
                meta: {
                    title: '楼层管理',
                    hidden: false,
                    icon: 'OfficeBuilding',
                    type: ['1'],
                }
            },
            {
                path: '/room',
                component: () => import('@/views/room/room.vue'),
                name: 'Room',
                meta: {
                    title: '房间管理',
                    hidden: false,
                    icon: 'HomeFilled',
                    type: ['1', '2'],
                }
            },
            {
                path: '/node',
                component: () => import('@/views/node/node.vue'),
                name: 'Node',
                meta: {
                    title: '节点管理',
                    hidden: false,
                    icon: 'Tools',
                    type: ['1', '2'],
                }
            },

            // {
            //     path: '/permission',
            //     component: () => import('@/views/permission/index.vue'),
            //     name: 'Permission',
            //     meta: {
            //         title: '节点管理',
            //         hidden: false,
            //         icon: 'List',
            //     },
            // },
            // {
            //     path: '/product',
            //     component: () => import('@/views/product/index.vue'),
            //     name: 'product',
            //     meta: {
            //         title: '设备信息',
            //         icon: 'Management',
            //         hidden: false,
            //     },
            // },
            {
                path: '/equipment',
                component: () => import('@/views/equipment/index.vue'),
                name: 'Equipment',
                meta: {
                    title: '设备信息',
                    hidden: false,
                    icon: 'ScaleToOriginal',
                    type: ['1'],
                }
            },
            // {
            //     path: '/control',
            //     component: () => import('@/views/control/index.vue'),
            //     name: 'control',
            //     meta: {
            //         title: '空调控制',
            //         icon: 'Edit',
            //         hidden: false,
            //         type: ['1'],
            //     },
            // },
            {
                path: '/history',
                component: () => import('@/views/history/index.vue'),
                name: 'history',
                meta: {
                    title: '历史数据',
                    icon: 'Clock',
                    hidden: false,
                    type: ['1'],
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
        name: 'screen',
        meta: {
            title: '数据大屏',
            hidden: false,
            icon: 'Platform',
            type: ['1', '3'],
        },
    },
    {
        path: '/roomcontrol',
        component: () => import('@/views/roomcontrol/index.vue'),
        name: 'roomcontrol',
        meta: {
            title: '房间控制',
            icon: 'Edit',
            hidden: true,
            type: ['1', '2', '3'],
        },
    },
    {
        path: '/roominfo',
        component: () => import('@/views/roominfo/index.vue'),
        name: 'roominfo',
        meta: {
            title: '房间信息',
            hidden: true,
            icon: ' ',
            type: ['1', '2', '3'],
        },
    },
    {
        path: '/404',
        component: () => import('@/views/404/index.vue'),
        name: '404',
        meta: {
            title: '404',
            hidden: true,
            type: ['1', '2', '3'],
        },
    },
    // {
    //     path: '/403',
    //     component: () => import('@/views/403/index.vue'),
    //     name: '403',
    //     meta: {
    //         title: '403',
    //         hidden: true,
    //         type: ['1', '2', '3'],
    //     },
    // },
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
