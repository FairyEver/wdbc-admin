import Main from '@/views/core/Main.vue';

import core from './_core';
import sys from './_sys';
import gen from './_gen';

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export default {
    path: '/',
    name: 'otherRouter',
    component: Main,
    children: [
        ...core,
        ...sys,
        ...gen
    ]
};
