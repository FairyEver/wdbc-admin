<template>
    <div>
        <h1 style="margin-bottom: 10px;">外部影响 多个互相影响</h1>
        <Row :gutter="10">
            <Col span="11">
                <Vtable
                    ref="vtable"
                    v-bind="table"
                    @change="vTableChangeHandler">
                </Vtable>
                <br>
                <Card dis-hover>
                    <p>mun4 = mun3 + mun2 + mun1</p>
                    <p>mun3 = mun2 + 1</p>
                    <p>mun2 = mun1 + 1</p>
                    <p>更改 mun4 不会影响到 mun3 mun2 mun1</p>
                </Card>
            </Col>
            <Col span="5">
                <Card dis-hover>
                    <p slot="title">log</p>
                    <Button slot="extra" size="small" @click="log = []">清空</Button>
                    <p v-for="(log, index) in log" :key="index" style="font-size: 10px;">{{log}}</p>
                </Card>
            </Col>
            <Col span="8">
                <CodeCard :data="nowChangeRow" title="发生数据改变的行 (实时更新)"></CodeCard>
            </Col>
        </Row>
        <br>
        <CodeCard :data="code" :stringify="false"></CodeCard>
    </div>
</template>

<script>
import { axios, axiosErrorHandler } from '@/plugins/axios.js';
import code from './code/edit-auto-update-multi.js';
export default {
    data () {
        return {
            table: {
                columns: [
                    {key: 'num1', control: 'InputNumber'},
                    {key: 'num2', control: 'InputNumber'},
                    {key: 'num3', control: 'InputNumber'},
                    {key: 'num4', control: 'InputNumber'}
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
            this.log.unshift(`${this.log.length + 1} : 第 ${row} 行的 ${key} 变为了 ${value}`);
            this.nowChangeRow = this.$refs.vtable.dataCopy[row];
            // 外部影响
            if (key === 'num1') {
                this.$refs.vtable.updateCell({row, key: 'num2', value: (row) => row.num1 + 1, updateComponent: true});
            }
            if (key === 'num2') {
                this.$refs.vtable.updateCell({row, key: 'num1', value: (row) => row.num2 - 1, updateComponent: true});
                this.$refs.vtable.updateCell({row, key: 'num3', value: (row) => row.num2 + 1, updateComponent: true});
            }
            if (key === 'num3') {
                this.$refs.vtable.updateCell({row, key: 'num2', value: (row) => row.num3 - 1, updateComponent: true});
            }
            if (key === 'num1' || key === 'num2' || key === 'num3') {
                this.$refs.vtable.updateCell({row, key: 'num4', value: (row) => row.num1 + row.num2 + row.num3, updateComponent: true});
            }
        }
    }
};
</script>

