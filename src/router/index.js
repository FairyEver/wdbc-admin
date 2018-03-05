import otherRouterSetting from './otherRouter/index';
import appRouterSetting from './appRouter/index';
import coreRouterSetting from './core';

export const otherRouter = otherRouterSetting;
export const appRouter = appRouterSetting;

export const routers = [
    otherRouter,
    ...appRouter,
    ...coreRouterSetting
];
