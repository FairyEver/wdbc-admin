<template>
    <div style="margin: 0px 10px;">
        <Form ref="form" label-position="top" :model="form" :rules="rules" inline>
            <FormItem label="名称" prop="name">
                <Input v-model="form.name" placeholder="name"></Input>
            </FormItem>
            <FormItem label="grade" prop="grade">
                <Input v-model="form.grade" placeholder="grade" disabled></Input>
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
                grade: 0
            },
            rules: {
                name: [{required: true, message: '必填', trigger: 'change'}]
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
            }
        },
        submit () {
            this.$refs.form.validate((valid) => {
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
