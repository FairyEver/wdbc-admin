export default `<template>
    <div>
        <h1 style="margin-bottom: 10px;">可编辑</h1>
        <Vtable
            ref="vtable"
            v-bind="table"
            @change="vTableChangeHandler">
        </Vtable>
        <br>
        <Row :gutter="10">
            <Col span="12">
                <Card dis-hover>
                    <p slot="title">log</p>
                    <Button slot="extra" size="small" @click="log = []">清空</Button>
                    <p v-for="(log, index) in log" :key="index" style="font-size: 10px;">{{log}}</p>
                </Card>
            </Col>
            <Col span="12">
                <CodeCard :data="nowChangeRow" title="发生数据改变的行 (实时更新)"></CodeCard>
            </Col>
        </Row>
        <br>
        <CodeCard :data="code" :stringify="false"></CodeCard>
    </div>
</template>

<script>
import { axios, axiosErrorHandler } from '@/plugins/axios.js';
import code from './code/edit.js';
export default {
    data () {
        return {
            table: {
                columns: [
                    {title: '姓名', key: 'name'},
                    {title: '年龄', key: 'age', control: 'InputNumber'},
                    {title: '地址', key: 'address', width: 240, control: 'Input'},
                    {title: '已婚', key: 'married', control: 'i-switch'},
                    {title: '管理员', key: 'admin', control: 'i-switch', props: { trueValue: '1', falseValue: '0' }},
                    {title: '创建日期', key: 'creatData', width: 150, control: 'DatePicker'},
                    {title: '更新日期', key: 'updateData', width: 200, control: 'DatePicker', props: { type: 'datetime' }},
                    {title: '全勤', key: 'qq', control: 'i-switch'}
                ],
                data: [],
                loading: false
            },
            log: [],
            nowChangeRow: [],
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
        vTableChangeHandler ({row, key, value}) {
            this.log.unshift(\`\${this.log.length + 1} : 第 \${row} 行的 \${key} 变为了 \${value}\`);
            this.nowChangeRow = this.$refs.vtable.dataCopy[row];
        }
    }
};
</script>`;
