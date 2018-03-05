<template>
    <Table
        :loading="loading"
        :columns="columnsComputed"
        :data="data"
        :border="true"
        :stripe="true"
        size="small">
    </Table>
</template>

<script>
// mixin
import button from '@/components/table/mixin/button.js';
import input from '@/components/table/mixin/input.js';
export default {
    mixins: [
        button,
        input
    ],
    props: {
        loading: {default: true},
        columns: {default: () => []},
        columnsEdit: {default: () => []},
        columnsExtend: {default: () => []},
        data: {default: () => []}
    },
    computed: {
        columnsComputed () {
            return [
                ...this.columns.map((e, index) => {
                    e.align = 'center';
                    if (e.control) {
                        e.render = (h, params) => h('div', [this.inputBuilder(e, h, params)]);
                    }
                    return e;
                }),
                ...this.columnsExtend.map((e, index) => {
                    return {
                        title: e.title || '操作',
                        width: e.width,
                        align: 'center',
                        key: 'action' + index,
                        fixed: 'right',
                        render: (h, params) => h('div', [e.children.map((child, childIndex) => this.buttonBuilder(e, h, params, child, childIndex, child.p ? this.$root.p(child.p) : true))])
                    };
                })
            ];
        }
    }
};
</script>

