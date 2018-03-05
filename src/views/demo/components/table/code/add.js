export default `<template>
    <div>
        <h1 style="margin-bottom: 10px;">添加行 / 外部互相影响 / 可编辑 / 非控件重赋值 / 扩展列</h1>
        <Vtable
            ref="vtable"
            v-bind="table"
            @change="vTableChangeHandler"
            @on="vTableOnHandler">
        </Vtable>
        <!-- <br>
        <Row :gutter="10">
            <Col span="12">

            </Col>
            <Col span="12">

            </Col>
        </Row> -->
        <!-- <br> -->
        <!-- <CodeCard :data="code" :stringify="false"></CodeCard> -->
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
                    {title: '姓名', key: 'name'},
                    {title: '年龄', key: 'age', control: 'InputNumber'},
                    {title: '地址', key: 'address', width: 240},
                    {title: '已婚', key: 'married'},
                    {title: '创建日期', key: 'creatData', width: 150},
                    {title: '更新日期', key: 'updateData', width: 200},
                    {key: 'num1', control: 'InputNumber'},
                    {key: 'num2', control: 'InputNumber'},
                    {key: 'num3', control: 'InputNumber'},
                    {key: 'num4'},
                    {
                        width: 130,
                        children: [
                            {action: 'edit', icon: 'edit'},
                            {action: 'delete', text: '删除', icon: 'trash-a'}
                        ]
                    }
                ],
                data: [],
                loading: false,
                addMode: true,
                addTemplate: {
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
        vTableOnHandler ({name, row, index}) {
            if (this[name]) {
                this[name](row, index);
            } else {
                this.$Message.error('没有匹配的 method');
            }
        },
        edit (row, index) {
            this.$Message.info('edit index = ' + index);
            console.log('edit index = ' + index);
            console.table([row]);
        },
        delete (row, index) {
            this.$Message.warning('delete index = ' + index);
            console.log('delete index = ' + index);
            console.table([row]);
        }
    }
};
</script>`;
