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
            table: {
                columns: [
                    {title: '品系', key: 'strain'},
                    {title: '世代', key: 'gen'},
                    {title: '批次', key: 'hax'},
                    {title: '标记公雏数', key: 'markCock', control: 'InputNumber', style: { width: "50px"}}
                ],
                data: [],
                loading: false
            },
            searchForm: {
                strain: '',
                gen: ''
            },
            rules: {
                strain: [{required: true, message: '必填', trigger: 'change'}],
                gen: [{required: true, message: '必填', trigger: 'blur'}]
            },
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
                url: '/a/pickout/planCock/save',
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
                url: '/a/pickout/planCock',
                data: {
                    strain: this.searchForm.strain,
                    gen: this.searchForm.gen,
                    pageNo: this.page.current,
                    pageSize: this.page.size
                }
            }).then(res => {
                if (res.data.page.total === 0) {
                    this.table.data = [];
                } else {
                    this.table.data = res.data.page.list;
                }
                this.page.total = res.data.page.total;
                this.table.loading = false;
            }).catch(error => {
                this.table.loading = false;
                axiosErrorHandler(error)
            });
        }
    }
}
</script>
