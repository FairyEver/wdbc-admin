export default [
    {
        path: 'gen/table/list',
        name: 'gen-table',
        title: '业务表配置',
        component: resolve => { require(['@/views/modules/gen/table/list.vue'], resolve); }
    },
    {
        path: 'gen/table/form',
        name: 'gen-table-form',
        title: '业务表配置表单',
        component: resolve => { require(['@/views/modules/gen/table/form.vue'], resolve); }
    },
    {
        path: 'gen/scheme/list',
        name: 'gen-scheme',
        title: '生成方案配置',
        component: resolve => { require(['@/views/modules/gen/scheme/list.vue'], resolve); }
    },
    {
        path: 'gen/scheme/form',
        name: 'gen-scheme-form',
        title: '生成方案配置表单',
        component: resolve => { require(['@/views/modules/gen/scheme/form.vue'], resolve); }
    }
];
