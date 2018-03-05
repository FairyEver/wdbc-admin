import Main from '@/views/core/Main.vue';

import core from './_core';
import sys from './_sys';
import gen from './_gen';

import cj from './_manage/cj';
import dj from './_manage/dj';
import fh from './_manage/fh';

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export default {
    path: '/',
    name: 'otherRouter',
    component: Main,
    children: [
        ...core,
        ...sys,
        ...gen,
        ...cj,
        ...dj,
        ...fh
    ]
};
