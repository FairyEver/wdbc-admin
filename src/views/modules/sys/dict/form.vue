<template>
    <div style="position: relative;">
        <Form ref="form" label-position="top" :model="form" :rules="rules" inline>
            <FormItem label="键值" prop="value"><Input v-model="form.value" placeholder="value"></Input></FormItem>
            <FormItem label="标签" prop="label"><Input v-model="form.label" placeholder="label"></Input></FormItem>
            <FormItem label="类型" prop="type"><Input v-model="form.type" placeholder="type"></Input></FormItem>
            <FormItem label="描述" prop="description"><Input v-model="form.description" placeholder="description"></Input></FormItem>
            <FormItem label="排序" prop="sort"><Input v-model="form.sort" placeholder="sort"></Input></FormItem>
            <FormItem label="备注" prop="remarks"><Input type="textarea" :autosize="true" v-model="form.remarks" placeholder="remarks"></Input></FormItem>
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

// name
const nameInRouter = 'sys-dict-form';
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
                API: '/a/sys/dict'
            },
            // 表单空模板
            formEmpty: {
                id: '',
                value: '',
                label: '',
                type: '',
                description: '',
                sort: '',
                remarks: ''
            },
            // 校验规则
            rules: {
                value: [{required: true, message: '必填', trigger: 'blur'}],
                label: [{required: true, message: '必填', trigger: 'blur'}],
                type: [{required: true, message: '必填', trigger: 'blur'}],
                description: [{required: true, message: '必填', trigger: 'blur'}]
            }
        };
    },
    created () {
        this.ready = true;
    }
};
</script>
