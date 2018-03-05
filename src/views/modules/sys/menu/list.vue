<template>
    <section v-p="'gen:genScheme:view'">
        <Form ref="searchForm" label-position="top" inline>
            <FormItem label="新增"><Button type="ghost" @click="add"><Icon type="plus"></Icon></Button></FormItem>
        </Form>
        <tableTree
            :items='table.data'
            :columns='table.columns'
            @on-row-click='rowClick'>
        </tableTree>
    </section>
</template>

<script>
// mixin
import list from '@/mixin/list.js';
// 组件
import tableTree from '@/components/table/tableTree.vue';
// name
const nameInRouter = 'sys-menu';
export default {
    name: nameInRouter,
    mixins: [
        list
    ],
    components: {
        tableTree
    },
    data () {
        return {
            // 设置
            setting: {
                // 本页的名字 和路由name对应
                myName: nameInRouter,
                // 此列表页对应的表单页路由name
                brotherName: 'sys-menu-form',
                // 数据接口
                API: '/a/sys/menu'
            },
            // 搜索表单
            searchForm: {},
            // 表格
            table: {
                columns: [
                    {title: '名称', key: 'name'},
                    {title: 'ID', key: 'id'},
                    {title: '链接', key: 'href'},
                    {title: '排序', key: 'sort'},
                    {title: '可见', key: 'isShow'},
                    {title: '权限标识', key: 'permission'},
                    {
                        title: '操作',
                        type: 'action',
                        align: 'center',
                        actions: [
                            {type: 'primary', text: '修改'},
                            {type: 'ghost', text: '删除'},
                            {type: 'ghost', text: '添加下级菜单'}
                        ]
                    }
                ]
            }
        };
    },
    methods: {
        rowClick (result, event, index, text) {
            switch (text) {
                case '修改':
                    this.edit(result, index);
                    break;
                case '删除':
                    this.delete(result, index);
                    break;
                case '添加下级菜单':
                    let _result = {
                        parentId: result.id
                    };
                    this.edit(_result, index, 'new');
                    break;
                default:
                    this.$Message.error('事件匹配失败');
                    break;
            }
        }
    }
};
</script>
