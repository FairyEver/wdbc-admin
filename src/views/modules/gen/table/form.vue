<template>
    <div style="position: relative;">
        <Card dis-hover style="margin-bottom: 10px;">
            <div style="width: 600px;">
                <Steps :current="step">
                    <Step title="表名" content="选择一个表名"></Step>
                    <Step title="设置" content="进一步设置"></Step>
                </Steps>
            </div>
        </Card>
        <!-- 第一步 -->
        <section v-if="step === 0">
            <Select v-model="tableName" style="width:200px" filterable>
                <Option v-for="(item, index) in tableNameOptions" :key="index" :value="item.name">{{ item.nameAndComments }}</Option>
            </Select>
            <Button type="primary" @click="nextStep()">下一步 <Icon type="chevron-right"></Icon></Button>
        </section>
        <!-- 第二步 -->
        <section v-if="step === 1">
            <Card dis-hover style="margin-bottom: 10px;">
                <p slot="title">基本信息</p>
                <!-- 表单 -->
                <Form ref="form" label-position="top" :model="form" :rules="rules" inline>
                    <FormItem label="表名" prop="name"><Input v-model="form.name" placeholder="name" disabled></Input></FormItem>
                    <FormItem label="说明" prop="comments"><Input v-model="form.comments" placeholder="comments"></Input></FormItem>
                    <FormItem label="类名" prop="className"><Input v-model="form.className" placeholder="className"></Input></FormItem>
                    <FormItem label="父表表名" prop="parentTable"><DictSelect :value.sync="form.parentTable" :options="parentTableOptions" :width="200"></DictSelect></FormItem>
                    <FormItem label="当前表外键" prop="parentTableFk"><DictSelect :value.sync="form.parentTableFk" :options="parentTableFkOptions" :width="200"></DictSelect></FormItem>
                </Form>
            </Card>
            <Card dis-hover>
                <p slot="title">字段列表</p>
                <XTable :loading="table.loading" :columns="table.columns" :data="table.data" @enter="enterHandler"></XTable>
            </Card>
            <!-- 提交 -->
            <SaveBar @save="submitHandler"></SaveBar>
        </section>
        <!-- 载入 -->
        <Spin size="large" fix v-if="!ready"></Spin>
    </div>
</template>

<script>
// 插件
import { axiosToken, axiosErrorHandler } from '@/plugins/axios.js';
import * as tool from '@/assets/library/tool.js';
// mixin
import form from '@/mixin/form.js';
import closeMe from '@/mixin/closeMe.js';
import formValidate from '@/mixin/formValidate.js';
import tableExtend from './tableExtend.js';
// 组件
import XTable from '@/components/table/table.vue';
import SaveBar from '@/components/form/save/bar.vue';
// name
const nameInRouter = 'gen-table-form';
export default {
    name: nameInRouter,
    mixins: [
        form,
        closeMe,
        formValidate,
        tableExtend
    ],
    components: {
        XTable,
        SaveBar
    },
    data () {
        return {
            // 设置
            setting: {
                // 本页的名字(路由name)
                myName: nameInRouter,
                // 数据接口
                API: '/a/gen/genTable'
            },
            // 表单空模板
            formEmpty: {
                id: '',
                name: '',
                comments: '',
                className: '',
                parentTable: '',
                parentTableFk: ''
            },
            // 校验规则
            rules: {
                name: [{required: true, message: '必填', trigger: 'blur'}],
                comments: [{required: true, message: '必填', trigger: 'blur'}],
                className: [{required: true, message: '必填', trigger: 'blur'}]
            },
            // 表格
            table: {
                columns: [
                    {title: '列名', key: 'name', width: 200, fixed: 'left'},
                    {title: '说明', key: 'comments', width: 200, control: 'Input'},
                    {title: '物理类型', key: 'jdbcType', width: 120},
                    {title: 'Java类型', key: 'javaType', width: 160, control: 'DictSelect', props: { options: [] }},
                    {title: 'Java属性名称', key: 'javaField', width: 200, control: 'Input'},
                    {title: '主键', key: 'isPk', width: 80, control: 'i-switch', props: { trueValue: '1', falseVlaue: '0' }},
                    {title: '可空', key: 'isNull', width: 80, control: 'i-switch', props: { trueValue: '1', falseVlaue: '0' }},
                    {title: '插入', key: 'isInsert', width: 80, control: 'i-switch', props: { trueValue: '1', falseVlaue: '0' }},
                    {title: '编辑', key: 'isEdit', width: 80, control: 'i-switch', props: { trueValue: '1', falseVlaue: '0' }},
                    {title: '列表', key: 'isList', width: 80, control: 'i-switch', props: { trueValue: '1', falseVlaue: '0' }},
                    {title: '查询', key: 'isQuery', width: 80, control: 'i-switch', props: { trueValue: '1', falseVlaue: '0' }},
                    {title: '查询匹配方式', key: 'queryType', width: 140, control: 'DictSelect', props: { options: [] }},
                    {title: '显示表单类型', key: 'showType', width: 160, control: 'DictSelect', props: { options: [] }},
                    {title: '字典类型', key: 'dictType', width: 200, control: 'Input'},
                    {title: '排序', key: 'sort', width: 100, control: 'Input'}
                ]
            },
            // 这个页面独有的
            tableName: '',
            tableNameOptions: [],
            step: 0,
            parentTableOptions: [],
            parentTableFkOptions: []
        };
    },
    methods: {
        initStartHandler () {
            // 页面 初始化
            if (this.setting.mode === 'edit') { this.step = 1; }
            axiosToken({
                url: '/a/gen/genTable/dbList'
            }).then(res => {
                this.tableNameOptions = res.data.genTablelist;
                this.parentTableOptions = res.data.genTablelist.map(e => ({
                    label: e.nameAndComments,
                    value: e.name
                }));
                this.ready = true;
            }).catch(error => axiosErrorHandler(error));
        },
        dataToFrom (data) {
            // 外部处理请求的数据赋值到本地
            this.table.data = tool.clone(data.genTable.columnList.map(e => {
                // 过滤掉无用数据
                let needKeyName = [...this.table.columns, {key: 'id'}].map(c => c.key);
                let returnObj = {};
                needKeyName.forEach(n => {
                    returnObj[n] = e[n] || '';
                });
                return returnObj;
            }));
            // 复制一份作为后台响应编辑表格变化的数据
            this.table.dataCopy = tool.clone(this.table.data);
            // 表单
            this.form.id = data.genTable.id;
            this.form.name = data.genTable.name;
            this.form.comments = data.genTable.comments;
            this.form.className = data.genTable.className;
            this.form.parentTable = data.genTable.parentTable;
            this.form.parentTableFk = data.genTable.parentTableFk;
            // 选项
            this.table.columns.find(e => e.key === 'javaType').props.options = data.config.javaTypeList;
            this.table.columns.find(e => e.key === 'queryType').props.options = data.config.queryTypeList;
            this.table.columns.find(e => e.key === 'showType').props.options = data.config.showTypeList;
            // 当前表外键选项
            this.parentTableFkOptions = this.table.data.map(e => ({
                label: `${e.name} : ${e.comments}`,
                value: e.name
            }));
        },
        formSendDataMaker () {
            // 提交表单前修改数据
            return {
                ...this.form,
                columnList: this.table.dataCopy
            };
        },
        // 这个页面独有的
        nextStep () {
            if (this.tableName) {
                this.ready = false;
                axiosToken({
                    url: '/a/gen/genTable/addTable',
                    data: {
                        name: this.tableName
                    }
                }).then(res => {
                    this.dataToFrom(res.data);
                    this.ready = true;
                    this.step = 1;
                }).catch(error => axiosErrorHandler(error));
            } else {
                this.$Message.error('请先选择一个表');
            }
        }
    }
};
</script>

