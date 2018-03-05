import Main from '@/views/core/Main.vue';

import core from './_core';
import sys from './_sys';
import db from './_db';
import gen from './_gen';

import cj from './_manage/cj';
import dj from './_manage/dj';
import fh from './_manage/fh';

import stage1 from './_pickOut/stage1.js';
import stage2 from './_pickOut/stage2.js';
import stage3 from './_pickOut/stage3.js';
import fuhe from './_apolegamy/fuhe.js';
import zupei from './_apolegamy/zupei.js';

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export default {
    path: '/',
    name: 'otherRouter',
    component: Main,
    children: [
        ...core,
        ...sys,
        ...db,
        ...gen,
        ...stage1,
        ...stage2,
        ...stage3,
        ...fuhe,
        ...zupei,
        ...cj,
        ...dj,
        ...fh
    ]
};