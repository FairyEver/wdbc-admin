import Vue from 'vue';

// 字典 - 选项
Vue.component('DictSelect', require('@/components/form/dict/select/index.vue'));
// 字典 - 单选
Vue.component('DictRadio', require('@/components/form/dict/radio/index.vue'));
// 字典 - 多选
Vue.component('DictCheckbox', require('@/components/form/dict/checkbox/index.vue'));
// 字典 - Tag
Vue.component('DictTag', require('@/components/form/dict/tag/index.vue'));

// 字典 - 品系 - 选项
Vue.component('StrainSelect', require('@/components/form/dict/select/strainSelect.vue'));
// 字典 - 用途 - 选项
Vue.component('ChickenUseSelect', require('@/components/form/dict/select/chickenUseSelect.vue'));
// 字典 - 场 - 选项
Vue.component('FarmSelect', require('@/components/form/dict/select/farmSelect.vue'));
// 字典 - 淘汰原因 - 选项
Vue.component('EliminationReasonSelect', require('@/components/form/dict/select/eliminationReasonSelect.vue'));

// 树 基础
Vue.component('Ztree', require('@/components/tree/core.vue'));

// 树 - 菜单
Vue.component('TreeMenu', require('@/components/form/tree/menu/index.vue'));
// 树 - 机构
Vue.component('TreeOffice', require('@/components/form/tree/office/index.vue'));
// 树 - 场栋
Vue.component('TreeBuilding', require('@/components/form/tree/building/index.vue'));

// 表格
Vue.component('Vtable', require('@/components/tableNew/index.vue'));
// 分页
Vue.component('PageList', require('@/components/page/list.vue'));

// 数据检查
Vue.component('CodeCard', require('@/components/code/card.vue'));

// 布局组件 标题
Vue.component('LayoutHeader', require('@/components/layout/header/index.vue'));
// 布局组件 表格卡片 上面可以容纳表头信息
Vue.component('LayoutTableCard', require('@/components/layout/tableCard/index.vue'));
