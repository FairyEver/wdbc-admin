<template>
    <div>
        <LayoutHeader title="蛋数复核"></LayoutHeader>
        <Form ref="searchForm" :model="searchForm" :rules="rules" label-position="top" inline>
            <FormItem prop="strain" label="品系">
                <StrainSelect
                    :value.sync="searchForm.strain">
                </StrainSelect>
            </FormItem>
            <FormItem prop="gen" label="世代">
                <Input style="width: 100px" type="text" v-model="searchForm.gen" placeholder="世代"></Input>
            </FormItem>
            <FormItem prop="time" label="起止日期">
                <DatePicker :value="searchForm.time" @on-change="timeChange" type="datetimerange" format="yyyy-MM-dd" placeholder="起止日期" style="width: 200px"></DatePicker>
            </FormItem>
            <FormItem label="搜索">
                <Button type="primary" @click="search('searchForm')"><Icon type="search"></Icon></Button>
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
                <FormItem v-show="table.data.length > 0">
                    <Button type="success" @click="eliminateSubmit">保存淘汰</Button>
                </FormItem>
            </Form>
            <Vtable
                ref="vtable"
                v-bind="table">
            </Vtable>
        </LayoutTableCard>
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
                    {title: '品系', key: 'strain'},
                    {title: '世代', key: 'gen'},
                    {title: '身份ID', key: 'identityNumber'},
                    {title: '产蛋数', key: 'eggCount'},
                    {title: '标记淘汰', key: 'eliminate', control: 'i-switch', props:{trueValue: true, falseValue: false}}
                ],
                data: [],
                loading: false
            },
            searchForm: {
                strain: '',
                gen: '',
                time: ['2018-01-10', '2018-01-14'], // 起止日期
            },
            rules: {
                strain: [{required: true, message: '必填', trigger: 'change'}],
                gen: [{required: true, message: '必填', trigger: 'blur'}],
                use: [{required: true, type: 'object', message: '必填', trigger: 'change'}]
            },
            tableForm: {
                strain: '',
                gen: ''
            }
        };
    },
    methods: {
        // 更新复核日期
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
            });
        },
        eliminateSubmit () {
            this.table.loading = true;
            let identities = this.$refs.vtable.dataCopy.filter(e => {
                return e.eliminate === true
            }).map(e =>  e.identityNumber)
            console.log(identities)
            axiosToken({
                url: '/a/eggAmountRecheck/saveEliminateData',
                method: 'post',
                data: {
                    identities
                }
            }).then(res => {
                this.table.loading = false;
                if (res.data.code === 0) {
                    this.$Message.success(res.data.msg);
                } else {
                    this.$Message.error(res.data.msg);
                }
            }).catch(error => {
                this.table.loading = false;
                axiosErrorHandler(error)
            });
        },
        syncTableData () {
            this.table.loading = true;
            axiosToken({
                url: '/a/eggAmountRecheck/getEveryChickenEggCount',
                data: {
                    strain: this.searchForm.strain,
                    gen: this.searchForm.gen,
                    startTime: this.searchForm.time[0],
                    endTime: this.searchForm.time[1]
                }
            }).then(res => {
                let rowMaker = ({
                    strain = this.searchForm.strain,
                    gen = this.searchForm.gen,
                    isNewRecord = '',
                    delFlag = '',
                    identityNumber = '',
                    eggCount = ''
                }) => ({
                    strain,
                    gen,
                    isNewRecord,
                    delFlag,
                    identityNumber,
                    eggCount
                })
                let results = res.data.results;
                this.table.data = results.map(e => rowMaker(e));
                this.tableForm.strain = this.searchForm.strain;
                this.tableForm.gen = this.searchForm.gen;
                this.table.loading = false;
            }).catch(error => {
                this.table.loading = false;
                axiosErrorHandler(error)
            });
        }
    }
}
</script>
