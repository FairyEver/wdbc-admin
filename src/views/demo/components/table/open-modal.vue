<template>
    <div>
        <h1 style="margin-bottom: 10px;">打开模态框的例子</h1>
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
import code from './code/open-modal.js';
export default {
    data () {
        return {
            table: {
                columns: [
                    {title: '姓名', key: 'name'},
                    {title: '年龄', key: 'age'},
                    {
                        title: '地址',
                        key: 'address',
                        render: (h, params) => {
                            return h('Tag', {
                                props: {
                                    type: 'border'
                                },
                                nativeOn: {
                                    click: () => {
                                        this.openAddressModal();
                                    }
                                }
                            }, '地址列表');
                        }
                    },
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
        axios.get('https://www.easy-mock.com/mock/5a09103ac645f122782988de/wdbc-admin/table')
        .then(res => {
            this.table.data = res.data.list;
            this.table.loading = false;
        })
        .catch(error => axiosErrorHandler(error));
    },
    methods: {
        // 打开地址模态框
        openAddressModal () {
            let data = [];
            this.$Spin.show();
            axios.get('https://www.easy-mock.com/mock/5a09103ac645f122782988de/wdbc-admin/table')
            .then(res => {
                data = res.data;
                this.$Spin.hide();
                this.$Modal.confirm({
                    title: 'Vtable组件在模态框中暂时不支持编辑功能(可以编辑，但是无法取值)',
                    width: 1200,
                    render: (h) => {
                        return h('Vtable', {
                            props: {
                                columns: [
                                    {title: '姓名', key: 'name'},
                                    {title: '年龄', key: 'age', control: 'InputNumber'},
                                    {title: '地址', key: 'address', width: 240},
                                    {
                                        title: '已婚',
                                        key: 'married',
                                        render: (h, params) => {
                                            return h('Icon', {
                                                props: {
                                                    type: 'heart'
                                                },
                                                style: {
                                                    color: params.row.married ? '#ed3f14' : '#bbbec4',
                                                    fontSize: '20px'
                                                }
                                            });
                                        }
                                    },
                                    {title: '管理员', key: 'admin'},
                                    {title: '创建日期', key: 'creatData', width: 150},
                                    {title: '更新日期', key: 'updateData', width: 200},
                                    {title: '删除', key: 'delFlag'},
                                    {title: '全勤', key: 'qq'},
                                    {title: '项目', key: 'project'}
                                ],
                                data
                            },
                            on: {
                                change: ({row, key, value}) => {
                                    console.log(row, key, value);
                                }
                            }
                        });
                    }
                });
            })
            .catch(error => axiosErrorHandler(error));
        }
    }
};
</script>

