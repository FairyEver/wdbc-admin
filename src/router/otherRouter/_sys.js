export default [
    {
        path: 'sys/user/info',
        name: 'sys-user-info',
        title: '个人信息',
        component: resolve => { require(['@/views/modules/sys/userinfo/info/form.vue'], resolve); }
    },
    {
        path: 'sys/user/pwd',
        name: 'sys-user-pwd',
        title: '修改密码',
        component: resolve => { require(['@/views/modules/sys/userinfo/pwd/form.vue'], resolve); }
    },
    {
        path: 'sys/user/list',
        name: 'sys-user',
        title: '用户管理',
        component: resolve => { require(['@/views/modules/sys/user/list.vue'], resolve); }
    },
    {
        path: 'sys/user/form',
        name: 'sys-user-form',
        title: '用户管理表单',
        component: resolve => { require(['@/views/modules/sys/user/form.vue'], resolve); }
    },
    {
        path: 'sys/menu/list',
        name: 'sys-menu',
        title: '菜单管理',
        component: resolve => { require(['@/views/modules/sys/menu/list.vue'], resolve); }
    },
    {
        path: 'sys/menu/form',
        name: 'sys-menu-form',
        title: '菜单管理表单',
        component: resolve => { require(['@/views/modules/sys/menu/form.vue'], resolve); }
    },
    {
        path: 'sys/office/list',
        name: 'sys-office',
        title: '机构管理',
        component: resolve => { require(['@/views/modules/sys/office/list.vue'], resolve); }
    },
    {
        path: 'sys/office/form',
        name: 'sys-office-form',
        title: '机构管理表单',
        component: resolve => { require(['@/views/modules/sys/office/form.vue'], resolve); }
    },
    {
        path: 'sys/role/list',
        name: 'sys-role',
        title: '角色管理',
        component: resolve => { require(['@/views/modules/sys/role/list.vue'], resolve); }
    },
    {
        path: 'sys/role/form',
        name: 'sys-role-form',
        title: '角色管理表单',
        component: resolve => { require(['@/views/modules/sys/role/form.vue'], resolve); }
    },
    {
        path: 'sys/dict/list',
        name: 'sys-dict',
        title: '字典管理',
        component: resolve => { require(['@/views/modules/sys/dict/list.vue'], resolve); }
    },
    {
        path: 'sys/dict/form',
        name: 'sys-dict-form',
        title: '字典管理表单',
        component: resolve => { require(['@/views/modules/sys/dict/form.vue'], resolve); }
    },
    {
        path: 'sys/scheduleJob/list',
        name: 'sys-schedule-job',
        title: '定时任务',
        component: resolve => { require(['@/views/modules/sys/scheduleJob/list.vue'], resolve); }
    },
    {
        path: 'sys/scheduleJob/form',
        name: 'sys-schedule-job-form',
        title: '定时任务表单',
        component: resolve => { require(['@/views/modules/sys/scheduleJob/form.vue'], resolve); }
    }
];
