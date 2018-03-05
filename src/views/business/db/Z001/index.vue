<template>
    <div>
        <LayoutHeader title="分配淘汰原因公司" sub-title="确定淘汰原因用在哪里业务上"></LayoutHeader>

        <Form ref="searchForm" :model="searchForm" label-position="top" inline>
            <FormItem prop="strain" label="位置">
                <DictSelect :value.sync="searchForm.position" type="Z100" :filterable="false" :width="100"></DictSelect>
            </FormItem>
            <FormItem label="查询">
                <Button @click="search()"><Icon type="search"></Icon></Button>
            </FormItem>
        </Form>

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
                    // {
                    //     title: '位置',
                    //     key: 'position',
                    //     control: 'DictSelect',
                    //     props: {
                    //         options: [],
                    //         filterable: false,
                    //         mode: 'table'
                    //     },
                    //     style: {
                    //         width: '140px'
                    //     }
                    // },
                    {
                        title: '位置',
                        key: 'position',
                        control: 'DictTag',
                        props: {
                            options: []
                        }
                    },
                    {
                        title: '淘汰原因',
                        key: 'eliminationReasonId',
                        control: 'DictSelect',
                        props: {
                            options: [],
                            filterable: true,
                            mode: 'table'
                        },
                        style: {
                            width: '160px'
                        }
                    },
                    {title: '显示顺序', key: 'sort', control: 'Input', style: {width: '100px'}}
                ],
                data: [],
                loading: false,
                addMode: true,
                saveMode: true,
                deleteMode: true,
                addTemplate: {}
            },
            searchForm: {
                position: ''
            },
            // syncDictData 方法会使用这个数据 为表格 columns 中的字典赋值
            tableDictSetting: [
                {type: 'Z100', key: 'position'}
            ],
            // 开发调试 检测发生变化的行
            tableChangedRow: {
                columns: [],
                data: []
            }
        };
    },
    created () {
        this.search();
    },
    methods: {
        search () {
            this.syncDictData().then(this.syncTableData)
        },
        // 获取表格数据
        syncTableData () {
            this.table.loading = true;
            axiosToken({
                url: '/a/config/eliminationReasonUse',
                data: {
                    position: this.searchForm.position,
                    pageNo: this.page.current,
                    pageSize: this.page.size
                }
            })
            .then(res => {
                let rowMaker = ({
                    id = '',
                    position = '',
                    eliminationReasonId = '',
                    sort = ''
                }) => ({
                    id,
                    position,
                    eliminationReasonId,
                    sort,
                    delFlag: '0'
                });
                // 缓存
                let page = res.data.page;
                // 如果和数据一起来的还有字典信息 先在这里赋字典数据
                this.table.columns.find(c => c.key === 'eliminationReasonId').props.options = res.data.list.map(e => ({
                    label: e.name,
                    value: e.id
                }));
                // 表格数据 只要需要提交的
                this.table.data = (page.list ? page.list : []).map(e => rowMaker(e));
                this.table.loading = false;
                // 分页设置
                this.page.current = page.pageNo;
                this.page.total = page.total;
                this.page.size = page.pageSize;
                // 新增行设置
                this.table.addTemplate = rowMaker({
                    position: this.searchForm.position
                });
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
                    return e.position === '' ||
                    e.eliminationReasonId === '';
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
                url: '/a/config/eliminationReasonUse',
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
