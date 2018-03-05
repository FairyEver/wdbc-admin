// 基础
import * as tool from '@/assets/library/tool.js';
export default {
    props: {
        columns: {default: () => []},
        data: {default: () => []}
    },
    watch: {
        data () {
            this.dataChangeHandler();
        }
    },
    created () {
        this.dataChangeHandler();
    },
    computed: {
        attrs () {
            let def = ({size = 'small', border = true, stripe = true}) => ({size, border, stripe});
            return {
                ...this.$attrs,
                ...def(this.$attrs)
            };
        },
        columnsComputed () {
            // 如果是有新增功能 需要扩展一列新增控制
            let _this = this;
            let addModeColumns = this.addMode ? [
                {
                    title: '新增',
                    align: 'center',
                    width: 64,
                    fixed: 'right',
                    render: (h, params) => h('div', {
                        style: {
                            marginLeft: '-18px',
                            marginRight: '-18px'
                        }
                    }, [
                        h(params.row._isAddRow ? 'Button' : 'div', params.row._isAddRow ? {
                            props: {
                                type: 'primary',
                                size: 'small'
                            },
                            on: {
                                click () {
                                    _this.dataCopy.splice(params.index, 1);
                                    _this.dataDisplay = tool.clone(_this.dataCopy);
                                    _this.$emit('rowChange');
                                }
                            }
                        } : {}, params.row._isAddRow ? '放弃' : '')
                    ])
                }
            ] : [];
            // 删除按钮列
            let deleteModeColumns = this.deleteMode ? [
                {
                    title: '删除',
                    align: 'center',
                    width: 70,
                    fixed: 'right',
                    render: (h, params) => {
                        let isDelete = params.row[this.deleteKey] === this.deleteTrueValue;
                        let isAddRow = params.row._isAddRow;
                        if (isAddRow) {
                            return h('div');
                        } else {
                            return h('div', {
                                style: {
                                    marginLeft: '-18px',
                                    marginRight: '-18px'
                                }
                            }, [
                                h('Button', {
                                    props: {
                                        size: 'small',
                                        type: isDelete ? 'warning' : 'ghost'
                                    },
                                    on: {
                                        click () {
                                            _this.updateCell({
                                                row: params.index,
                                                key: _this.deleteKey,
                                                value: isDelete ? _this.deleteFalseValue : _this.deleteTrueValue
                                            });
                                            _this.dataDisplay = tool.clone(_this.dataCopy);
                                        }
                                    }
                                }, [
                                    h('Icon', {
                                        props: {
                                            type: isDelete ? 'reply' : 'trash-a'
                                        },
                                        style: {
                                            marginRight: '5px'
                                        }
                                    }),
                                    isDelete ? '撤销' : '删除'
                                ])
                            ]);
                        }
                    }
                }
            ] : [];
            // 综合
            return [
                ...this.columns.map((e, index) => {
                    if (e.align === undefined) { e.align = 'center'; }
                    if (e.control) {
                        e.render = (h, params) => h('div', [this.controlBuilder(e, h, params)]);
                    }
                    if (e.children) {
                        e.title = e.title || '操作';
                        e.render = (h, params) => h('div', {
                            style: {
                                marginLeft: '-18px',
                                marginRight: '-18px'
                            }
                        }, !params.row._isAddRow ? [
                            e.children.map((child, childIndex) => this.buttonBuilder(e, h, params, child, childIndex, child.p ? this.$root.p(child.p) : true))
                        ] : '');
                    }
                    if (e.title === undefined) { e.title = e.key; }
                    return e;
                }),
                ...deleteModeColumns,
                ...addModeColumns
            ];
        },
        dataComputed () {
            return [
                ...this.dataDisplay
            ];
        }
    },
    methods: {
        dataChangeHandler () {
            if (this.dataCopy !== this.data) {
                this.dataCopy = tool.clone(this.data);
                this.dataDisplay = tool.clone(this.data);
            }
        }
    }
};
