export default [
    {
        path: 'sys/db/index',
        icon: 'hammer',
        name: 'sys-db-index',
        title: '配置管理',
        component: resolve => { require(['@/views/business/db/index.vue'], resolve); }
    },
    {
        path: 'sys/db/Z000',
        icon: 'hammer',
        name: 'sys-db-Z000',
        title: '淘汰原因',
        component: resolve => { require(['@/views/business/db/Z000/index.vue'], resolve); },
        meta: {
            keepAlive: true // 需要被缓存
        }
    },
    {
        path: 'sys/db/Z001',
        icon: 'hammer',
        name: 'sys-db-Z001',
        title: '分配淘汰原因公司',
        component: resolve => { require(['@/views/business/db/Z001/index.vue'], resolve); },
        meta: {
            keepAlive: true // 需要被缓存
        }
    },
    {
        path: 'sys/db/Z002',
        icon: 'hammer',
        name: 'sys-db-Z002',
        title: '品系表',
        component: resolve => { require(['@/views/business/db/Z002/index.vue'], resolve); },
        meta: {
            keepAlive: true // 需要被缓存
        }
    },
    {
        path: 'sys/db/Z004',
        icon: 'hammer',
        name: 'sys-db-Z004',
        title: '个体性状指标分配',
        component: resolve => { require(['@/views/business/db/Z004/index.vue'], resolve); },
        meta: {
            keepAlive: true // 需要被缓存
        }
    },
    // {
    //     path: 'sys/db/Z006',
    //     icon: 'hammer',
    //     name: 'sys-db-Z006',
    //     title: '场和栋的关系',
    //     component: resolve => { require(['@/views/business/db/Z006/index.vue'], resolve); }
    // },
    {
        path: 'sys/db/Z006',
        icon: 'hammer',
        name: 'sys-db-Z006',
        title: '场栋关系',
        component: resolve => { require(['@/views/business/db/Z006/index.vue'], resolve); },
        meta: {
            keepAlive: true // 需要被缓存
        }
    },
    {
        path: 'sys/db/Z007',
        icon: 'hammer',
        name: 'sys-db-Z007',
        title: '用途',
        component: resolve => { require(['@/views/business/db/Z007/index.vue'], resolve); },
        meta: {
            keepAlive: true // 需要被缓存
        }
    },
    {
        path: 'sys/db/jdbzpz',
        icon: 'hammer',
        name: 'sys-db-jdbzpz',
        title: '集蛋标志配置',
        component: resolve => { require(['@/views/business/db/jdbzpz/index.vue'], resolve); },
        meta: {
            keepAlive: true // 需要被缓存
        }
    },
    {
        path: 'sys/db/gs',
        icon: 'hammer',
        name: 'sys-db-gs',
        title: '公式',
        component: resolve => { require(['@/views/business/db/gs/index.vue'], resolve); },
        meta: {
            keepAlive: true // 需要被缓存
        }
    },
    {
        path: 'sys/db/ZB005',
        icon: 'hammer',
        name: 'sys-db-ZB005',
        title: '指标明细',
        component: resolve => { require(['@/views/business/db/ZB005/index.vue'], resolve); },
        meta: {
            keepAlive: true // 需要被缓存
        }
    },
    {
        path: 'sys/db/zbyxz',
        icon: 'hammer',
        name: 'sys-db-zbyxz',
        title: '指标与性状',
        component: resolve => { require(['@/views/business/db/zbyxz/index.vue'], resolve); },
        meta: {
            keepAlive: true // 需要被缓存
        }
    }
];
