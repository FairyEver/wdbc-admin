<template>
    <div>
        <LayoutHeader title="复核与淘汰结果查询"></LayoutHeader>
        <Form ref="searchForm" :model="searchForm" :rules="rules" label-position="top" inline>
            <FormItem prop="strain" label="品系">
                <StrainSelect
                    :value.sync="searchForm.strain">
                </StrainSelect>
            </FormItem>
            <FormItem prop="gen" label="世代">
                <Input style="width: 100px" type="text" v-model="searchForm.gen" placeholder="世代"></Input>
            </FormItem>
            <FormItem prop="purpose" label="选种用途">
                <DictSelect :value.sync="searchForm.purpose" type="Z008"></DictSelect>
            </FormItem>
            <FormItem prop="type" :label="searchTitle">
                <i-switch v-model="searchForm.searchType">
                </i-switch>
            </FormItem>
            <FormItem label="搜索">
                <Button type="primary" @click="search('searchForm')"><Icon type="search"></Icon></Button>
            </FormItem>
        </Form>
        <Vtable
            v-show="!searchForm.searchType"
            ref="recheckTable"
            v-bind="recheckTable">
        </Vtable>
        <Vtable
            v-show="searchForm.searchType"
            ref="eliminateTable"
            v-bind="eliminateTable">
        </Vtable>
    </div>
</template>

<script>
// 库
import { axiosToken, axiosErrorHandler } from '@/plugins/axios.js';
// mixin
import business from '@/mixin/business.js';

export default {
    data () {
        return {
            recheckTable: {
                columns: [
                    {title: '品系', key: 'strain'},
                    {title: '世代', key: 'gen'},
                    {title: '身份ID', key: 'identityNumber'},
                    {title: '性别', key: '_sex'}
                ],
                data: [],
                loading: false
            },
            eliminateTable: {
                columns: [
                    {title: '品系', key: 'strain'},
                    {title: '世代', key: 'gen'},
                    {title: '身份ID', key: 'identityNumber'},
                    {title: '淘汰原因', key: 'eliminateDescribe'}
                ],
                data: [],
                loading: false
            },
            searchForm: {
                strain: '',
                gen: '',
                purpose: '',
                searchType: false
            },
            rules: {
                strain: [{required: true, message: '必填', trigger: 'change'}],
                gen: [{required: true, message: '必填', trigger: 'blur'}]
            },
        }
    },
    computed: {
        searchTitle () {
            return this.searchForm.searchType ? '淘汰结果' : '复核结果'
        }
    },
    watch: {
        'searchForm.searchType' () {
            this.recheckTable.data = [];
            this.eliminateTable.data = [];
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
            });
        },
        syncTableData () {
            if (this.searchForm.searchType === false) {
                axiosToken({
                    url: '/a/recheck/getRecheckData',
                    data: {
                        strain: this.searchForm.strain,
                        gen: this.searchForm.gen,
                        purpose: this.searchForm.purpose
                    }
                }).then(res => {
                    let rowMaker = ({
                        id = '',
                        strain = this.searchForm.strain,
                        gen = this.searchForm.gen,
                        identityNumber = '',
                        sex = ''
                    }) => ({
                        id,
                        strain,
                        gen,
                        identityNumber,
                        sex,
                        _sex: sex === '1' ? '公' : '母'
                    })
                    let results = res.data.results;
                    this.recheckTable.data = results.map(e => rowMaker(e));
                })
            } else {
                axiosToken({
                    url: '/a/officeRecheckExcelImport/getEliminateData',
                    data: {
                        strain: this.searchForm.strain,
                        gen: this.searchForm.gen,
                        type: -1
                    }
                }).then(res => {
                    let rowMaker = ({
                        strain,
                        gen,
                        identityNumber = '',
                        eliminateDescribe = ''
                    }) => ({
                        strain,
                        gen,
                        identityNumber,
                        eliminateDescribe
                    })
                    let results = res.data.results;
                    this.eliminateTable.data = results.map(e => rowMaker(e));
                })
            }
        }
    }
}
</script>
