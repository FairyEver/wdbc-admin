<template>
    <section>
        <Form ref="searchForm" label-position="top" inline>
            <FormItem prop="nameLike" label="表名"><Input type="text" v-model="searchForm.nameLike" placeholder="nameLike"></Input></FormItem>
            <FormItem prop="comments" label="说明"><Input type="text" v-model="searchForm.comments" placeholder="comments"></Input></FormItem>
            <FormItem prop="parentTable" label="父表表名"><Input type="text" v-model="searchForm.parentTable" placeholder="parentTable"></Input></FormItem>
            <FormItem label="搜索"><Button type="primary" @click="search"><Icon type="search"></Icon></Button></FormItem>
            <FormItem label="新增"><Button type="ghost" @click="add"><Icon type="plus"></Icon></Button></FormItem>
        </Form>
        <XTable :loading="table.loading" :columns="table.columns" :columns-extend="table.columnsExtend" :data="table.data" @emit="tableHandler"></XTable>
        <PageList :current="page.current" :total="page.total" :page-size="page.size" @change="pageChangeHandler"></PageList>
    </section>
</template>

<script>
// mixin
import list from '@/mixin/list.js';
// 组件
import XTable from '@/components/table/table.vue';
// name
const nameInRouter = 'gen-table';
export default {
    name: nameInRouter,
    mixins: [
        list
    ],
    components: {
        XTable
    },
    data () {
        return {
            // 设置
            setting: {
                // 本页的名字 和路由name对应
                myName: nameInRouter,
                // 此列表页对应的表单页路由name
                brotherName: 'gen-table-form',
                // 数据接口
                API: '/a/gen/genTable',
                // 表单数据的获取方式
                formDataGetWay: 'new'
            },
            // 搜索表单
            searchForm: {
                nameLike: '',
                comments: '',
                parentTable: ''
            },
            // 表格
            table: {
                columns: [
                    {title: '表名', key: 'name'},
                    {title: '说明', key: 'comments'},
                    {title: '类名', key: 'className'},
                    {title: '父表', key: 'parentTable'}
                ],
                columnsExtend: [
                    {
                        width: 140,
                        children: [
                            {action: 'edit', text: '修改'},
                            {action: 'delete', text: '删除'}
                        ]
                    }
                ]
            }
        };
    }
};
</script>

