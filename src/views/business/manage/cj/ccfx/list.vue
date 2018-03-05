<template>
    <div>
        <LayoutHeader title="抽测分析"></LayoutHeader>
        <Form ref="searchForm" :model="searchForm" :rules="rules" label-position="top" inline>
            <FormItem prop="strain" label="品系">
                <StrainSelect :value.sync="searchForm.strain"></StrainSelect>
            </FormItem>
            <FormItem prop="gen" label="世代"><Input type="text" v-model="searchForm.gen" placeholder="世代"></Input></FormItem>
            <FormItem prop="hax" label="批次"><Input type="text" v-model="searchForm.hax" placeholder="批次"></Input></FormItem>
            <FormItem prop="time" label="起止日期">
                <DatePicker :value="searchForm.time" @on-change="timeChange" type="datetimerange" format="yyyy-MM-dd" placeholder="起止日期" style="width: 200px"></DatePicker>
            </FormItem>
            <FormItem number prop="range" label="均匀度范围"><Input type="text" v-model="searchForm.range" placeholder="均匀度范围"></Input></FormItem>
            <FormItem label="搜索">
                <Button type="primary" @click="search('searchForm')" :loading="table.loading">
                    <template v-if="table.loading">正在请求数据</template>
                    <Icon v-if="!table.loading" type="search"></Icon>
                </Button>
            </FormItem>
        </Form>
        <Vtable
            ref="vtable"
            v-bind="table">
        </Vtable>
        <PageList :current="page.current" :total="page.total" :page-size="page.size" @change="pageChangeHandler"></PageList>
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
                hax: '', // 批次
                time: ['', ''], // 起止日期
                range: null
            },
            rules: {
                range: [{required: true, message: '必填', trigger: 'blur'}]
            },
            table: {
                columns: [
                    {title: '品系', key: 'strain'},
                    {title: '世代', key: 'gen'},
                    {title: '批次', key: 'hax'},
                    {title: '周龄', key: 'week'},
                    {title: '性状指标', key: 'traitIndex'},
                    {title: '样本数', key: 'sampleNumber'},
                    {title: '单位', key: 'company'},
                    {title: '平均值', key: 'avg'},
                    {title: '标准差', key: 'std'},
                    {title: '变异系数', key: 'cv'},
                    {title: '均匀度', key: 'uniformity'}
                ],
                data: [],
                loading: false
            }
        }
    },
    methods: {
        // 更新日期
        timeChange (value) {
            this.searchForm.time = value;
        },
        search (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.syncTableData();
                } else {
                    this.$Message.error('请先输入搜索项');
                }
            })
            console.log(this.searchForm.time)
        },
        syncTableData () {
            this.table.loading = true;
            axiosToken({
                url: '/a/chicken/chickenSpotTestAnalysis',
                data: {
                    strain: this.searchForm.strain,
                    gen: this.searchForm.gen,
                    hax: this.searchForm.hax ? this.searchForm.hax.padStart(2, '0') : '',
                    startTime: this.searchForm.time[0],
                    endTime: this.searchForm.time[1],
                    range: this.searchForm.range,
                    pageNo: this.page.current,
                    pageSize: this.page.size
                }
            }).then(res => {
                if (res.data.page.list) {
                    this.table.data = res.data.page.list;
                } else {
                    this.table.data = [];
                }
                this.page.total = res.data.page.total;
                this.table.loading = false;
                console.log(res)
            }).catch(error => {
                this.table.loading = false;
                axiosErrorHandler(error)
            });
        }
    }
}
</script>

