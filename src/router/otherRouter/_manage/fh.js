export default [
    {
        path: 'manage/fh/index',
        icon: 'hammer',
        name: 'manage-fh-index',
        title: '孵化管理',
        component: resolve => { require(['@/views/business/manage/fh/index.vue'], resolve); }
    },
    {
        path: 'manage/fh/scfhk',
        icon: 'hammer',
        name: 'manage-fh-scfhk',
        title: '生成孵化库',
        component: resolve => { require(['@/views/business/manage/fh/scfhk/list.vue'], resolve); }
    },
    {
        path: 'manage/fh/rf',
        icon: 'hammer',
        name: 'manage-fh-rf',
        title: '入孵',
        component: resolve => { require(['@/views/business/manage/fh/rf/list.vue'], resolve); }
    },
    {
        path: 'manage/fh/yd',
        icon: 'hammer',
        name: 'manage-fh-yd',
        title: '验蛋',
        component: resolve => { require(['@/views/business/manage/fh/yd/list.vue'], resolve); }
    },
    {
        path: 'manage/fh/bjgj',
        icon: 'hammer',
        name: 'manage-fh-bjgj',
        title: '标记公鸡',
        component: resolve => { require(['@/views/business/manage/fh/bjgj/list.vue'], resolve); }
    },
    {
        path: 'manage/fh/lp',
        icon: 'hammer',
        name: 'manage-fh-lp',
        title: '落盘',
        component: resolve => { require(['@/views/business/manage/fh/lp/list.vue'], resolve); }
    },
    {
        path: 'manage/fh/cc',
        icon: 'hammer',
        name: 'manage-fh-cc',
        title: '出雏',
        component: resolve => { require(['@/views/business/manage/fh/cc/list.vue'], resolve); }
    },
    {
        path: 'manage/fh/cscjk',
        icon: 'hammer',
        name: 'manage-fh-cscjk',
        title: '产生雏鸡库',
        component: resolve => { require(['@/views/business/manage/fh/cscjk/list.vue'], resolve); }
    }
];
