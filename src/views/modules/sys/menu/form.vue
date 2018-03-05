<template>
    <div style="position: relative;">
        <!-- 表单 -->
        <Form ref="form" label-position="top" :model="form" :rules="rules" inline>
            <FormItem label="ID" prop="id"><Input v-model="form.id" placeholder="id" disabled></Input></FormItem>
            <FormItem label="上级菜单" prop="parentId"><TreeMenu :value.sync="form.parentId" :api="setting.API + '/tree'"></TreeMenu></FormItem>
            <FormItem label="菜单名称" prop="name"><Input v-model="form.name" placeholder="name"></Input></FormItem>
            <FormItem label="菜单排序" prop="sort"><Input v-model="form.sort" placeholder="sort"></Input></FormItem>
            <FormItem label="菜单链接" prop="href"><Input v-model="form.href" placeholder="href"></Input></FormItem>
            <FormItem label="权限标识" prop="permission"><Input v-model="form.permission" placeholder="permission"></Input></FormItem>
            <FormItem label="图标" prop="icon"><Input v-model="form.icon" placeholder="icon"></Input></FormItem>
            <FormItem label="备注" prop="remarks"><Input v-model="form.remarks" placeholder="remarks"></Input></FormItem>
        </Form>
        <!-- 提交 -->
        <SaveBar @save="submitHandler"></SaveBar>
        <!-- 载入 -->
        <Spin size="large" fix v-if="!ready"></Spin>
    </div>
</template>

<script>
// mixin
import form from '@/mixin/form.js';
import closeMe from '@/mixin/closeMe.js';
import formValidate from '@/mixin/formValidate.js';
// 组件
import SaveBar from '@/components/form/save/bar.vue';
import TreeMenu from './components/tree.vue';
// name
const nameInRouter = 'sys-menu-form';
export default {
    name: nameInRouter,
    mixins: [
        form,
        closeMe,
        formValidate
    ],
    components: {
        SaveBar,
        TreeMenu
    },
    data () {
        return {
            // 设置
            setting: {
                // 本页的名字(路由name)
                myName: nameInRouter,
                // 数据接口
                API: '/a/sys/menu'
            },
            // 表单空模板
            formEmpty: {
                id: '',
                parentId: '',
                name: '',
                sort: '',
                href: '',
                permission: '',
                icon: '',
                remarks: ''
            },
            // 校验规则
            rules: {
                name: [{required: true, message: '必填', trigger: 'blur'}]
            }
        };
    },
    created () {
        this.ready = true;
    }
};
</script>

