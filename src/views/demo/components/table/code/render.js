export default `<template>
    <div>
        <h1 style="margin-bottom: 10px;">自定义渲染</h1>
        <Vtable ref="vtable" v-bind="table"></Vtable>
        <br>
        <CodeCard :data="code" :stringify="false"></CodeCard>
    </div>
</template>

<script>
import { axios, axiosErrorHandler } from '@/plugins/axios.js';
import code from './code/render.js';
export default {
    data () {
        return {
            table: {
                columns: [
                    {
                        title: '姓名 (移入查看全部数据)',
                        key: 'name',
                        width: 200,
                        render: (h, params) => {
                            let PoptipContentData = [];
                            for (var key of Object.keys(params.row)) {
                                if (key !== '_index' && key !== '_rowKey') {
                                    PoptipContentData.push({
                                        key,
                                        value: params.row[key]
                                    });
                                }
                            }
                            return h('Poptip', {
                                props: {
                                    trigger: 'hover',
                                    placement: 'right',
                                    title: params.row.name + '的全部信息'
                                }
                            }, [
                                h('Tag', {
                                    props: {
                                        type: 'border'
                                    }
                                }, params.row.name),
                                h('div', {
                                    slot: 'content'
                                }, PoptipContentData.map(e => h('p', e.key + ':' + e.value)))
                            ]);
                        }
                    },
                    {
                        title: '年龄',
                        key: 'age',
                        render: (h, params) => {
                            return h('Tooltip', {
                                props: {
                                    placement: 'top',
                                    content: '芳龄' + params.row.age
                                }
                            }, [
                                h('Tag', {
                                    props: {
                                        type: 'border'
                                    }
                                }, '移入鼠标')
                            ]);
                        }
                    },
                    {
                        title: '地址',
                        key: 'address',
                        render: (h, params) => {
                            return h('div', [
                                h('Icon', {
                                    props: {
                                        type: 'ios-home'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    }
                                }),
                                params.row.address
                            ]);
                        }
                    },
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
                    {
                        title: '管理员',
                        key: 'admin',
                        render: (h, params) => {
                            return h('Icon', {
                                props: {
                                    type: params.row.admin === '1' ? 'checkmark-circled' : 'close-circled'
                                },
                                style: {
                                    color: params.row.admin === '1' ? '#19be6b' : '#bbbec4',
                                    fontSize: '20px'
                                }
                            });
                        }
                    },
                    {
                        title: '删除',
                        key: 'delFlag',
                        render: (h, params) => {
                            return h('span', {
                                style: {
                                    color: '#bbbec4'
                                }
                            }, params.row.delete === '1' ? [
                                h('Button', {
                                    props: {
                                        type: 'text'
                                    },
                                    style: {
                                        color: '#ed3f14',
                                        paddingLeft: '5px',
                                        paddingRight: '5px'
                                    }
                                }, '已删除'),
                                h('Button', {
                                    props: {
                                        size: 'small',
                                        type: 'success'
                                    },
                                    on: {
                                        click: () => {
                                            alert('恢复' + params.row.name);
                                        }
                                    }
                                }, [
                                    h('Icon', {
                                        props: {
                                            type: 'loop'
                                        },
                                        style: {
                                            marginRight: '4px'
                                        }
                                    }),
                                    '恢复'
                                ])
                            ] : '正常');
                        }
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
    }
};
</script>`;
