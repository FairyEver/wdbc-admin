import Main from '@/views/core/Main.vue';
export default {
    path: '/demo',
    icon: 'filing',
    name: 'demo',
    title: '模板',
    component: Main,
    children: [
        {
            path: 'components/iview/base',
            icon: 'hammer',
            name: 'components-iview-base',
            title: 'iview 基础组件',
            component: resolve => { require(['@/views/demo/components/iview/base/index.vue'], resolve); }
        },
        {
            path: 'components/dict',
            icon: 'ios-book',
            name: 'components-dict',
            title: '字典组件',
            component: resolve => { require(['@/views/demo/components/dict/index.vue'], resolve); }
        }
    ]
};
