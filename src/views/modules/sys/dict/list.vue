<template>
    <section>
        <Form ref="searchForm" label-position="top" inline>
            <FormItem prop="label" label="标签"><Input type="text" v-model="searchForm.label" placeholder="label"></Input></FormItem>
            <FormItem prop="type" label="类型" style="width:150px;">
                <DictSelect :value.sync="searchForm.type" :options="options.type"></DictSelect>
            </FormItem>
            <FormItem prop="description" label="描述"><Input type="text" v-model="searchForm.description" placeholder="description"></Input></FormItem>
            <FormItem label="搜索"><Button type="primary" @click="search"><Icon type="search"></Icon></Button></FormItem>
            <FormItem label="新增"><Button type="ghost" @click="add"><Icon type="plus"></Icon></Button></FormItem>
        </Form>
        <XTable :loading="table.loading" :columns="table.columns" :columns-extend="table.columnsExtend" :data="table.data" @emit="tableHandler"></XTable>
        <PageList :current="page.current" :total="page.total" :page-size="page.size" @change="pageChangeHandler"></PageList>
    </section>
</template>

<script>
// 插件
import { axiosToken, axiosErrorHandler } from '@/plugins/axios.js';
// mixin
import list from '@/mixin/list.js';
// 组件
import XTable from '@/components/table/table.vue';
// name
const nameInRouter = 'sys-dict';
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
                brotherName: 'sys-dict-form',
                // 数据接口
                API: '/a/sys/dict'
            },
            // 搜索表单
            searchForm: {
                label: '',
                type: '',
                description: ''
            },
            // 表格
            table: {
                columns: [
                    {title: '标签', key: 'label'},
                    {title: '类型', key: 'type'},
                    {title: '描述', key: 'description'},
                    {title: '键值', key: 'value'},
                    {title: '排序', key: 'sort'}
                ],
                columnsExtend: [
                    {
                        width: 200,
                        children: [
                            {action: 'edit', text: '修改'},
                            {action: 'delete', text: '删除'},
                            {action: 'addKey', text: '添加键值'}
                        ]
                    }
                ]
            },
            options: {
                type: []
            }
        };
    },
    methods: {
        addKey (row, id) {
            // 响应每行最后的添加键值按钮
            let _result = {
              type: row.type,
              description: row.description,
              sort: row.sort + 10
            }
            this.edit(_result);
        }
    },
    created () {
        axiosToken({url: '/a/sys/dict/typeList'})
        .then(res => {
            this.options.type = res.data.typeList.map(e => ({
                label: e.type + ' ' + e.description,
                value: e.type
            }))
        })
        .catch(error => axiosErrorHandler(error));
    }
};
</script>
