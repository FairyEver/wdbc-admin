export default [
    {
        path: 'manage/dj/index',
        icon: 'hammer',
        name: 'manage-dj-index',
        title: '蛋鸡管理',
        component: resolve => { require(['@/views/business/manage/dj/index.vue'], resolve); }
    },
    {
        path: 'manage/dj/lcdz',
        icon: 'hammer',
        name: 'manage-dj-lcdz',
        title: '笼翅对照',
        component: resolve => { require(['@/views/business/manage/dj/lcdz/list.vue'], resolve); }
    },
    {
        path: 'manage/dj/lcdzxf',
        icon: 'hammer',
        name: 'manage-dj-lcdzxf',
        title: '笼翅对照下发',
        component: resolve => { require(['@/views/business/manage/dj/lcdzxf/list.vue'], resolve); }
    },
    {
        path: 'manage/dj/ttjl',
        icon: 'hammer',
        name: 'manage-dj-ttjl',
        title: '淘汰记录',
        component: resolve => { require(['@/views/business/manage/dj/ttjl/list.vue'], resolve); }
    },
    {
        path: 'manage/dj/xzjl',
        icon: 'hammer',
        name: 'manage-dj-xzjl',
        title: '性状记录',
        component: resolve => { require(['@/views/business/manage/dj/xzjl/list.vue'], resolve); }
    },
    {
        path: 'manage/dj/ccjl',
        icon: 'hammer',
        name: 'manage-dj-ccjl',
        title: '抽测记录',
        component: resolve => { require(['@/views/business/manage/dj/ccjl/list.vue'], resolve); }
    },
    {
        path: 'manage/dj/qt',
        icon: 'hammer',
        name: 'manage-dj-qt',
        title: '群淘',
        component: resolve => { require(['@/views/business/manage/dj/qt/list.vue'], resolve); }
    },
    {
        path: 'manage/dj/upload',
        icon: 'upload',
        name: 'manage-dj-upload',
        title: 'Excel上传',
        component: resolve => { require(['@/views/business/manage/dj/upload/index.vue'], resolve); }
    }
];
