export default [
    {
        path: 'manage/cj/index',
        icon: 'hammer',
        name: 'manage-cj-index',
        title: '雏鸡管理',
        component: resolve => { require(['@/views/business/manage/cj/index.vue'], resolve); }
    },
    {
        path: 'manage/cj/upload',
        icon: 'upload',
        name: 'manage-cj-upload',
        title: 'Excel上传',
        component: resolve => { require(['@/views/business/manage/cj/upload/index.vue'], resolve); }
    },
    {
        path: 'manage/cj/ttjl',
        icon: 'hammer',
        name: 'manage-cj-ttjl',
        title: '淘汰记录',
        component: resolve => { require(['@/views/business/manage/cj/ttjl/list.vue'], resolve); }
    },
    {
        path: 'manage/cj/ccjl',
        icon: 'hammer',
        name: 'manage-cj-ccjl',
        title: '抽测记录',
        component: resolve => { require(['@/views/business/manage/cj/ccjl/list.vue'], resolve); }
    },
    {
        path: 'manage/cj/ccfx',
        icon: 'hammer',
        name: 'manage-cj-ccfx',
        title: '抽测分析',
        component: resolve => { require(['@/views/business/manage/cj/ccfx/list.vue'], resolve); }
    },
    {
        path: 'manage/cj/qdtzttfw',
        icon: 'hammer',
        name: 'manage-cj-qdtzttfw',
        title: '确定体重淘汰范围',
        component: resolve => { require(['@/views/business/manage/cj/qdtzttfw/list.vue'], resolve); }
    },
    {
        path: 'manage/cj/pcjl',
        icon: 'hammer',
        name: 'manage-cj-pcjl',
        title: '普测记录',
        component: resolve => { require(['@/views/business/manage/cj/pcjl/list.vue'], resolve); }
    },
    {
        path: 'manage/cj/csdjk',
        icon: 'hammer',
        name: 'manage-cj-csdjk',
        title: '产生蛋鸡库',
        component: resolve => { require(['@/views/business/manage/cj/csdjk/list.vue'], resolve); }
    }
];
