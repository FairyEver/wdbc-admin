<template>
    <div>
        <h1 style="margin-bottom: 10px;">添加行 / 外部互相影响 / 可编辑 / 非控件重赋值 / 扩展列 / 删除操作</h1>
        <Vtable
            ref="vtable"
            v-bind="table"
            @change="vTableChangeHandler"
            @on="vTableOnHandler"
            @rowChange="vTableRowChangeHandler">
        </Vtable>
        <br>
        <Row :gutter="10">
            <Col span="6">
                <Card dis-hover>
                    <p slot="title">log</p>
                    <Button slot="extra" size="small" @click="log = []">清空</Button>
                    <p v-for="(log, index) in log" :key="index" style="font-size: 10px;">{{log}}</p>
                </Card>
            </Col>
            <Col span="10">
                <Card dis-hover>
                    <p slot="title">过滤变化 (只显示部分字段)</p>
                    <div style="margin: -17px">
                        <Vtable v-bind="tableChangedRow"></Vtable>
                    </div>
                </Card>
            </Col>
            <Col span="8">
                <CodeCard :data="nowChangeRow" title="发生数据改变的行 (实时更新)"></CodeCard>
            </Col>
        </Row>
        <!-- <br>
        <CodeCard :data="code" :stringify="false"></CodeCard> -->
    </div>
</template>

<script>
import { axios, axiosErrorHandler } from '@/plugins/axios.js';
import moment from 'moment';
import code from './code/add.js';
export default {
    data () {
        return {
            table: {
                columns: [
                    {title: '姓名', key: 'name', width: 120, control: 'Input'},
                    {title: '年龄', key: 'age', width: 120, control: 'InputNumber'},
                    {title: '地址', key: 'address', width: 240, control: 'Input'},
                    {title: '已婚', key: 'married', width: 120, control: 'i-switch'},
                    {title: '创建日期', key: 'creatData', width: 150, control: 'DatePicker'},
                    {title: '更新日期', key: 'updateData', width: 200, control: 'DatePicker', props: { type: 'datetime' }},
                    {key: 'num1', width: 120, control: 'InputNumber'},
                    {key: 'num2', width: 120, control: 'InputNumber'},
                    {key: 'num3', width: 120, control: 'InputNumber'},
                    {key: 'num4', width: 80},
                    {title: '删除', key: 'delFlag', width: 80},
                    {
                        width: 100,
                        fixed: 'right',
                        children: [
                            {action: 'do', text: '操作', icon: 'hammer'}
                        ]
                    }
                ],
                data: [],
                loading: false,
                addMode: true,
                deleteMode: true,
                addTemplate: {
                    id: '',
                    name: 'name',
                    age: 1,
                    address: 'address',
                    married: false,
                    admin: '0',
                    creatData: moment().format('YYYY-M-D'),
                    updateData: moment().format('YYYY-M-D HH:mm:ss'),
                    delete: '0',
                    qq: false,
                    project: '',
                    num1: 0,
                    num2: 0,
                    num3: 0,
                    num4: 0
                }
            },
            tableChangedRow: {
                columns: [
                    {title: 'ID', key: 'id'},
                    {title: '姓名', key: 'name'},
                    {title: '年龄', key: 'age'},
                    {key: 'num4'}
                ],
                data: []
            },
            log: [],
            nowChangeRow: [],
            changedRow: [],
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
            // 更新外部的保存数据变化table
            this.tableChangedRow.data = this.$refs.vtable.changedRow;
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
        },
        vTableRowChangeHandler () {
            // 更新外部的保存数据变化table
            this.tableChangedRow.data = this.$refs.vtable.changedRow;
        },
        vTableOnHandler ({name, row, index}) {
            if (this[name]) {
                this[name](row, index);
            } else {
                this.$Message.error('没有匹配的 method');
            }
        },
        do (row, index) {
            this.$Message.info('do index = ' + index);
            console.log('do index = ' + index);
            console.table([row]);
        }
    }
};
</script>

