<template>
    <div>

        <Form ref="searchForm" :model="searchForm" :rules="rules" label-position="top" inline>
            <FormItem prop="strain" label="品系">
                <StrainSelect :value.sync="searchForm.strain"></StrainSelect>
            </FormItem>
            <FormItem prop="gen" label="世代">
                <Input type="text" v-model="searchForm.gen" placeholder="世代" style="width: 60px;"></Input>
            </FormItem>
            <FormItem prop="hax" label="批次">
                <Input type="text" v-model="searchForm.hax" placeholder="批次" style="width: 60px;"></Input>
            </FormItem>
            <FormItem prop="sex" label="性别">
                <DictRadio :value.sync="searchForm.sex" type="sex"></DictRadio>
            </FormItem>
            <FormItem prop="hax" label="栋号">
                <TreeBuilding :value.sync="searchForm.buildingNumber" :mustChild="true"></TreeBuilding>
            </FormItem>
            <FormItem label="查询">
                <Button @click="syncTableData()"><Icon type="search"></Icon></Button>
            </FormItem>
        </Form>

        <LayoutTableCard>
            <Form inline slot="title">
                <FormItem style="margin-bottom: 0px;">
                    <Input disabled type="text" v-model="tableForm.strain" style="width: 100px;"><span slot="prepend">品系</span></Input>
                </FormItem>
                <FormItem style="margin-bottom: 0px;">
                    <Input disabled type="text" v-model="tableForm.gen" style="width: 100px;"><span slot="prepend">世代</span></Input>
                </FormItem>
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
// 插件
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
                type: 'browse', // 模式
                strain: 'Y1', // 品系
                gen: '15', // 世代
                hax: '01', // 批次
                sex: '1', // 性别
                buildingNumber: '' // 栋号
            },
            rules: {
                strain: [{required: true, message: '必填', trigger: 'change'}],
                gen: [{required: true, message: '必填', trigger: 'blur'}],
                hax: [{required: true, message: '必填', trigger: 'blur'}],
                sex: [{required: true, message: '必填', trigger: 'change'}]
            },
            table: {
                columns: [
                    {title: '笼号', key: 'cageNumber'},
                    {title: '翅号', key: 'wb'},
                    {title: '栋', key: 'buildingName'}
                ],
                data: [],
                loading: false
            },
            tableForm: {
                strain: '', // 品系
                gen: '' // 世代
            }
        }
    },
    methods: {
        // 搜索
        syncTableData () {
            // 搜索表单没有通过校验
            if (!this.tryFormValidate('searchForm')) {
                return;
            }
            // 清空表头
            this.tableForm.strain = '';
            this.tableForm.gen = '';
            // 开始请求数据
            this.table.loading = true;
            this.table.data = [];
            axiosToken({
                url: '/a/chicken/chickenCageWing/getCageAndWb',
                data: {
                    strain: this.searchForm.strain,
                    gen: this.searchForm.gen,
                    hax: this.searchForm.hax ? this.searchForm.hax.padStart(2, '0') : '',
                    sex: this.searchForm.sex,
                    buildingNumber: this.searchForm.buildingNumber,
                    type: this.searchForm.type,
                    // 分页相关
                    pageNo: this.page.current,
                    pageSize: this.page.size
                }
            }).then(res => {
                // 表格数据
                let page = res.data.page
                if (!page.list) {
                    this.$Message.error('没有数据');
                    this.resetPage();
                    this.table.loading = false;
                    return;
                }
                this.table.data = page.list.map(e => ({
                    cageNumber: e.cageNumber, // 笼号
                    wb: e.chicken.wb, // 翅号
                    buildingName: e.name // 栋 name
                }));
                // 表头数据 表格数据确实有数据的时候才会赋值
                if (this.table.data.length > 0) {
                    this.tableForm.strain = this.searchForm.strain;
                    this.tableForm.gen = this.searchForm.gen;
                }
                // 分页设置
                this.page.current = page.pageNo;
                this.page.total = page.total;
                this.page.size = page.pageSize;
                // 结束
                this.table.loading = false;
            }).catch(error => axiosErrorHandler(error));
        }
    }
}
</script>