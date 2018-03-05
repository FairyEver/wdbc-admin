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
            path: 'components/iview/composite',
            icon: 'settings',
            name: 'components-iview-composite',
            title: 'iview 合成组件',
            component: resolve => { require(['@/views/demo/components/iview/composite/index.vue'], resolve); }
        },
        {
            path: 'components/dict',
            icon: 'ios-book',
            name: 'components-dict',
            title: '字典组件',
            component: resolve => { require(['@/views/demo/components/dict/index.vue'], resolve); }
        },
        {
            path: 'components/no-repeat/play',
            icon: 'ios-book',
            name: 'components-no-repeat-play',
            title: '禁止重复 实验室',
            component: resolve => { require(['@/views/demo/components/no-repeat/play.vue'], resolve); }
        },
        {
            path: 'components/no-repeat/base',
            icon: 'ios-book',
            name: 'components-no-repeat-base',
            title: '禁止重复 模板',
            component: resolve => { require(['@/views/demo/components/no-repeat/base.vue'], resolve); }
        }
    ]
};
