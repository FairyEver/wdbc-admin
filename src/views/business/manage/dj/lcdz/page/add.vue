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
            <FormItem prop="delayRaise" label="延养">
                <i-switch v-model="searchForm.delayRaise"></i-switch>
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
                <FormItem style="margin-bottom: 0px;">
                    <Button v-if="table.data.length > 0" type="primary" @click="save">保存<Icon type="archive"></Icon></Button>
                </FormItem>
            </Form>
            <Vtable ref="vtable" v-bind="table"></Vtable>
        </LayoutTableCard>

    </div>
</template>

<script>
// 插件
import { axiosToken, axiosErrorHandler } from '@/plugins/axios.js';
import { mapMutations } from 'vuex';
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
                type: 'add', // 模式
                strain: 'Y1', // 品系
                gen: '15', // 世代
                hax: '01', // 批次
                sex: '1', // 性别
                buildingNumber: '', // 栋号
                delayRaise: false // 延养
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
                    {title: '翅号', key: 'wb', width: 140, control: 'NoRepeat'},
                    {title: '栋', key: 'buildingName'}
                ],
                data: [],
                loading: false
            },
            tableForm: {
                strain: '', // 品系
                gen: '' // 世代
            },
            // 翅号列表
            cjList: []
        }
    },
    created () {
        // 清空 NoRepeat 相关的设置
        this.cleanNoRepeat();
    },
    methods: {
        // NoRepeat 方法
        ...mapMutations([
            'setNoRepeatPool',
            'setNoRepeatUsed',
            'cleanNoRepeat'
        ]),
        // 搜索
        syncTableData () {
            // 搜索表单没有通过校验
            if (!this.tryFormValidate('searchForm')) {
                return;
            }
            // 清空表头
            this.tableForm.strain = '';
            this.tableForm.gen = '';
            // 清空 NoRepeat 相关的设置
            this.cleanNoRepeat();
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
                    type: this.searchForm.delayRaise ? 'delayRaise' : this.searchForm.type
                }
            }).then(res => {
                // 表格数据
                // 有数据
                if (!(res.data.list && res.data.list.cageNumber)) {
                    this.$Message.error('没有数据');
                    this.table.loading = false;
                    return;
                }
                this.table.data = res.data.list.cageNumber.map(e => ({
                    cageNumber: e, // 笼号
                    wb: '', // 翅号
                    buildingNumber: res.data.list.id, // 栋 id 不显示 提交用
                    buildingName: res.data.list.name // 栋 name 显示这个
                }));
                // 翅号数据
                this.cjList = res.data.cjList;
                this.setNoRepeatPool(this.cjList.map(e => e.wb));
                this.setNoRepeatUsed([]);
                // 表头数据 表格数据确实有数据的时候才会赋值
                if (this.table.data.length > 0) {
                    this.tableForm.strain = this.searchForm.strain;
                    this.tableForm.gen = this.searchForm.gen;
                }
                // 结束
                this.table.loading = false;
            }).catch(error => axiosErrorHandler(error));
        },
        // 提交
        save () {
            let changedRow = this.$refs.vtable.changedRow;
            if (changedRow.length === 0) {
                this.$Message.error('没有需要提交的数据');
                return;
            }
            this.table.loading = true;
            this.table.data = [];
            axiosToken({
                url: this.searchForm.delayRaise ? '/a/chicken/chickenCageWing/saveDelayRaise' : '/a/chicken/chickenCageWing',
                method: 'post',
                data: changedRow.map(e => {
                    let cj = this.cjList.find(cj => cj.wb === e.wb)
                    return {
                        cageNumber: e.cageNumber, // 笼号
                        identityNumber: cj.identityNumber, // 身份号码
                        buildingNumber: e.buildingNumber // 栋号
                    }
                })
            }).then(res => {
                if (res.data.code === 0) {
                    this.$Message.success(res.data.msg);
                    this.syncTableData();
                }
            }).catch(error => axiosErrorHandler(error));
        }
    }
}
</script>