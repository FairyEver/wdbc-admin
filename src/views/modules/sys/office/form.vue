<template>
    <div style="position: relative;">
        <Input style="display:none;" v-model="oldCode" ></Input>
        <Form ref="form" :model="form" :rules="rules" label-position="top">
            <Row :gutter="10">
                <Col span="4">
                    <FormItem label="机构编码" prop="code">
                      <Input v-model="form.code" placeholder="code"></Input>
                    </FormItem>
                </Col>
                <Col span="4">
                    <FormItem label="机构名称" prop="name">
                        <Input v-model="form.name" placeholder="name"></Input>
                    </FormItem>
                </Col>
                <Col span="4">
                    <FormItem label="负责人" prop="primaryPerson.name">
                        <Input v-model="form.primaryPerson.name" placeholder="primaryPerson.name"></Input>
                    </FormItem>
                </Col>
                <Col span="4">
                    <FormItem label="机构类型" prop="type">
                        <DictSelect :value.sync="form.type" type="sys_office_type"></DictSelect>
                    </FormItem>
                </Col>
                <Col span="4">
                    <FormItem label="机构级别" prop="grade">
                        <DictSelect :value.sync="form.grade" type="sys_office_grade"></DictSelect>
                    </FormItem>
                </Col>
                <Col span="4">
                    <!-- <FormItem label="上级机构" prop="parent.id">
                        <Input style="display:none;" v-model="form.parent.id" placeholder="parent.id"></Input>
                        <Button @click="modal = true">{{form.parent.name}}</Button>
                    </FormItem> -->
                    <FormItem label="上级机构" prop="parent.id">
                        <TreeOffice :value.sync="form.parent.id"></TreeOffice>
                    </FormItem>
                </Col>
                <Col span="4">
                    <FormItem label="是否可用" prop="useable">
                        <DictRadio :value.sync="form.useable" type="yes_no"></DictRadio>
                    </FormItem>
                </Col>
                <Col span="8">
                    <FormItem label="备注" prop="remarks">
                        <Input type="textarea" v-model="form.remarks" placeholder="remarks"></Input>
                    </FormItem>
                </Col>
            </Row>
        </Form>
        <!-- 提交 -->
        <SaveBar @save="submitHandler"></SaveBar>
        <!-- Modal -->
        <Modal v-model="modal" title="选择机构">
            <div style="height: 400px; overflow: scroll;">
                <Ztree
                    ref="ztree"
                    api="/a/sys/officeTree"
                    :initAfterSync="true"
                    @onClick="zTreeOnClick">
                </Ztree>
            </div>
        </Modal>
        <!-- 载入 -->
        <Spin size="large" fix v-if="!ready"></Spin>
    </div>
</template>

<script>
// mixin
import form from '@/mixin/form.js';
import closeMe from '@/mixin/closeMe.js';
import formValidate from '@/mixin/formValidate.js';
import { axiosToken, axiosErrorHandler } from '@/plugins/axios.js';
// 组件
import SaveBar from '@/components/form/save/bar.vue';

// name
const nameInRouter = 'sys-office-form';
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
        const validateCode = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('必填'));
            }
            axiosToken({
                url: `/a/sys/office/checkOfficeCode?oldCode=${this.oldCode}&code=${this.form.code}`,
            }).then(res => {
                if (res.data) {
                    callback();
                } else {
                    callback(new Error('机构编码已存在'));
                }
            }).catch(error => axiosErrorHandler(error));
        };
        return {
            modal: false,
            // 设置
            setting: {
                // 本页的名字(路由name)
                myName: nameInRouter,
                // 数据接口
                API: '/a/sys/office'
            },
            // 表单空模板
            formEmpty: {
                id: '',
                code: '',
                name: '',
                primaryPerson: {
                    name: ''
                },
                useable: '1',
                type: '',
                grade: '',
                parent: {
                    id: '',
                    name: '请选择'
                },
                remarks: ''
            },
            // 校验规则
            rules: {
                code: [{validator: validateCode, trigger: 'blur'}],
                name: [{required: true, message: '必填', trigger: 'blur'}],
                type: [{required: true, message: '必填', trigger: 'change'}]
            },
            oldCode: ''
        };
    },
    created () {
        this.ready = true;
        this.oldCode = this.form.code;
    },
    methods: {
        zTreeOnClick (event, treeId, treeNode) {
            this.form.parent.id = treeNode.id;
            this.form.parent.name = treeNode.name;
        },
    }
};
</script>
