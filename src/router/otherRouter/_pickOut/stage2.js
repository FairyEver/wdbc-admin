export default [
    {
        path: 'pickOut/stage2/index',
        icon: 'hammer',
        name: 'pickOut-stage2-index',
        title: 'stage2',
        component: resolve => { require(['@/views/business/pickOut/stage2/index.vue'], resolve); }
    },
    {
        path: 'pickOut/stage2/xz',
        icon: 'hammer',
        name: 'pickOut-stage2-xz',
        title: '选种',
        component: resolve => { require(['@/views/business/pickOut/stage2/xz/index.vue'], resolve); }
    }
];
