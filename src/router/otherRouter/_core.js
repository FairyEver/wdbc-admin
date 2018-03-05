export default [
    {
        path: 'home',
        title: {i18n: 'home'},
        name: 'home_index',
        component: resolve => { require(['@/views/business/home/index.vue'], resolve); }
    }
];
