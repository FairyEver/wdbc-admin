<template>
    <div style="position: relative; padding: 0px 50px;">
        <Form ref="form" label-position="top" :model="form" :rules="rules" inline>
            <FormItem label="方案名称" prop="name">
                <Input v-model="form.name" placeholder="name"></Input>
            </FormItem>
            <FormItem prop="category">
                <span slot="label">
                    模板分类
                    <Tooltip placement="bottom">
                        <div slot="content" style="white-space: normal;"><p>生成结构</p><p>{包名}/{模块名}/{分层(dao,entity,service,web)}/{子模块名}/{java类}</p></div>
                        <Icon type="help-circled"></Icon>
                    </Tooltip>
                </span>
                <DictSelect :value.sync="form.category" :options="categoryOptions" :width="200"></DictSelect>
            </FormItem>
            <FormItem prop="packageName">
                <span slot="label">生成包路径 <Tooltip content="建议模块包：com.j2ee.w3.modules" placement="bottom"><Icon type="help-circled"></Icon></Tooltip></span>
                <Input v-model="form.packageName" placeholder="packageName"></Input>
            </FormItem>
            <FormItem prop="moduleName">
                <span slot="label">生成模块名 <Tooltip content="可理解为子系统名，例如 sys" placement="bottom"><Icon type="help-circled"></Icon></Tooltip></span>
                <Input v-model="form.moduleName" placeholder="moduleName"></Input>
            </FormItem>
            <FormItem prop="subModuleName">
                <span slot="label">生成子模块名 <Tooltip content="可选，分层下的文件夹" placement="bottom"><Icon type="help-circled"></Icon></Tooltip></span>
                <Input v-model="form.subModuleName" placeholder="subModuleName"></Input>
            </FormItem>
            <FormItem prop="functionName">
                <span slot="label">生成功能描述 <Tooltip content="将设置到类描述" placement="bottom"><Icon type="help-circled"></Icon></Tooltip></span>
                <Input v-model="form.functionName" placeholder="functionName"></Input>
            </FormItem>
            <FormItem prop="functionNameSimple">
                <span slot="label">生成功能名 <Tooltip content="用作功能提示，如：保存“某某”成功" placement="bottom"><Icon type="help-circled"></Icon></Tooltip></span>
                <Input v-model="form.functionNameSimple" placeholder="functionNameSimple"></Input>
            </FormItem>
            <FormItem prop="functionAuthor">
                <span slot="label">生成功能作者 <Tooltip content="功能开发者" placement="bottom"><Icon type="help-circled"></Icon></Tooltip></span>
                <Input v-model="form.functionAuthor" placeholder="functionAuthor"></Input>
            </FormItem>
            <FormItem prop="genTable.id">
                <span slot="label">业务表名 <Tooltip content="生成的数据表，一对多情况下请选择主表" placement="bottom"><Icon type="help-circled"></Icon></Tooltip></span>
                <DictSelect :value.sync="form.genTable.id" :options="genTableIdOptions" :width="200"></DictSelect>
            </FormItem>
        </Form>
        <!-- 提交 -->
        <SaveBar @save="submitHandler"></SaveBar>
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
// 组件
import SaveBar from '@/components/form/save/bar.vue';
// name
const nameInRouter = 'gen-scheme-form';
export default {
    name: nameInRouter,
    mixins: [
        form,
        closeMe,
        formValidate
    ],
    components: {
        SaveBar
    },
    data () {
        return {
            // 设置
            setting: {
                // 本页的名字(路由name)
                myName: nameInRouter,
                // 数据接口
                API: '/a/gen/genScheme'
            },
            // 表单空模板
            formEmpty: {
                id: '',
                name: '',
                category: '',
                packageName: '',
                moduleName: '',
                subModuleName: '',
                functionName: '',
                functionNameSimple: '',
                functionAuthor: '',
                genTable: {
                    id: ''
                }
            },
            // 校验规则
            rules: {
                name: [{required: true, message: '必填', trigger: 'blur'}],
                category: [{required: true, message: '必填', trigger: 'change'}],
                moduleName: [{required: true, message: '必填', trigger: 'blur'}],
                functionName: [{required: true, message: '必填', trigger: 'blur'}],
                functionNameSimple: [{required: true, message: '必填', trigger: 'blur'}],
                functionAuthor: [{required: true, message: '必填', trigger: 'blur'}],
                'genTable.id': [{required: true, message: '必填', trigger: 'change'}]
            },
            // 这个页面独有的
            categoryOptions: [],
            genTableIdOptions: []
        };
    },
    methods: {
        initStartHandler () {
            if (this.setting.mode === 'new') {
                // 页面 初始化
                axiosToken({
                    url: this.setting.API + '/addScheme'
                }).then(res => {
                    this.dataToFrom(res.data);
                }).catch(error => axiosErrorHandler(error));
            }
        },
        dataToFrom (data) {
            // 处理请求到的数据
            let config = tool.clone(data.config);
            let tableList = tool.clone(data.tableList);
            // 表单
            if (this.setting.mode === 'edit') {
                let genScheme = tool.clone(data.genScheme);
                this.form.id = genScheme.id;
                this.form.name = genScheme.name;
                this.form.category = genScheme.category;
                this.form.packageName = genScheme.packageName;
                this.form.moduleName = genScheme.moduleName;
                this.form.subModuleName = genScheme.subModuleName;
                this.form.functionName = genScheme.functionName;
                this.form.functionNameSimple = genScheme.functionNameSimple;
                this.form.functionAuthor = genScheme.functionAuthor;
                this.form.genTable.id = genScheme.genTable.id;
            }
            // 选项
            this.categoryOptions = config.categoryList.map(e => ({label: e.label, value: e.value}));
            this.genTableIdOptions = tableList.map(e => ({label: e.nameAndComments, value: e.id}));
            // console.log(this.genTableIdOptions.find(a => a.value === this.form.genTable.id));
        }
    }
};
</script>
