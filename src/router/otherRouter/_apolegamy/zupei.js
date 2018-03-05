export default [
    {
        path: 'apolegamy/zupei/index',
        icon: 'hammer',
        name: 'apolegamy-zupei-index',
        title: '组配',
        component: resolve => { require(['@/views/business/apolegamy/zupei/index.vue'], resolve); }
    },
    {
        path: 'apolegamy/zupei/jhzps',
        icon: 'hammer',
        name: 'apolegamy-zupei-jhzps',
        title: '计划组配数',
        component: resolve => { require(['@/views/business/apolegamy/zupei/jhzps/index.vue'], resolve); }
    },
    {
        path: 'apolegamy/zupei/xjxfz',
        icon: 'hammer',
        name: 'apolegamy-zupei-xjxfz',
        title: '小家系分组',
        component: resolve => { require(['@/views/business/apolegamy/zupei/xjxfz/index.vue'], resolve); }
    }
];
