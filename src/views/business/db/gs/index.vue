<template>
    <div>
        <LayoutHeader title="公式" sub-title="公式管理"></LayoutHeader>
        <Vtable
            height="450"
            ref="vtable"
            v-bind="table"
            @change="vTableChangeHandler"
            @rowChange="vTableRowChangeHandler"
            @save="vTableSaveHandler">
        </Vtable>
        <PageList :current="page.current" :total="page.total" :page-size="page.size" @change="pageChangeHandler"></PageList>
        <!-- <br>
        <Card dis-hover>
            <p slot="title">需要提交的数据(测试用)</p>
            <div style="margin: -17px">
                <Vtable v-bind="tableChangedRow"></Vtable>
            </div>
        </Card> -->
    </div>
</template>

<script>
// 库
import { axiosToken, axiosErrorHandler } from '@/plugins/axios.js';
// mixin
import business from '@/mixin/business.js';
export default {
    mixins: [
        business
    ],
    data () {
        return {
            table: {
                columns: [
                    {
                        key: 'indexId',
                        title: '指标ID',
                        control: 'Input'
                    },
                    {
                        key: 'indexAttribute',
                        title: '指标属性',
                        control: 'Input'
                    },
                    {
                        key: 'calculation',
                        title: '计算方式',
                        width: 150,
                        control: 'DictSelect',
                        props: {
                            options: [
                                {label: '特殊计算', value: '1'},
                                {label: '赋值计算', value: '2'},
                                {label: '累计计算', value: '3'},
                                {label: '平均值计算', value: '4'},
                                {label: '标准差计算', value: '5'},
                                {label: '公式计算', value: '6'},
                                {label: '全同胞计算', value: '7'}
                            ],
                            mode: 'table',
                            filterable: false
                        },
                        style: {
                            width: '120px'
                        }
                    },
                    {
                        key: 'rangeFrom',
                        title: '范围from',
                        control: 'Input'
                    },
                    {
                        key: 'rangeTo',
                        title: '范围to',
                        control: 'Input'
                    },
                    {
                        key: 'startAge',
                        title: '开始计算日龄',
                        control: 'Input'
                    },
                    {
                        key: 'sourceSex',
                        title: '来源性别',
                        control: 'DictSelect',
                        props: {
                            options: [],
                            mode: 'table',
                            filterable: false
                        }
                    },
                    {
                        key: 'sourceIndexId',
                        title: '来源性状ID',
                        control: 'Input'
                    },
                    {
                        key: 'formula',
                        title: '公式',
                        width: 200,
                        control: 'Formula'
                    }
                ],
                data: [],
                loading: false,
                addMode: true,
                saveMode: true,
                deleteMode: true,
                addTemplate: {}
            },
            // syncDictData 方法会使用这个数据 为表格 columns 中的字典赋值
            tableDictSetting: [
                {type: 'sex', key: 'sourceSex'}
            ],
            // 开发调试 检测发生变化的行
            tableChangedRow: {
                columns: [],
                data: []
            }
        };
    },
    created () {
        this.syncDictData().then(this.syncTableData);
        // this.syncTableData()
    },
    methods: {
        // 获取表格数据
        syncTableData () {
            this.table.loading = true;
            axiosToken({
                url: '/a/config/indexFormula',
                data: {
                    pageNo: this.page.current,
                    pageSize: this.page.size
                }
            })
            .then(res => {
                let rowMaker = ({
                    id = '',
                    indexId = '',
                    indexAttribute = '',
                    calculation = '',
                    rangeFrom = '',
                    rangeTo = '',
                    startAge = '',
                    sourceSex = '',
                    sourceIndexId = '',
                    formula = ''
                }) => ({
                    id,
                    indexId,
                    indexAttribute,
                    calculation,
                    rangeFrom,
                    rangeTo,
                    startAge,
                    sourceSex: String(sourceSex),
                    sourceIndexId,
                    formula,
                    delFlag: '0'
                });
                // 缓存
                let page = res.data.page;
                // 表格数据 只要需要提交的
                this.table.data = (page.list || []).map(e => rowMaker(e));
                this.table.loading = false;
                // 分页设置
                this.page.current = page.pageNo;
                this.page.total = page.total;
                this.page.size = page.pageSize;
                // 新增行设置
                this.table.addTemplate = rowMaker({});
                // // 调试设置
                // let _row = this.table.data.length > 0 ? this.table.data[0] : [];
                // let _col = Object.keys(_row).map(e => ({key: e}));
                // this.tableChangedRow.columns = _col;
                // this.tableChangedRow.data = [];
            })
            .catch(error => {
                this.table.loading = false;
                axiosErrorHandler(error);
            });
        },
        // 保存
        vTableSaveHandler (rows) {
            // 校验
            if (rows.some(e => {
                if (e.delFlag === '1') {
                    return false;
                } else {
                    return e.indexId === '' ||
                        e.indexAttribute === '' ||
                        e.calculation === '' ||
                        e.rangeFrom === '' ||
                        e.rangeTo === '' ||
                        e.startAge === '' ||
                        e.sourceSex === '' ||
                        e.sourceIndexId === '' ||
                        e.formula === ''
                }
            })) {
                this.$Message.error('数据校验没有通过');
                return;
            }
            if (rows.length === 0) {
                this.$Message.error('没有需要提交的数据');
                return;
            }
            // 提交
            axiosToken({
                url: '/a/config/indexFormula',
                method: 'post',
                data: rows
            })
            .then(res => {
                if (res.data.code === 0) {
                    this.$Message.success(res.data.msg);
                    this.page.current = 1;
                    this.syncTableData();
                } else {
                    this.$Message.error(res.data.msg);
                }
            })
            .catch(error => axiosErrorHandler(error));
        },
        vTableChangeHandler ({row, key, value}) {
            this.tableChangedRow.data = this.$refs.vtable.changedRow;
        },
        vTableRowChangeHandler () {
            this.tableChangedRow.data = this.$refs.vtable.changedRow;
        }
    }
};
</script>
