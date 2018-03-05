export default `<template>
    <div>
        <h1 style="margin-bottom: 10px;">基础表格</h1>
        <Vtable
            ref="vtable"
            v-bind="table">
        </Vtable>
        <br>
        <CodeCard :data="code" :stringify="false"></CodeCard>
    </div>
</template>

<script>
import { axios, axiosErrorHandler } from '@/plugins/axios.js';
import code from './code/base.js';
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
                    {title: '项目', key: 'project'}
                ],
                data: [],
                loading: false
            },
            code
        };
    },
    created () {
        this.table.loading = true;
        axios.get('https://www.easy-mock.com/mock/5a09103ac645f122782988de/wdbc-admin/table?size=20')
        .then(res => {
            this.table.data = res.data.list;
            this.table.loading = false;
        })
        .catch(error => axiosErrorHandler(error));
    }
};
</script>`;
