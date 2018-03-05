import Main from '@/views/core/Main.vue';
export default {
    path: '/tool',
    icon: 'hammer',
    name: 'tool',
    title: '文档编辑器',
    component: Main,
    children: [
        {
            path: 'doc-editor',
            icon: 'edit',
            name: 'doc-editor',
            title: '文档编辑器',
            component: resolve => { require(['@/views/modules/tool/doc-editor/index.vue'], resolve); }
        }
    ]
};
