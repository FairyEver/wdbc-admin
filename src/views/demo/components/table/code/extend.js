export default `<template>
    <div>
        <h1 style="margin-bottom: 10px;">扩展列 (最后一列按钮)</h1>
        <Vtable
            ref="vtable"
            v-bind="table"
            @on="vTableOnHandler">
        </Vtable>
        <br>
        <CodeCard :data="code" :stringify="false"></CodeCard>
    </div>
</template>

<script>
import { axios, axiosErrorHandler } from '@/plugins/axios.js';
import code from './code/extend.js';
export default {
    data () {
        return {
            table: {
                columns: [
                    {title: '姓名', key: 'name'},
                    {title: '年龄', key: 'age'},
                    {title: '地址', key: 'address', width: 240},
                    {title: '已婚', key: 'married'},
                    {title: '管理员', key: 'admin'},
                    {title: '创建日期', key: 'creatData', width: 150},
                    {title: '更新日期', key: 'updateData', width: 200},
                    {title: '删除', key: 'delFlag'},
                    {title: '全勤', key: 'qq'},
                    {title: '项目', key: 'project'},
                    {
                        width: 130,
                        children: [
                            {action: 'edit', icon: 'edit'},
                            {action: 'delete', text: '删除', icon: 'trash-a'}
                        ]
                    }
                ],
                data: [],
                loading: false
            },
            code
        };
    },
    created () {
        this.table.loading = true;
        axios.get('https://www.easy-mock.com/mock/5a09103ac645f122782988de/wdbc-admin/table')
        .then(res => {
            this.table.data = res.data.list;
            this.table.loading = false;
        })
        .catch(error => axiosErrorHandler(error));
    },
    methods: {
        vTableOnHandler ({name, row, index}) {
            if (this[name]) {
                this[name](row, index);
            } else {
                this.$Message.error('没有匹配的 method');
            }
        },
        edit (row, index) {
            this.$Message.info('edit');
        },
        delete (row, index) {
            this.$Message.warning('delete');
        }
    }
};
</script>`;
