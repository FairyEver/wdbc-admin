<template>
    <div>
        <LayoutHeader title="用途" sub-title="肉鸡取采集不同的批次相同用户的数据，后续性状分析也是按用途做"></LayoutHeader>
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
                    // {title: '用途ID', key: 'useId', control: 'Input', style: {width: '100px'}},
                    {title: '描述', key: 'name', control: 'Input', style: {width: '300px'}},
                    {
                        title: '扩繁',
                        key: 'expansionBreeding',
                        control: 'DictRadio',
                        props: {
                            options: [],
                            mode: 'table'
                        }
                    },
                    {
                        title: '来源选种用途',
                        key: 'sourceSelectionUse',
                        control: 'DictSelect',
                        props: {
                            options: [],
                            mode: 'table',
                            filterable: false
                        },
                        style: {
                            width: '100px'
                        }
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
                {type: 'yes_no', key: 'expansionBreeding'},
                {type: 'Z008', key: 'sourceSelectionUse'}
            ],
            // 开发调试 检测发生变化的行
            tableChangedRow: {
                columns: [],
                data: []
            }
        };
    },
    created () {
        this.syncDictData().then(this.syncTableData)
    },
    methods: {
        // 获取表格数据
        syncTableData () {
            this.table.loading = true;
            axiosToken({
                url: '/a/config/chickenUse',
                data: {
                    pageNo: this.page.current,
                    pageSize: this.page.size
                }
            })
            .then(res => {
                let rowMaker = ({
                    id = '',
                    // useId = '',
                    name = '',
                    expansionBreeding = '',
                    sourceSelectionUse = ''
                }) => ({
                    id,
                    // useId,
                    name,
                    expansionBreeding: String(expansionBreeding),
                    sourceSelectionUse,
                    delFlag: '0'
                });
                // 缓存
                let page = res.data.page;
                // 表格数据 只要需要提交的
                this.table.data = page.list.map(e => rowMaker(e));
                this.table.loading = false;
                // 分页设置
                this.page.current = page.pageNo;
                this.page.total = page.total;
                this.page.size = page.pageSize;
                // 新增行设置
                this.table.addTemplate = rowMaker({});
                // 调试设置
                let _row = this.table.data.length > 0 ? this.table.data[0] : [];
                let _col = Object.keys(_row).map(e => ({key: e}));
                this.tableChangedRow.columns = _col;
                this.tableChangedRow.data = [];
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
                    return e.name === '' ||
                    e.sourceSelectionUse === '';
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
                url: '/a/config/chickenUse',
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
