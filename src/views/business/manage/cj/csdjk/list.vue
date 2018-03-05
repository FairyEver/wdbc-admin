<template>
    <div>

        <LayoutHeader title="产生蛋鸡库"></LayoutHeader>

        <Form ref="searchForm" :model="searchForm" :rules="rules" label-position="top" inline>
            <FormItem prop="strain" label="品系">
                <StrainSelect :value.sync="searchForm.strain"></StrainSelect>
            </FormItem>
            <FormItem prop="gen" label="世代">
                <Input type="text" v-model="searchForm.gen" placeholder="世代" style="width: 60px;"></Input>
            </FormItem>
            <FormItem prop="hax" label="批次">
                <Input style="width: 100px" type="text" v-model="searchForm.hax" placeholder="批次"></Input>
            </FormItem>
            <FormItem prop="create" :label="searchForm.create ? '产生' : '查询'">
                <Tooltip content="切换此项会清空已查出的数据" placement="bottom">
                    <i-switch v-model="searchForm.create"></i-switch>
                </Tooltip>
            </FormItem>
            <FormItem label="搜索">
                <Button @click="syncTableData()"><Icon type="search"></Icon></Button>
            </FormItem>
        </Form>

        <LayoutTableCard v-show="searchForm.create === true">
            <Form inline slot="title">
                <FormItem style="margin-bottom: 0px;">
                    <Input disabled type="text" v-model="createForm.strain" style="width: 100px;">
                        <span slot="prepend">品系</span>
                    </Input>
                </FormItem>
                <FormItem style="margin-bottom: 0px;">
                    <Input disabled type="text" v-model="createForm.gen" style="width: 100px;">
                        <span slot="prepend">世代</span>
                    </Input>
                </FormItem>
                <FormItem style="margin-bottom: 0px;">
                    <FarmSelect :value.sync="searchForm.buildingNumber" style="width: 200px;"></FarmSelect>
                    <!-- <TreeBuilding :value.sync="searchForm.buildingNumber" :mustChild="true" button-text="分配工厂" button-icon="home"></TreeBuilding> -->
                </FormItem>
                <FormItem style="margin-bottom: 0px;">
                    <Button type="primary" @click="save">保存<Icon type="archive"></Icon></Button>
                </FormItem>
            </Form>
            <div>
                <Vtable
                    ref="createVtable"
                    v-bind="createTable">
                </Vtable>
            </div>
        </LayoutTableCard>
        <LayoutTableCard v-show="searchForm.create === false">
            <Form inline slot="title">
                <FormItem style="margin-bottom: 0px;">
                    <Input disabled type="text" v-model="checkForm.strain" style="width: 100px;">
                        <span slot="prepend">品系</span>
                    </Input>
                </FormItem>
                <FormItem style="margin-bottom: 0px;">
                    <Input disabled type="text" v-model="checkForm.gen" style="width: 100px;">
                        <span slot="prepend">世代</span>
                    </Input>
                </FormItem>
            </Form>
            <div>
                <Vtable
                    ref="checkVtable"
                    v-bind="checkTable">
                </Vtable>
            </div>
        </LayoutTableCard>
        <PageList
            :current="page.current"
            :total="page.total"
            :page-size="page.size"
            @change="pageChangeHandler">
        </PageList>
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
                strain: 'Y1', // 品系
                gen: '15', // 世代
                hax: '01', // 批次
                create: true
            },
            rules: {
                strain: [{required: true, message: '必填', trigger: 'change'}],
                gen: [{required: true, message: '必填', trigger: 'blur'}],
                hax: [{required: true, message: '必填', trigger: 'blur'}]
            },
            createTable: {
                columns: [
                    {title: '批次', key: 'hax'},
                    {title: '家系', key: 'pen'},
                    {title: '⼩家系', key: 'smallPen'},
                    {title: '翅号', key: 'wb'},
                    {title: '身份号码', key: 'identityNumber'},
                    {title: '出雏⽇期', key: '_haxdate'},
                    {title: '性别', key: 'sex'},
                    {title: '⼯⼚', key: '_layerSite'},
                    {title: '⽗亲身份id', key: 'sid'},
                    {title: '⺟亲身份id', key: 'did'},
                    {title: '创建⼈', key: 'createUser'},
                    {title: '创建⽇期', key: 'createDate'}
                ],
                data: [],
                loading: false
            },
            checkTable: {
                columns: [
                    {title: '批次', key: 'hax'},
                    {title: '家系', key: 'pen'},
                    {title: '⼩家系', key: 'smallPen'},
                    {title: '翅号', key: 'wb'},
                    {title: '身份号码', key: 'identityNumber'},
                    {title: '出雏⽇期', key: '_haxdate'},
                    {title: '性别', key: 'sex'},
                    {title: '⼯⼚', key: '_layerSite'},
                    {title: '⽗亲身份id', key: 'sid'},
                    {title: '⺟亲身份id', key: 'did'},
                    {title: '创建⼈', key: 'createUser'},
                    {title: '创建⽇期', key: 'createDate'}
                ],
                data: [],
                loading: false
            },
            createForm: {
                strain: '', // 品系
                gen: '', // 世代
                buildingNumber: '' // 分配工厂
            },
            checkForm: {
                strain: '', // 品系
                gen: '' // 世代
            },
        }
    },
    watch: {
        'searchForm.create' () {
            this.createForm.strain = '';
            this.createForm.gen = '';
            this.createForm.buildingNumber = '';
            this.checkForm.strain = '';
            this.checkForm.gen = '';
            this.createTable.data = [];
            this.checkTable.data = [];
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
            this.createForm.strain = '';
            this.createForm.gen = '';
            this.createForm.buildingNumber = '';
            // 还原表格
            this.createTable.data = [];
            if (this.searchForm.create === true) {
                this.createTable.loading = true;
                // 开始请求数据
                axiosToken({
                    url: '/a/chicken/chicken/getLayerLibInfo',
                    data: {
                        strain: this.searchForm.strain,
                        gen: this.searchForm.gen,
                        hax: this.searchForm.hax ? this.searchForm.hax.padStart(2, '0') : '',
                        type: 0,
                        // 分页
                        pageNo: this.page.current,
                        pageSize: this.page.size
                    }
                }).then(res => {
                    // 表格数据
                    // 有数据
                    if (!res.data.page.list) {
                        this.$Message.error('没有数据');
                        this.createTable.loading = false;
                        return;
                    };
                    let rowMaker = ({
                        id = '',
                        hax = '',
                        pen = '',
                        smallPen = '',
                        wb = '',
                        identityNumber = '',
                        haxdate = '',
                        sex = '',
                        layerSite = '',
                        sid = '',
                        did = '',
                        createUser = '',
                        createDate = ''
                    }) => ({
                        id,
                        hax,
                        pen,
                        smallPen,
                        wb,
                        identityNumber,
                        haxdate,
                        sex,
                        layerSite,
                        sid,
                        did,
                        createUser,
                        createDate
                    });
                    // 缓存
                    let page = res.data.page;
                    axiosToken({
                        url: '/a/config/farm/list',
                    }).then(res => {
                        // 缓存
                        let layerSiteList = res.data.list;
                        this.createTable.data = page.list.map(e => rowMaker(e)).map(e => {
                            let data = layerSiteList.find(f => f.id === e.layerSite)
                            return {
                                ...e,
                                _haxdate: e.haxdate ? e.haxdate.substring(0, 10) : '',
                                _layerSite: data ? data.name : ''
                            }
                        })
                    })
                    // 表格数据 只要需要提交的
                    // 分页设置
                    this.page.current = page.pageNo;
                    this.page.total = page.total;
                    this.page.size = page.pageSize;
                    // 表头数据 表格数据确实有数据的时候才会赋值
                    if (this.createTable.data.length > 0) {
                        this.createForm.strain = this.searchForm.strain;
                        this.createForm.gen = this.searchForm.gen;
                    }
                    // 结束
                    this.createTable.loading = false;
                }).catch(error => axiosErrorHandler(error));
            } else {
                this.checkTable.loading = true;
                // 开始请求数据
                axiosToken({
                    url: '/a/chicken/chicken/getLayerLibInfo',
                    data: {
                        strain: this.searchForm.strain,
                        gen: this.searchForm.gen,
                        hax: this.searchForm.hax ? this.searchForm.hax.padStart(2, '0') : '',
                        type: 1,
                        // 分页
                        pageNo: this.page.current,
                        pageSize: this.page.size
                    }
                }).then(res => {
                    // 表格数据
                    // 有数据
                    if (!res.data.page.list) {
                        this.$Message.error('没有数据');
                        this.checkTable.loading = false;
                        return;
                    };
                    let rowMaker = ({
                        id = '',
                        hax = '',
                        pen = '',
                        smallPen = '',
                        wb = '',
                        identityNumber = '',
                        haxdate = '',
                        sex = '',
                        layerSite = '',
                        sid = '',
                        did = '',
                        createUser = '',
                        createDate = ''
                    }) => ({
                        id,
                        hax,
                        pen,
                        smallPen,
                        wb,
                        identityNumber,
                        haxdate,
                        sex,
                        layerSite,
                        sid,
                        did,
                        createUser,
                        createDate
                    });
                    // 缓存
                    let page = res.data.page;
                    axiosToken({
                        url: '/a/config/farm/list',
                    }).then(res => {
                        // 缓存
                        let layerSiteList = res.data.list;
                        this.checkTable.data = page.list.map(e => rowMaker(e)).map(e => {
                            let data = layerSiteList.find(f => f.id === e.layerSite)
                            return {
                                ...e,
                                _haxdate: e.haxdate ? e.haxdate.substring(0, 10) : '',
                                _layerSite: data ? data.name : ''
                            }
                        })
                    })
                    // 分页设置
                    this.page.current = page.pageNo;
                    this.page.total = page.total;
                    this.page.size = page.pageSize;
                    // 表头数据 表格数据确实有数据的时候才会赋值
                    if (this.createTable.data.length > 0) {
                        this.createForm.strain = this.searchForm.strain;
                        this.createForm.gen = this.searchForm.gen;
                    }
                    // 结束
                    this.checkTable.loading = false;
                }).catch(error => axiosErrorHandler(error));
            }
        },
        save () {
            if (!this.searchForm.buildingNumber) {
                this.$Message.error('没有选择工厂');
                return;
            }
            axiosToken({
                url: '/a/chicken/chicken/generateLayerLib',
                method: 'post',
                data: [
                    {
                        id: this.createTable.data[0].id,
                        buildingNumber: this.searchForm.buildingNumber
                    }
                ]
            }).then(res => {
                if (res.data.code === 0) {
                    this.$Message.success(res.data.msg);
                    this.page.current = 1;
                    this.selection = [];
                } else {
                    this.$Message.error(res.data.msg);
                }
            }).catch(error => axiosErrorHandler(error));
        }
    }
}
</script>