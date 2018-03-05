export default [
    {
        path: 'apolegamy/fuhe/index',
        icon: 'hammer',
        name: 'apolegamy-fuhe-index',
        title: '复核',
        component: resolve => { require(['@/views/business/apolegamy/fuhe/index.vue'], resolve); }
    },
    {
        path: 'apolegamy/fuhe/dsfh',
        icon: 'hammer',
        name: 'apolegamy-fuhe-dsfh',
        title: '蛋数复核',
        component: resolve => { require(['@/views/business/apolegamy/fuhe/dsfh/index.vue'], resolve); }
    },
    {
        path: 'apolegamy/fuhe/bgsfh',
        icon: 'hammer',
        name: 'apolegamy-fuhe-bgsfh',
        title: '办公室复核',
        component: resolve => { require(['@/views/business/apolegamy/fuhe/bgsfh/index.vue'], resolve); }
    },
    {
        path: 'apolegamy/fuhe/cxjgfh',
        icon: 'hammer',
        name: 'apolegamy-fuhe-cxjgfh',
        title: '初选结果复核',
        component: resolve => { require(['@/views/business/apolegamy/fuhe/cxjgfh/index.vue'], resolve); }
    },
    {
        path: 'apolegamy/fuhe/fhyttjgcx',
        icon: 'hammer',
        name: 'apolegamy-fuhe-fhyttjgcx',
        title: '复核与淘汰结果查询',
        component: resolve => { require(['@/views/business/apolegamy/fuhe/fhyttjgcx/index.vue'], resolve); }
    }
];
