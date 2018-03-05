<template>
    <div>
        <LayoutHeader title="指标与性状" sub-title="指标与性状"></LayoutHeader>
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
                        title: '指标',
                        key: 'indexId',
                        control: 'Cascader',
                        props: {
                            data: []
                        },
                        style: {
                            width: '300px',
                            margin: '0px auto'
                        }
                    },
                    {
                        title: '性状',
                        key: 'trait',
                        control: 'DictSelect',
                        props: {
                            filterable: false,
                            options: [],
                            mode: 'table'
                        },
                        style: {
                            width: '140px'
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
            // 开发调试 检测发生变化的行
            tableChangedRow: {
                columns: [],
                data: []
            }
        };
    },
    created () {
        this.syncCascaderData()
    },
    methods: {
        // 获取级联选择器的数据
        syncCascaderData () {
            axiosToken({
                url: '/a/config/indexDetail/indexTree',
            }).then(res => {
                this.table.columns.find(c => c.key === 'indexId').props.data = res.data.list
                // 再去请求表格数据
                this.syncTableData()
            }).catch(error => axiosErrorHandler(error));
        },
        // 获取表格数据
        syncTableData () {
            this.table.loading = true;
            axiosToken({
                url: '/a/config/indexTrait'
            })
            .then(res => {
                // 传入一个值 找到这个值在级联选择器中的路径
                let indexIdToArray = (indexId) => {
                    const cascaderData = this.table.columns.find(c => c.key === 'indexId').props.data
                    let path = []
                    const item1 = cascaderData.find(e => {
                        if (e.children) {
                            const item2 = e.children.find(a => {
                                if (a.children) {
                                    const item3 = a.children.find(b => b.value === indexId)
                                    if (item3) {
                                        path.push(item3)
                                    }
                                    return item3
                                } else {
                                    return false
                                }
                            })
                            if (item2) {
                                path.push(item2)
                            }
                            return item2
                        } else {
                            return false
                        }
                    })
                    if (item1) {
                        path.push(item1)
                    }
                    return path.reverse().map(e => e.value)
                }
                let rowMaker = ({
                    id = '',
                    indexId = '',
                    trait = ''
                }) => ({
                    id,
                    indexId: indexIdToArray(indexId),
                    trait,
                    delFlag: '0'
                });
                // 缓存
                let page = res.data.page;
                // 如果和数据一起来的还有字典信息 先在这里赋字典数据
                this.table.columns.find(c => c.key === 'trait').props.options = res.data.list.map(e => ({
                    label: e.name,
                    value: e.code
                }));
                // 表格数据 只要需要提交的
                if (page.list) {
                    this.table.data = page.list.map(e => rowMaker(e));
                }
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
                    return e.indexId.length !== 3 ||
                    e.trait === '';
                }
            })) {
                this.$Message.error('数据校验没有通过');
                return;
            }
            if (rows.length === 0) {
                this.$Message.error('没有需要提交的数据');
                return;
            }
            const _rows = rows.map(e => ({
                ...e,
                indexId: e.indexId[2]
            }))
            // 提交
            axiosToken({
                url: '/a/config/indexTrait',
                method: 'post',
                data: _rows
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
