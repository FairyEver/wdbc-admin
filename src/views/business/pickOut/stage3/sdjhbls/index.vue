<template>
    <div>
        <LayoutHeader title="设定计划保留数"></LayoutHeader>
        <Form ref="searchForm" :model="searchForm" :rules="rules" label-position="top" inline>
            <FormItem prop="strain" label="品系">
                <StrainSelect
                    :value.sync="searchForm.strain">
                </StrainSelect>
            </FormItem>
            <FormItem prop="gen" label="世代">
                <Input style="width: 100px" type="text" v-model="searchForm.gen" placeholder="世代"></Input>
            </FormItem>
            <FormItem prop="hax" label="批次">
                <Input style="width: 100px" type="text" v-model="searchForm.hax" placeholder="批次"></Input>
            </FormItem>
            <FormItem prop="pickoutWhy" label="选种用途">
                <DictSelect :value.sync="searchForm.pickoutWhy" type="Z008"></DictSelect>
            </FormItem>
            <FormItem label="搜索">
                <Button type="primary" @click="search('searchForm')"><Icon type="search"></Icon></Button>
            </FormItem>
            <FormItem label="保存" v-show="table.data.length > 0">
                <Button type="primary" @click="submit()"><Icon type="archive"></Icon></Button>
            </FormItem>
        </Form>
        <Vtable
            ref="vtable"
            v-bind="table">
        </Vtable>
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
                    {title: '批次', key: 'strain'},
                    {title: '性别', key: '_sex'},
                    {title: '存栏数', key: 'depositColumnNumber'},
                    {title: '计划组配数', key: 'planNumber', control: 'InputNumber', style: { width: "50px"}},
                    {title: '计划初选数', key: 'primaryNumber'},
                    {title: '差值', key: 'difference'}
                ],
                data: [],
                loading: false
            },
            searchForm: {
                strain: '',
                gen: '',
                pickoutWhy: '',
                hax: ''
            },
            rules: {
                strain: [{required: true, message: '必填', trigger: 'change'}],
                gen: [{required: true, message: '必填', trigger: 'blur'}],
                hax: [{required: true, message: '必填', trigger: 'blur'}],
                pickoutWhy: [{required: true, message: '必填', trigger: 'change'}]
            }
        }
    },
    methods: {
        search (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.syncTableData();
                } else {
                    this.$Message.error('请先输入搜索项');
                }
            })
        },
        submit () {
            this.table.loading = true;
            axiosToken({
                url: '/a/pickout/pickoutPlanNumber',
                method: 'post',
                data: this.$refs.vtable.dataCopy
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
                url: '/a/pickout/pickoutPlanNumber',
                data: {
                    strain: this.searchForm.strain,
                    gen: this.searchForm.gen,
                    hax: this.searchForm.hax ? this.searchForm.hax.padStart(2, '0') : '',
                    pickoutWhy: this.searchForm.pickoutWhy
                }
            }).then(res => {
                if (res.data.page.total === 0) {
                    this.table.data = [];
                } else {
                    this.table.data = res.data.page.list.map(e => {
                        return {
                            ...e,
                            _sex: e.sex === 1 ? '公' : '母'
                        }
                    });
                }
                this.table.loading = false;
            }).catch(error => {
                this.table.loading = false;
                axiosErrorHandler(error)
            });
        }
    }
}
</script>
