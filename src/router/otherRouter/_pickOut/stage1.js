export default [
    {
        path: 'pickOut/stage1/index',
        icon: 'hammer',
        name: 'pickOut-stage1-index',
        title: 'stage1',
        component: resolve => { require(['@/views/business/pickOut/stage1/index.vue'], resolve); }
    },
    {
        path: 'pickOut/stage1/sdjhbls',
        icon: 'hammer',
        name: 'pickOut-stage1-sdjhbls',
        title: '设定计划保留数',
        component: resolve => { require(['@/views/business/pickOut/stage1/sdjhbls/index.vue'], resolve); }
    },
    {
        path: 'pickOut/stage1/ydtt',
        icon: 'hammer',
        name: 'pickOut-stage1-ydtt',
        title: '验蛋淘汰',
        component: resolve => { require(['@/views/business/pickOut/stage1/ydtt/index.vue'], resolve); }
    },
    {
        path: 'pickOut/stage1/xz',
        icon: 'hammer',
        name: 'pickOut-stage1-xz',
        title: '选种',
        component: resolve => { require(['@/views/business/pickOut/stage1/xz/index.vue'], resolve); }
    }
];
