<style lang="less">
    @import '~@/styles/business.less';
</style>

<template>
    <div>
        <LayoutHeader title="抽测记录"></LayoutHeader>
        <Form ref="searchForm" :model="searchForm" :rules="rules" label-position="top" inline>
            <FormItem prop="strain" label="品系"><StrainSelect :value.sync="searchForm.strain"></StrainSelect></FormItem>
            <FormItem prop="gen" label="世代"><Input type="text" v-model="searchForm.gen" placeholder="世代"></Input></FormItem>
            <FormItem prop="startHax" label="开始批次"><Input type="text" v-model="searchForm.startHax" placeholder="开始批次" style="width: 80px;"></Input></FormItem>
            <FormItem prop="endHax" label="结束批次"><Input type="text" v-model="searchForm.endHax" placeholder="结束批次" style="width: 80px;"></Input></FormItem>
            <FormItem prop="time" label="起止日期">
                <DatePicker :value="searchForm.time" @on-change="timeChange" type="datetimerange" format="yyyy-MM-dd" placeholder="起止日期" style="width: 200px"></DatePicker>
            </FormItem>
            <FormItem prop="geti" :label="searchForm.geti ? '个体性状' : '群体性状'">
                <Tooltip content="切换此项会清空已查出的数据" placement="bottom">
                    <i-switch v-model="searchForm.geti"></i-switch>
                </Tooltip>
            </FormItem>
            <!-- <FormItem prop="type" :label="searchForm.type === '1' ? '蛋鸡' : '雏鸡'">
                <Tooltip content="类型" placement="bottom">
                    <i-switch v-model="searchForm.type" true-value="1" false-value="0"></i-switch>
                </Tooltip>
            </FormItem> -->
            <FormItem label="搜索">
                <Button type="primary" @click="syncTableData" :loading="tableLoading">
                    <template v-if="tableLoading">正在请求数据</template>
                    <Icon v-if="!tableLoading" type="search"></Icon>
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
                <FormItem v-if="searchForm.geti" style="margin-bottom: 0px;">
                    <Button v-if="tableGT.data.length > 0" type="primary" @click="save('GT')" :loading="tableLoading">同步个体性状设置 <Icon type="upload"></Icon></Button>
                </FormItem>
                <FormItem v-if="!searchForm.geti" style="margin-bottom: 0px;">
                    <Button v-if="tableQT.data.length > 0" type="primary" @click="save('QT')" :loading="tableLoading">同步群体性状设置 <Icon type="upload"></Icon></Button>
                </FormItem>
            </Form>
            <!-- 个体 -->
            <div v-if="searchForm.geti">
                <Vtable ref="vtableGT" v-bind="tableGT" :loading="tableLoading"></Vtable>
                <div style="margin: 10px;">
                </div>
            </div>
            <!-- 群体 -->
            <div v-else>
                <Vtable ref="vtableQT" v-bind="tableQT" :loading="tableLoading"></Vtable>
                <div style="margin: 10px;">
                </div>
            </div>
            <PageList :current="page.current" :total="page.total" :page-size="page.size" @change="pageChangeHandler"></PageList>
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
                gen: '17', // 世代
                time: ['', ''], // 起止日期
                startHax: '0', // 开始批次
                endHax: '1', // 结束批次
                type: '1', // 当为1的时候，获取的是蛋鸡的个体抽测，不为1时，获取的是雏鸡的
                geti: true
            },
            rules: {
                strain: [{required: true, message: '必填', trigger: 'change'}],
                gen: [{required: true, message: '必填', trigger: 'blur'}],
                startHax: [{required: true, message: '必填', trigger: 'blur'}],
                endHax: [{required: true, message: '必填', trigger: 'blur'}]
            },
            // 个体
            tableGT: {
                columns: [
                    {title: '批次', key: 'hax'},
                    {title: '样本数', key: 'sampleNumber'},
                    {title: '性别', key: 'sex'},
                    {title: '序号', key: 'serialNumber'},
                    {title: '抽测日期', key: 'dateOfMeasurement'},
                    {title: '周龄', key: 'week'},
                    {title: '性状指标', key: 'traitIndex'},
                    {title: '值', key: 'dubValue'},
                    {title: '单位', key: 'company'}
                ],
                data: [],
                deleteMode: true
            },
            // 群体
            tableQT: {
                columns: [
                    {title: '批次', key: 'hax'},
                    {title: '抽测日期', key: 'dateOfMeasurement'},
                    {title: '性状指标', key: 'traitIndex'},
                    {title: '值', key: 'dubValue'},
                    {title: '单位', key: 'company'}
                ],
                data: [],
                deleteMode: true
            },
            tableLoading: false,
            tableForm: {
                strain: '', // 品系
                gen: '' // 世代
            }
        };
    },
    watch: {
        'searchForm.geti' () {
            this.reset();
        }
    },
    methods: {
        // 更新淘汰日期
        timeChange (value) {
            this.searchForm.time = value;
        },
        reset () {
            this.tableGT.data = [];
            this.tableQT.data = [];
            this.tableForm.strain = '';
            this.tableForm.gen = '';
            this.page.current = 1;
            this.page.total = 0;
        },
        syncGT () {
            // 个体方式
            this.tableLoading = true;
            axiosToken({
                url: '/a/chicken/chickenIndividualCharacterSpotTest',
                data: {
                    strain: this.searchForm.strain,
                    gen: this.searchForm.gen,
                    startTime: this.searchForm.time[0],
                    endTime: this.searchForm.time[1],
                    startHax: this.searchForm.startHax ? this.searchForm.startHax.padStart(2, '0') : '',
                    endHax: this.searchForm.endHax ? this.searchForm.endHax.padStart(2, '0') : '',
                    type: this.searchForm.type,
                    pageNo: this.page.current,
                    pageSize: this.page.size
                }
            }).then(res => {
                let rowMaker = ({
                    id = '',
                    hax = '',
                    sampleNumber = '',
                    sex = '',
                    serialNumber = '',
                    dateOfMeasurement = '',
                    week = '',
                    traitIndex = '',
                    dubValue = '',
                    company = ''
                }) => ({
                    id,
                    hax,
                    sampleNumber,
                    sex,
                    serialNumber,
                    dateOfMeasurement,
                    week,
                    traitIndex,
                    dubValue,
                    company
                });
                // 缓存
                let page = res.data.page;
                // 表格数据 只要需要提交的
                this.tableGT.data = page.list ? page.list.map(e => rowMaker(e)) : [];
                // 无论是个体还是群体都会用到的设置
                this.syncPub(res);
            }).catch(error => axiosErrorHandler(error));
        },
        syncQT () {
            // 群体方式
            this.tableLoading = true;
            axiosToken({
                url: '/a/chicken/chickenGroupCharacterSpotTest',
                data: {
                    strain: this.searchForm.strain,
                    gen: this.searchForm.gen,
                    startTime: this.searchForm.time[0],
                    endTime: this.searchForm.time[1],
                    startHax: this.searchForm.startHax.padStart(2, '0'),
                    endHax: this.searchForm.endHax.padStart(2, '0'),
                    type: this.searchForm.type,
                    pageNo: this.page.current,
                    pageSize: this.page.size
                }
            }).then(res => {
                let rowMaker = ({
                    id = '',
                    hax = '',
                    dateOfMeasurement = '',
                    traitIndex = '',
                    dubValue = '',
                    company = ''
                }) => ({
                    id,
                    hax,
                    dateOfMeasurement,
                    traitIndex,
                    dubValue,
                    company
                });
                // 缓存
                let page = res.data.page;
                // 表格数据 只要需要提交的
                this.tableQT.data = page.list ? page.list.map(e => rowMaker(e)) : [];
                // 无论是个体还是群体都会用到的设置
                this.syncPub(res);
            }).catch(error => axiosErrorHandler(error));
        },
        syncPub (res) {
            let page = res.data.page;
            // 分页设置
            this.page.current = page.pageNo;
            this.page.total = page.total;
            this.page.size = page.pageSize;
            // 表头数据 表格数据确实有数据的时候才会赋值
            if (page.list) {
                if (page.list.length > 0) {
                    this.tableForm.strain = this.searchForm.strain;
                    this.tableForm.gen = this.searchForm.gen;
                }    
            }
            // 结束
            this.tableLoading = false;
        },
        syncTableData () {
            // 搜索表单没有通过校验
            if (!this.tryFormValidate('searchForm')) {
                return;
            }
            if (this.searchForm.geti) {
                this.syncGT();
            } else {
                this.syncQT();
            }
        },
        save (type) {
            let rows = [];
            if (type === 'GT') {
                rows = this.$refs.vtableGT.changedRow.map(e => e.id);
            } else {
                rows = this.$refs.vtableQT.changedRow.map(e => e.id);
            }
            if (rows.length === 0) {
                this.$Message.error('没有需要提交的数据');
                return;
            }
            // 提交设置
            axiosToken({
                url: type === 'GT' ? '/a/chicken/chickenIndividualCharacterSpotTest' : '/a/chicken/chickenGroupCharacterSpotTest',
                method: 'delete',
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
        }
    }
};
</script>
