export default [
    {
        path: 'pickOut/stage3/index',
        icon: 'hammer',
        name: 'pickOut-stage3-index',
        title: 'stage3',
        component: resolve => { require(['@/views/business/pickOut/stage3/index.vue'], resolve); }
    },
    {
        path: 'pickOut/stage3/sdjhbls',
        icon: 'hammer',
        name: 'pickOut-stage3-sdjhbls',
        title: '设定计划保留数',
        component: resolve => { require(['@/views/business/pickOut/stage3/sdjhbls/index.vue'], resolve); }
    },
    {
        path: 'pickOut/stage3/pxzb',
        icon: 'hammer',
        name: 'pickOut-pxzb-sdjhbls',
        title: '品系指标',
        component: resolve => { require(['@/views/business/pickOut/stage3/pxzb/index.vue'], resolve); }
    },
    {
        path: 'pickOut/stage3/xz',
        icon: 'hammer',
        name: 'pickOut-stage3-xz',
        title: '选种',
        component: resolve => { require(['@/views/business/pickOut/stage3/xz/index.vue'], resolve); }
    }
];
