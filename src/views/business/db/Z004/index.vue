<template>
    <div>
        <LayoutHeader title="个体性状指标分配" sub-title="个体性状指标分配"></LayoutHeader>
        <Form ref="searchForm" :model="searchForm" label-position="top" inline>
            <FormItem prop="gen" label="性状指标">
                <Input style="width: 100px" type="text" v-model="searchForm.name" placeholder="性状指标"></Input>
            </FormItem>
            <FormItem label="搜索">
                <Button type="primary" @click="handleSearch"><Icon type="search"></Icon></Button>
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
            searchForm: {
                name: ''
            },
            table: {
                columns: [
                    {title: '编码', key: 'code', width: 100, control: 'Input'},
                    {title: '性状指标', key: 'name', control: 'Input'},
                    {
                        title: '多重属性',
                        key: 'multipleAttribute',
                        control: 'DictRadio',
                        props: {
                            options: [],
                            mode: 'table',
                            filterable: false
                        }
                    },
                    {
                        title: '字段类型',
                        key: 'fieldType',
                        control: 'DictRadio',
                        props: {
                            options: [
                                {label: '数值', value: 1},
                                {label: '字符', value: 2}
                            ],
                            mode: 'table'
                        }
                    },
                    {title: '小数位数', key: 'decimalPlace', control: 'Input'},
                    {title: '单位', key: 'unit', control: 'Input'}
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
                {type: 'yes_no', key: 'multipleAttribute'}
            ],
            // 开发调试 检测发生变化的行
            tableChangedRow: {
                columns: [],
                data: []
            }
        };
    },
    mounted () {
        this.handleSearch()
    },
    methods: {
        // 搜索
        handleSearch () {
            this.syncDictData().then(this.syncTableData);
        },
        // 获取表格数据
        syncTableData () {
            this.table.loading = true;
            axiosToken({
                url: '/a/config/traitIndex',
                data: {
                    name: this.searchForm.name,
                    pageNo: this.page.current,
                    pageSize: this.page.size
                }
            })
            .then(res => {
                let rowMaker = ({
                    code = '',
                    id = '',
                    name = '',
                    multipleAttribute = '',
                    fieldType = '',
                    decimalPlace = '',
                    unit = ''
                }) => ({
                    code,
                    id,
                    name,
                    multipleAttribute: String(multipleAttribute),
                    fieldType,
                    decimalPlace,
                    unit,
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
                this.table.addTemplate = rowMaker({
                    isLayer: '0'
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
            console.log(rows)
            // 校验
            if (rows.some(e => {
                if (e.delFlag === '1') {
                    return false;
                } else {
                    return e.code === '' ||
                    e.name === '' ||
                    e.multipleAttribute === '' ||
                    e.fieldType === '' ||
                    (e.fieldType === 1 && e.decimalPlace === '');
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
                url: '/a/config/traitIndex',
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
