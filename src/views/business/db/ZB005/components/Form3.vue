<template>
    <div style="margin: 0px 10px;">
        <Form ref="form" label-position="top" :model="form" :rules="rules" inline>
            <FormItem label="指标名称" prop="name">
                <Input v-model="form.name" placeholder="指标名称"></Input>
            </FormItem>
            <FormItem label="级别" prop="grade">
                <Input v-model="form.grade" placeholder="级别" disabled></Input>
            </FormItem>
            <FormItem label="指标编号" prop="code">
                <Input v-model="form.code" placeholder="指标编号"></Input>
            </FormItem>
            <!-- <FormItem label="指标属性" prop="attributes">
                <Input v-model="form.attributes" placeholder="指标属性"></Input>
            </FormItem>
            <FormItem label="取数表" prop="access_table">
                <Input v-model="form.access_table" placeholder="取数表"></Input>
            </FormItem> -->
            <FormItem label="类型" prop="type">
                <DictRadio
                    :value.sync="form.type"
                    type="index_type">
                </DictRadio>
            </FormItem>
            <FormItem label="指标特性" prop="feature">
                <Input v-model="form.feature" placeholder="指标特性" :disabled="form.type === '1'"></Input>
            </FormItem>
            <FormItem label="小数位数" prop="decimalNumber">
                <InputNumber v-model="form.decimalNumber" :disabled="form.type === '2'"></InputNumber>
            </FormItem>
        </Form>
        <div>
            <Button @click="submit">保存</Button>
        </div>
    </div>
</template>

<script>
// 库
import { axiosToken, axiosErrorHandler } from '@/plugins/axios.js';
// mixin
import mixin from './mixin'
export default {
    mixins: [
        mixin
    ],
    props: {
        grade: {
            type: Number,
            required: true
        },
        pid: {
            type: String,
            required: false,
            default: 0
        }
    },
    data () {
        return {
            form: {
                name: '',
                grade: 0,
                code: '',
                feature: '',
                decimalNumber: 0,
                type: '1'
            },
            rules: {
                name: [{required: true, message: '必填', trigger: 'change'}], //
                code: [{required: true, message: '必填', trigger: 'change'}], //
                // attributes: [{required: true, message: '必填', trigger: 'change'}], //
                // access_table: [{required: true, message: '必填', trigger: 'change'}], //
                type: [{required: true, message: '必填', trigger: 'change'}] //
            }
        }
    },
    created () {
        this.form.grade = this.grade
        this.defToForm()
    },
    watch: {
        grade (value) {
            this.form.grade = value
        },
        formDef () {
            this.defToForm()
        }
    },
    methods: {
        defToForm () {
            if (this.mode === 'edit') {
                this.form.name = this.formDef.name
                this.form.code = this.formDef.code
                this.form.feature = this.formDef.feature
                this.form.decimalNumber = this.formDef.decimalNumber
                this.form.type = this.formDef.type
            }
        },
        submit () {
            this.$refs.form.validate((valid) => {
                if (this.form.type === '1' && this.form.decimalNumber === '') {
                    this.$Message.error('表单校验失败');
                    return;
                }
                if (this.form.type === '2' && this.form.feature === '') {
                    this.$Message.error('表单校验失败');
                    return;
                }
                if (valid) {
                    axiosToken({
                        url: '/a/config/indexDetail',
                        method: 'post',
                        data: {
                            ...this.form,
                            ...this.mode === 'edit' ? {id: this.formDef.id} : {parentId: this.pid}
                        }
                    }).then(res => {
                        this.$Message.success(res.data.msg);
                        this.form.name = '';
                        this.form.code = '';
                        // this.form.attributes = '';
                        // this.form.access_table = '';
                        this.form.feature = '';
                        this.form.decimalNumber = 0;
                        this.form.type = '';
                        this.$emit('submit');
                    }).catch(error => axiosErrorHandler(error));
                } else {
                    this.$Message.error('表单校验失败');
                }
            });
        }
    }
}
</script>
