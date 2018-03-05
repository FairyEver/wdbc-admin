<style lang="less">
    @import '~@/styles/business.less';
</style>

<template>
    <div>
        <LayoutHeader title="淘汰记录"></LayoutHeader>
        <Form ref="searchForm" :model="searchForm" :rules="rules" label-position="top" inline>
            <FormItem prop="strain" label="品系">
                <StrainSelect :value.sync="searchForm.strain"></StrainSelect>
            </FormItem>
            <FormItem prop="gen" label="世代"><Input type="text" v-model="searchForm.gen" placeholder="世代"></Input></FormItem>
            <FormItem prop="time" label="淘汰日期">
                <DatePicker :value="searchForm.time" @on-change="timeChange" type="datetimerange" format="yyyy-MM-dd" placeholder="淘汰日期" style="width: 200px"></DatePicker>
            </FormItem>
            <FormItem prop="delFlag" label="删除">
                <i-switch v-model="searchForm.delFlag" true-value="1" false-value="0"></i-switch>
            </FormItem>
            <FormItem label="搜索">
                <Button type="primary" @click="search" :loading="table.loading">
                    <template v-if="table.loading">正在请求数据</template>
                    <Icon v-if="!table.loading" type="search"></Icon>
                </Button>
            </FormItem>
        </Form>
        <LayoutTableCard>
            <Form inline slot="title">
                <FormItem style="margin-bottom: 0px;">
                    <Input disabled type="text" v-model="tableForm.strain" style="width: 100px;">
                        <span slot="prepend">品系</span>
                    </Input>
                </FormItem>
                <FormItem style="margin-bottom: 0px;">
                    <Input disabled type="text" v-model="tableForm.gen" style="width: 100px;">
                        <span slot="prepend">世代</span>
                    </Input>
                </FormItem>
                <!-- <FormItem style="margin-bottom: 0px;">
                    <Button v-if="table.data.length > 0" type="primary" @click="save" :loading="table.loading">
                        同步设置
                        <Icon type="upload"></Icon>
                    </Button>
                </FormItem> -->
            </Form>
            <div>
                <Vtable ref="vtable" v-bind="table"></Vtable>
                <div style="margin: 10px;">
                    <PageList :current="page.current" :total="page.total" :page-size="page.size" @change="pageChangeHandler"></PageList>
                </div>
            </div>
        </LayoutTableCard>
    </div>
</template>

<script>
import { axiosToken, axiosErrorHandler } from '@/plugins/axios.js';
// mixin
import formValidate from '@/mixin/formValidate.js';
import business from '@/mixin/business.js';
export default {
    mixins: [
        formValidate,
        business
    ],
    data () {
        return {
            searchForm: {
                strain: 'Y1', // 品系
                gen: '15', // 世代
                time: ['', ''], // 淘汰日期
                delFlag: '0'
            },
            rules: {
                strain: [{required: true, message: '必填', trigger: 'change'}],
                gen: [{required: true, message: '必填', trigger: 'blur'}]
            },
            table: {
                columns: [
                    {title: '批次', key: 'hax'},
                    {
                        title: '淘汰位置',
                        key: 'position',
                        control: 'DictTag',
                        props: {
                            options: []
                        }
                    },
                    {
                        title: '状态',
                        key: 'state',
                        control: 'DictTag',
                        props: {
                            options: [
                                {label: '删除', value: 1},
                                {label: '删除且提示原因', value: 2},
                                {label: '标记删除', value: 3}
                            ]
                        }
                    },
                    {title: '笼号', key: 'cageNumber'},
                    {title: '翅号', key: 'wb'},
                    {title: '身份号码', key: 'identityNumber'},
                    {title: '淘汰日期', key: 'eliminateDate'},
                    {title: '日龄', key: 'day'},
                    {title: '周龄', key: 'week'},
                    {title: '删除', key: 'delFlag'},
                    {title: '淘汰原因', key: 'eliminationReason'},
                    {title: '创建日期', key: 'createDate'},
                    {title: '创建人', key: 'createUser'}
                ],
                data: [],
                loading: false
            },
            // syncDictData 方法会使用这个数据 为表格 columns 中的字典赋值
            tableDictSetting: [
                {type: 'Z100', key: 'position'}
            ],
            tableForm: {
                strain: '', // 品系
                gen: '' // 世代
            }
        };
    },
    methods: {
        search () {
            this.syncDictData().then(this.syncTableData);
        },
        // 更新淘汰日期
        timeChange (value) {
            this.searchForm.time = value;
        },
        syncTableData () {
            // 搜索表单没有通过校验
            if (!this.tryFormValidate('searchForm')) {
                return;
            }
            this.table.loading = true;
            axiosToken({
                url: '/a/chicken/chicken',
                data: {
                    strain: this.searchForm.strain,
                    gen: this.searchForm.gen,
                    startTime: this.searchForm.time[0],
                    endTime: this.searchForm.time[1],
                    delFlag: this.searchForm.delFlag,
                    type: '1',
                    pageNo: this.page.current,
                    pageSize: this.page.size
                }
            }).then(res => {
                let rowMaker = ({
                    id = '',
                    hax = '',
                    position = '',
                    state = '',
                    cageNumber = '',
                    wb = '',
                    identityNumber = '',
                    eliminateDate = '',
                    day = '',
                    week = '',
                    delFlag = '',
                    eliminationReason = '',
                    createDate = '',
                    createUser = ''
                }) => ({
                    id,
                    hax,
                    position,
                    state,
                    cageNumber,
                    wb,
                    identityNumber,
                    eliminateDate,
                    day,
                    week,
                    delFlag,
                    eliminationReason,
                    createDate,
                    createUser
                });
                // 缓存
                let page = res.data.page;
                // 表格数据 只要需要提交的
                this.table.data = page.list ? page.list.map(e => rowMaker(e)) : [];
                // 分页设置
                this.page.current = page.pageNo;
                this.page.total = page.total;
                this.page.size = page.pageSize;
                // 表头数据 表格数据确实有数据的时候才会赋值
                if (this.table.data.length > 0) {
                    this.tableForm.strain = this.searchForm.strain;
                    this.tableForm.gen = this.searchForm.gen;
                }
                // 结束
                this.table.loading = false;
            }).catch(error => axiosErrorHandler(error));
        }
        // save () {
        //     let rows = this.$refs.vtable.changedRow.map(e => e.identityNumber);
        //     if (rows.length === 0) {
        //         this.$Message.error('没有需要提交的数据');
        //         return;
        //     }
        //     // 提交设置
        //     axiosToken({
        //         url: '/a/dj/dj001',
        //         method: 'delete',
        //         data: rows
        //     })
        //     .then(res => {
        //         if (res.data.code === 0) {
        //             this.$Message.success(res.data.msg);
        //             this.page.current = 1;
        //             this.syncTableData();
        //         } else {
        //             this.$Message.error(res.data.msg);
        //         }
        //     })
        //     .catch(error => axiosErrorHandler(error));
        // }
    }
};
</script>
