<style lang="less">
    @import '~@/styles/business.less';
</style>

<template>
    <div>
        <LayoutHeader title="普测记录"></LayoutHeader>
        <Form ref="searchForm" :model="searchForm" :rules="rules" label-position="top" inline>
            <FormItem prop="strain" label="品系">
                <StrainSelect :value.sync="searchForm.strain"></StrainSelect>
            </FormItem>
            <FormItem prop="gen" label="世代"><Input type="text" v-model="searchForm.gen" placeholder="世代"></Input></FormItem>
            <FormItem prop="time" label="普测日期">
                <DatePicker :value="searchForm.time" @on-change="timeChange" type="datetimerange" format="yyyy-MM-dd" placeholder="普测日期" style="width: 200px"></DatePicker>
            </FormItem>
            <FormItem prop="startHax" label="开始批次"><Input type="text" v-model="searchForm.startHax" placeholder="开始批次"></Input></FormItem>
            <FormItem prop="endHax" label="结束批次"><Input type="text" v-model="searchForm.endHax" placeholder="结束批次"></Input></FormItem>
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
                <FormItem v-show="selection.length > 0" style="margin-bottom: 0px;">
                    <Button @click="remove" :loading="table.loading">
                        删除
                        <Icon type="trash-a"></Icon>
                    </Button>
                </FormItem>
            </Form>
            <div>
                <Vtable ref="vtable" v-bind="table" @on-selection-change="handleSelection"></Vtable>
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
                time: [], // 起止日期
                startHax: '',
                endHax: ''
            },
            rules: {
                strain: [{required: true, message: '必填', trigger: 'change'}],
                gen: [{required: true, message: '必填', trigger: 'blur'}]
            },
            table: {
                columns: [
                    {type: 'selection', width: 60, align: 'center'},
                    {title: '批次', key: 'hax'},
                    {title: '家系号', key: 'pen'},
                    {title: '小家系号', key: 'smallPen'},
                    {title: '翅号', key: 'wb'},
                    {title: '身份号码', key: 'identityNumber'},
                    {title: '测量日期', key: 'dateOfMeasurement'},
                    {title: '日龄', key: 'day'},
                    {title: '周龄', key: 'week'},
                    {title: '性状指标', key: 'traitIndex'},
                    {title: '值', key: '_value'},
                    {title: '单位', key: 'company'},
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
            },
            selection: []
        };
    },
    methods: {
        search () {
            this.syncTableData();
        },
        remove () {
            this.table.loading = true;
            let list = this.selection.map(e => {
                return e.id;
            })
            axiosToken({
                url: '/a/chicken/chickenGeneralSurvey',
                method: 'post',
                data: list
            }).then(res => {
                this.$Message.success(res.data.msg);
                this.selection = [];
                this.syncTableData();
            }).catch(error => {
                this.table.loading = false;
                axiosErrorHandler(error);
            });
        },
        handleSelection (selection) {
            this.selection = selection;
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
                url: '/a/chicken/chickenGeneralSurvey',
                data: {
                    strain: this.searchForm.strain,
                    gen: this.searchForm.gen,
                    startTime:this.searchForm.time[0],
                    endTime:this.searchForm.time[1],
                    startHax: this.searchForm.startHax ? this.searchForm.startHax.padStart(2, '0') : '',
                    endHax: this.searchForm.endHax ? this.searchForm.endHax.padStart(2, '0') : '',
                    pageNo: this.page.current,
                    pageSize: this.page.size
                }
            }).then(res => {
                let rowMaker = ({
                    id = '',
                    hax = '',
                    pen = '',
                    smallPen = '',
                    wb = '',
                    identityNumber = '',
                    dateOfMeasurement = '',
                    day = '',
                    week = '',
                    traitIndex = '',
                    fieldType = 1,
                    value = '',
                    dubValue = '',
                    company = '',
                    createDate = '',
                    createUser = ''
                }) => ({
                    id,
                    hax,
                    pen,
                    smallPen,
                    wb,
                    identityNumber,
                    dateOfMeasurement,
                    day,
                    week,
                    traitIndex,
                    fieldType,
                    value,
                    dubValue,
                    company,
                    createDate,
                    createUser
                });
                // 缓存
                let page = res.data.page;
                // 表格数据 只要需要提交的
                this.table.data = page.list ? page.list.map(e => rowMaker(e)).map(e => {
                    return {
                        ...e,
                        _value: e.fieldType === 1 ? e.dubValue : e.value
                    }
                }) : [];
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
            }).catch(error => {
                this.table.loading = false;
                axiosErrorHandler(error);
            });
        }
    }
};
</script>
