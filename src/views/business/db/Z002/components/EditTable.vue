<template>
    <div>
        <Vtable
            ref="vtable"
            v-bind="table"
            @change="vTableChangeHandler"
            @rowChange="vTableRowChangeHandler"
            @on="vTableOnHandlerChang">
        </Vtable>
        <PageList :current="page.current" :total="page.total" :page-size="page.size" @change="pageChangeHandler"></PageList>
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
            page: {
                current: 1,
                total: 0,
                size: 7
            },
            table: {
                columns: [
                    {
                        title: '编号 / 名称',
                        key: 'traitIndexId',
                        control: 'DictSelect',
                        props: {
                            options: [],
                            mode: 'table',
                            filterable: true
                        },
                        style: {
                            width: '200px'
                        }
                    }
                ],
                data: [],
                loading: false,
                addMode: true,
                // saveMode: true,
                deleteMode: true,
                addTemplate: {}
            },
            // 实时更新发生变化的行
            tableChangedRow: {
                data: []
            },
            // 所有的选项
            options: []
        }
    },
    methods: {
        save (strain) {
            const rows = this.tableChangedRow.data.map(e => {
                return {
                    // id: this.options.find(o => o.code === e.traitIndexId).id,
                    id: e.id,
                    strain: strain,
                    traitIndexId: e.traitIndexId,
                    delFlag: e.delFlag
                }
            })
            return new Promise((resolve, reject) => {
                if (rows.length === 0) {
                    reject();
                    this.$Message.error('没有需要提交的数据');
                    return;
                }
                this.table.loading = true;
                axiosToken({
                    url: '/a/config/strainTraitIndex',
                    method: 'post',
                    data: rows
                })
                .then((res) => {
                    if (res.data.code === 0) {
                        this.$Message.success(res.data.msg);
                        this.page.current = 1;
                        resolve();
                    } else {
                        this.$Message.error(res.data.msg);
                        this.table.loading = false;
                        reject();
                    }
                })
                .catch(error => {
                    this.table.loading = false;
                    axiosErrorHandler(error);
                    reject();
                });
            })
        },
        syncTableData (strain) {
            this.table.loading = true;
            axiosToken({
                url: '/a/config/strainTraitIndex',
                data: {
                    strain: strain,
                    pageNo: this.page.current,
                    pageSize: this.page.size
                }
            })
            .then(res => {
                let rowMaker = ({
                    id = '',
                    traitIndexId = ''
                }) => ({
                    id,
                    traitIndexId,
                    delFlag: '0'
                });
                // 缓存
                let page = res.data.page;
                // 如果和数据一起来的还有字典信息 先在这里赋字典数据
                if (res.data.list) {
                    this.options = res.data.list;
                    let options = res.data.list.map(e => ({
                        label: `${e.code} - ${e.name}`,
                        value: e.code
                    }));
                    this.table.columns.find(c => c.key === 'traitIndexId').props.options = options;
                }
                // 表格数据 只要需要提交的
                this.table.data = page.list ? page.list.map(e => rowMaker(e)) : [];
                // 分页设置
                this.page.current = page.pageNo;
                this.page.total = page.total;
                this.page.size = page.pageSize;
                // 新增行设置
                this.table.addTemplate = rowMaker({
                    isLayer: '0'
                });
                // 结束loading
                this.table.loading = false;
            })
            .catch(error => {
                this.table.loading = false;
                axiosErrorHandler(error);
            });
        },
        vTableOnHandlerChang ({name, row, index}) {
            if (this[name]) {
                this[name](row, index);
            } else {
                this.$Message.error('没有匹配的 method');
            }
        },
        vTableSaveHandler (rows) {
            console.log(rows)
        },
        vTableChangeHandler ({row, key, value}) {
            this.tableChangedRow.data = this.$refs.vtable.changedRow;
        },
        vTableRowChangeHandler () {
            this.tableChangedRow.data = this.$refs.vtable.changedRow;
        }
    }
}
</script>

