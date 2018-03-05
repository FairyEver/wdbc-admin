<template>
    <div style="position: relative;">
        <Form ref="form" label-position="top" :model="form" :rules="rules" inline>
            <FormItem label="job名称" prop="jobName"><Input v-model="form.jobName" placeholder="jobName"></Input></FormItem>
            <FormItem label="bean名称" prop="beanName"><Input v-model="form.beanName" placeholder="beanName"></Input></FormItem>
            <FormItem label="方法名称" prop="methodName"><Input v-model="form.methodName" placeholder="methodName"></Input></FormItem>
            <FormItem label="参数" prop="params"><Input v-model="form.params" placeholder="params"></Input></FormItem>
            <FormItem label="cron表达式" prop="cronExpression"><Input v-model="form.cronExpression" placeholder="cronExpression"></Input></FormItem>
            <FormItem label="状态" prop="status">
                <RadioGroup v-model="form.status">
                    <Radio :label="0">正常</Radio>
                    <Radio :label="1">暂停</Radio>
                </RadioGroup>
            </FormItem>
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
const nameInRouter = 'sys-schedule-job-form';
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
                API: '/a/job/scheduleJob'
            },
            // 表单空模板
            formEmpty: {
                id: '',
                jobName: '',
                beanName: '',
                methodName: '',
                params: '',
                cronExpression: '',
                remarks: '',
                status: 0
            },
            // 校验规则
            rules: {
                jobName: [{required: true, message: '必填', trigger: 'blur'}],
                beanName: [{required: true, message: '必填', trigger: 'blur'}],
                methodName: [{required: true, message: '必填', trigger: 'blur'}],
                cronExpression: [{required: true, message: '必填', trigger: 'blur'}]
            }
        };
    },
    created () {
        this.ready = true;
    }
};
</script>
