<template>
    <div>
        <LayoutHeader title="产生雏鸡库"></LayoutHeader>
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
            <FormItem prop="branchs" :label="searchForm.branchs ? '出雏' : '雏鸡库'">
                <Tooltip content="切换此项会清空已查出的数据" placement="bottom">
                    <i-switch v-model="searchForm.branchs"></i-switch>
                </Tooltip>
            </FormItem>
            <FormItem label="搜索">
                <Button type="primary" @click="search('searchForm')"><Icon type="search"></Icon></Button>
            </FormItem>
            <FormItem label="分配工厂" v-show="branchsTable.data.length > 0">
                <Button type="success" @click="saveBranchs('branchsForm')"><Icon type="archive"></Icon></Button>
            </FormItem>
        </Form>
        <LayoutTableCard v-show="searchForm.branchs === true">
            <Form ref="branchsForm" :model="branchsForm" :rules="branchsRules" slot="title" inline>
                <FormItem prop="strain" style="margin-bottom: 0px;">
                    <Input disabled type="text" v-model="branchsForm.strain" style="width: 100px;">
                        <span slot="prepend">品系</span>
                    </Input>
                </FormItem>
                <FormItem prop="gen" style="margin-bottom: 0px;">
                    <Input disabled type="text" v-model="branchsForm.gen" style="width: 100px;">
                        <span slot="prepend">世代</span>
                    </Input>
                </FormItem>
                <FormItem style="margin-bottom: 0px;">
                    <!-- <TreeBuilding :value.sync="branchsForm.chickSite" :mustChild="true" button-text="分配工厂" button-icon="home"></TreeBuilding> -->
                    <FarmSelect :value.sync="branchsForm.chickSite" style="width: 200px;"></FarmSelect>
                </FormItem>
            </Form>
            <Vtable
                ref="branchsTableVtable"
                v-bind="branchsTable">
            </Vtable>
        </LayoutTableCard>
        <LayoutTableCard v-show="searchForm.branchs === false">
            <Form slot="title" inline>
                <FormItem style="margin-bottom: 0px;">
                    <Input type="text" v-model="chicksStrain" style="width: 100px;">
                        <span slot="prepend">品系</span>
                    </Input>
                </FormItem>
                <FormItem style="margin-bottom: 0px;">
                    <Input type="text" v-model="chicksGen" style="width: 100px;">
                        <span slot="prepend">世代</span>
                    </Input>
                </FormItem>
            </Form>
            <Vtable
                ref="chicksVtable"
                v-bind="chicksTable">
            </Vtable>
        </LayoutTableCard>
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
            // 出雏表格
            branchsTable: {
                columns: [
                    {title: '批次', key: 'hax'},
                    {title: '家系', key: 'pen'},
                    {title: '小家系', key: 'smallPen'},
                    {title: '健母雏数', key: 'dchix'},
                    {title: '健公雏数', key: 'schix'},
                    {title: '开始翅号', key: 'wbfrom'},
                    {title: '结束翅号', key: 'wbto'},
                    {title: '创建日期', key: 'createDate'}
                ],
                data: [],
                loading: false
            },
            // 雏鸡表格
            chicksTable: {
                columns: [
                    {title: '批次', key: 'hax'},
                    {title: '家系', key: 'pen'},
                    {title: '小家系', key: 'smallPen'},
                    {title: '翅号', key: 'wb'},
                    {title: '身份号码', key: 'identityNumber'},
                    {title: '性别', key: 'sex'},
                    {title: '状态', key: 'state'},
                    {title: '出雏日期', key: '_haxdate'},
                    {title: '工厂', key: '_chickSite'},
                    {title: '父亲身份id', key: 'sid'},
                    {title: '母亲身份id', key: 'did'},
                    {title: '创建日期', key: 'createDate'}
                ],
                data: [],
                loading: false
            },
            searchForm: {
                strain: '', // 品系
                gen: '', // 世代
                hax: '', // 批次
                branchs: true
            },
            rules: {
                strain: [{required: true, message: '必填', trigger: 'change'}],
                gen: [{required: true, message: '必填', trigger: 'blur'}],
                hax: [{required: true, message: '必填', trigger: 'blur'}]
            },
            // 出雏的表单
            branchsForm: {
                strain: '',
                gen: '',
                chickSite: ''
            },
            branchsRules: {
                chickSite: [{required: true, message: '必填', trigger: 'change'}]
            },
            chicksStrain: '', // 雏鸡品系
            chicksGen: '', // 雏鸡世代
        };
    },
    watch: {
        'searchForm.branchs' () {
            this.reset();
        }
    },
    methods: {
        // 搜索
        search (name) {
            this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.resetPage();
                        this.syncTableData();
                    } else {
                        this.$Message.error('请先输入搜索项');
                    }
            });
        },
        // 保存工厂
        saveBranchs (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    let list = this.branchsTable.data.map(e => {
                        return {
                            ...e,
                            chickSite: this.branchsForm.chickSite
                        }
                    })
                    axiosToken({
                        url: '/a/hatch/hatchMain/saveBranchs',
                        method: 'post',
                        data: list
                    }).then(res => {
                        if (res.data.code === 0) {
                            this.$Message.success(res.data.msg);
                        } else {
                            this.$Message.error(res.data.msg);
                        }
                    }).catch(error => axiosErrorHandler(error));
                } else {
                    this.$Message.error('请先输入工厂');
                }
            })
            console.log('saveBranchs')
        },
        syncTableData () {
            if (this.searchForm.branchs === true) {
                this.branchsTable.loading = true;
                axiosToken({
                    url: '/a/hatch/hatchMain/searchBranchs',
                    data: {
                        strain: this.searchForm.strain,
                        gen: this.searchForm.gen,
                        hax: this.searchForm.hax ? this.searchForm.hax.padStart(2, '0') : '',
                        pageNo: this.page.current,
                        pageSize: this.page.size
                    }
                }).then(res => {
                    if (res.data.page.list) {
                        this.branchsTable.data = res.data.page.list;
                    } else {
                        this.branchsTable.data = [];
                    }
                    this.page.total = res.data.page.total;
                    this.branchsForm.strain = res.data.head.strain;
                    this.branchsForm.gen = res.data.head.gen;
                    this.branchsForm.chickSite = res.data.head.chickSite;
                    this.branchsTable.loading = false;
                }).catch(error => {
                    this.branchsTable.loading = false;
                    axiosErrorHandler(error);
                });
            } else {
                this.chicksTable.loading = true;
                axiosToken({
                    url: '/a/hatch/hatchChick/searchChicks',
                    data: {
                        strain: this.searchForm.strain,
                        gen: this.searchForm.gen,
                        hax: this.searchForm.hax ? this.searchForm.hax.padStart(2, '0') : '',
                        pageNo: this.page.current,
                        pageSize: this.page.size
                    }
                }).then(res => {
                    if (res.data.page.list) {
                        // 缓存
                        let page = res.data.page;
                        axiosToken({
                            url: '/a/config/farm/list',
                        }).then(res => {
                            // 缓存
                            let chickSiteList = res.data.list;
                            this.chicksTable.data = page.list.map(e => {
                                let data = chickSiteList.find(f => f.id === e.chickSite)
                                return {
                                    ...e,
                                    _haxdate: e.haxdate ? e.haxdate.substring(0, 10) : '',
                                    _chickSite: data ? data.name : ''
                                }
                            });
                        })
                    } else {
                        this.chicksTable.data = [];
                    }
                    this.page.total = res.data.page.total;
                    this.chicksStrain = res.data.head.strain;
                    this.chicksGen = res.data.head.gen;
                    this.chicksTable.loading = false;
                }).catch(error => {
                    this.chicksTable.loading = false;
                    axiosErrorHandler(error);
                });
            }
        },
        reset () {
            this.branchsTable.data = [];
            this.chicksTable.data = [];
            this.branchsForm.strain = '';
            this.branchsForm.gen = '';
            this.branchsForm.chickSite = '';
            this.chicksStrain = '';
            this.chicksGen = '';
            this.page.current = 1;
            this.page.total = 0;
        },
    }
}
</script>
