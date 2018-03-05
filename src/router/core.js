// 不作为Main组件的子页面展示的页面单独写，如下
export default [
    {
        path: '/login',
        name: 'login',
        meta: {
            title: '登录'
        },
        component: resolve => { require(['@/views/modules/login/login.vue'], resolve); }
    },
    {
        path: '/*',
        name: 'error_404',
        meta: {
            title: '页面不存在'
        },
        component: resolve => { require(['@/views/core/error_page/404.vue'], resolve); }
    },
    {
        path: '/401',
        meta: {
            title: '权限不足'
        },
        name: 'error_401',
        component: resolve => { require(['@/views/core/error_page/401.vue'], resolve); }
    },
    {
        path: '/500',
        meta: {
            title: '服务端错误'
        },
        name: 'error_500',
        component: resolve => { require(['@/views/core/error_page/500.vue'], resolve); }
    },
    {
        path: '/locking',
        name: 'locking',
        component: resolve => { require(['@/views/core/main_components/locking-page.vue'], resolve); }
    }
];
