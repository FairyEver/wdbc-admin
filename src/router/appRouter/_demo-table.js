import Main from '@/views/core/Main.vue';
export default {
    path: '/demo-table',
    icon: 'grid',
    name: 'demo-table',
    title: 'Vtable使用示例',
    component: Main,
    children: [
        {
            path: 'components/table/base',
            icon: 'code',
            name: 'components-table-base',
            title: '基础',
            component: resolve => { require(['@/views/demo/components/table/base.vue'], resolve); }
        },
        {
            path: 'components/table/extend',
            icon: 'code',
            name: 'components-table-extend',
            title: '扩展列',
            component: resolve => { require(['@/views/demo/components/table/extend.vue'], resolve); }
        },
        {
            path: 'components/table/base-play',
            icon: 'code',
            name: 'components-table-base-play',
            title: '基础 实验室',
            component: resolve => { require(['@/views/demo/components/table/base-play.vue'], resolve); }
        },
        {
            path: 'components/table/edit',
            icon: 'code',
            name: 'components-table-edit',
            title: '可编辑',
            component: resolve => { require(['@/views/demo/components/table/edit.vue'], resolve); }
        },
        {
            path: 'components/table/edit-auto-update',
            icon: 'code',
            name: 'components-table-edit-auto-update',
            title: '外部影响',
            component: resolve => { require(['@/views/demo/components/table/edit-auto-update.vue'], resolve); }
        },
        {
            path: 'components/table/edit-auto-update-multi',
            icon: 'code',
            name: 'components-table-edit-auto-update-multi',
            title: '外部影响 多个',
            component: resolve => { require(['@/views/demo/components/table/edit-auto-update-multi.vue'], resolve); }
        },
        {
            path: 'components/table/edit-auto-update-text',
            icon: 'code',
            name: 'components-table-edit-auto-update-text',
            title: '外部影响 非控件',
            component: resolve => { require(['@/views/demo/components/table/edit-auto-update-text.vue'], resolve); }
        },
        {
            path: 'components/table/render',
            icon: 'code',
            name: 'components-table-render',
            title: '自定义渲染',
            component: resolve => { require(['@/views/demo/components/table/render.vue'], resolve); }
        },
        {
            path: 'components/table/open-modal',
            icon: 'code',
            name: 'components-table-open-modal',
            title: '弹出模态框',
            component: resolve => { require(['@/views/demo/components/table/open-modal.vue'], resolve); }
        },
        {
            path: 'components/table/add',
            icon: 'code',
            name: 'components-table-add',
            title: '添加行',
            component: resolve => { require(['@/views/demo/components/table/add.vue'], resolve); }
        }
    ]
};
