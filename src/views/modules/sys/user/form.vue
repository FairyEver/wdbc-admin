<template>
    <div style="position: relative;">
        <Input style="display:none;" v-model="oldLoginName" ></Input>
        <Form ref="form" :model="form" :rules="rules" label-position="top">
            <Row :gutter="10">
                <Col span="4">
                    <FormItem label="公司名称" prop="company.id">
                      <TreeOffice :value.sync="form.company.id"></TreeOffice>
                    </FormItem>
                </Col>
                <Col span="4">
                    <FormItem label="部门名称" prop="office.id">
                        <TreeOffice :value.sync="form.office.id"></TreeOffice>
                    </FormItem>
                </Col>
                <Col span="4">
                    <FormItem label="是否允许登录" prop="loginFlag">
                        <DictRadio :value.sync="form.loginFlag" type="yes_no"></DictRadio>
                    </FormItem>
                </Col>
                <Col span="4">
                    <FormItem label="用户类型" prop="userType">
                        <DictSelect :value.sync="form.userType" type="sys_user_type"></DictSelect>
                    </FormItem>
                </Col>
                <Col span="4">
                    <FormItem label="姓名" prop="name">
                      <Input v-model="form.name" placeholder="name"></Input>
                    </FormItem>
                </Col>
                <Col span="4">
                    <FormItem label="工号" prop="no">
                      <Input v-model="form.no" placeholder="no"></Input>
                    </FormItem>
                </Col>
                <Col span="4">
                    <FormItem label="登录名" prop="loginName">
                        <Input v-model="form.loginName" placeholder="loginName"></Input>
                    </FormItem>
                </Col>
                <Col span="4">
                    <FormItem label="手机" prop="mobile">
                        <Input v-model="form.mobile" placeholder="mobile"></Input>
                    </FormItem>
                </Col>
                <Col span="4">
                    <FormItem label="密码" prop="newPassword">
                        <Input type="password" v-model="form.newPassword" placeholder="newPassword"></Input>
                    </FormItem>
                </Col>
                <Col span="4">
                    <FormItem label="确认密码" prop="confirmNewPassword">
                        <Input type="password" v-model="form.confirmNewPassword" placeholder="confirmNewPassword"></Input>
                    </FormItem>
                </Col>
                <Col span="4">
                    <FormItem label="邮箱" prop="email">
                        <Input v-model="form.email" placeholder="email"></Input>
                    </FormItem>
                </Col>
                <Col span="4">
                    <FormItem label="电话" prop="phone">
                        <Input v-model="form.phone" placeholder="phone"></Input>
                    </FormItem>
                </Col>
                <Col span="24">
                    <FormItem label="用户角色" prop="roleIds">
                        <CheckboxGroup v-model="roleIdsArr">
                            <Checkbox
                                v-for="item in allRoles"
                                :key="item.id"
                                :label="item.id">
                                {{item.name}}
                            </Checkbox>
                        </CheckboxGroup>
                    </FormItem>
                </Col>
                <Col span="8" v-if="setting.mode === 'edit'">创建时间：{{createDate}}</Col>
                <Col span="8" v-if="setting.mode === 'edit'">上次登录IP：{{oldLoginIp}}</Col>
                <Col span="8" v-if="setting.mode === 'edit'">上次登录时间：{{updateDate}}</Col>
            </Row>
        </Form>
        <!-- 提交 -->
        <SaveBar @save="submitHandler"></SaveBar>
        <!-- 载入 -->
        <Spin size="large" fix v-if="!ready"></Spin>
    </div>
</template>

<script>
// 库
import qs from 'qs';
// mixin
import form from '@/mixin/form.js';
import closeMe from '@/mixin/closeMe.js';
import formValidate from '@/mixin/formValidate.js';
import { axiosToken, axiosErrorHandler } from '@/plugins/axios.js';
// 组件
import SaveBar from '@/components/form/save/bar.vue';

// name
const nameInRouter = 'sys-user-form';
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
        const validateNo = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('必填'));
            }
            axiosToken({
                url: `/a/sys/user/checkUserNo`,
                data: {
                    oldNo: this.oldNo,
                    no: this.form.no
                }
            }).then(res => {
                if (res.data) {
                    callback();
                } else {
                    callback(new Error('用户工号已存在'));
                }
            }).catch(error => axiosErrorHandler(error));
        };
        const validateLoginName = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('必填'));
            }
            axiosToken({
                url: '/a/sys/user/checkLoginName',
                data: {
                    oldLoginName: this.oldLoginName,
                    loginName: this.form.loginName
                }
            }).then(res => {
                if (res.data) {
                    callback();
                } else {
                    callback(new Error('用户登录名已存在'));
                }
            }).catch(error => axiosErrorHandler(error));
        };
        const validatePassword = (rule, value, callback) => {
            if (this.form.newPassword === this.form.confirmNewPassword) {
                callback();
            } else {
                callback(new Error('两次输入的密码不一致'));
            }
        };
        return {
            // 设置
            setting: {
                // 本页的名字(路由name)
                myName: nameInRouter,
                // 数据接口
                API: '/a/sys/user'
            },
            // 表单空模板
            formEmpty: {
                id: '',
                company: {
                    id: '',
                },
                office: {
                    id: '',
                },
                loginFlag: '1',
                userType: '',
                name: '',
                no: '',
                loginName: '',
                mobile: '',
                newPassword: '',
                confirmNewPassword: '',
                email: '',
                phone: '',
                roleIds: [],
                roleList: []
            },
            // 校验规则
            rules: {
                code: [
                    {required: true, message: '必填', trigger: 'blur'},
                    {validator: validatePassword, trigger: 'blur'}
                ],
                company: [{required: true, message: '必填', trigger: 'blur'}],
                office: [{required: true, message: '必填', trigger: 'blur'}],
                loginFlag: [{required: true, message: '必填', trigger: 'change'}],
                name: [{required: true, message: '必填', trigger: 'blur'}],
                no: [{validator: validateNo, trigger: 'blur'}],
                loginName: [{validator: validateLoginName, trigger: 'blur'}],
                mobile: [
                    {required: true, message: '必填', trigger: 'blur'},
                    { type: 'string', min: 11, message: '请输入一个长度最少是 11 的字符串', trigger: 'blur' }
                ],
                newPassword: [
                    {required: true, message: '必填', trigger: 'blur'},
                    { type: 'string', min: 3, message: '请输入一个长度最少是 3 的字符串', trigger: 'blur' }
                ],
                confirmNewPassword: [
                    {required: true, message: '必填', trigger: 'blur'},
                    {validator: validatePassword, trigger: 'blur'}
                ],
                email: [{ type: 'email', message: '请输入正确格式的邮箱', trigger: 'blur' }]
            },
            allRoles:[],
            createDate: '',
            oldLoginIp: '',
            updateDate: '',
            oldNo: '',
            oldLoginName: ''
        };
    },
    computed: {
        roleIdsArr : {
            get () {
                let _roleIdsArr = String(this.form.roleIds).split(',');
                return _roleIdsArr;
            },
            set (newValue) {
                this.form.roleIds = newValue.join(',');
            }
        }
    },
    created () {
        if (this.setting.mode === 'edit') {
            this.rules.newPassword[0].required = false;
            this.rules.confirmNewPassword[0].required = false;
        };
    },
    methods: {
        dataToFrom (paramsData) {
            this.allRoles = paramsData.allRoles;
            if (this.setting.mode === 'edit') {
                this.form.id = paramsData.user.id;
                this.form.company.id = paramsData.user.company.id;
                this.form.office.id = paramsData.user.office.id;
                this.form.loginFlag = paramsData.user.loginFlag;
                this.form.userType = paramsData.user.userType;
                this.form.name = paramsData.user.name;
                this.form.no = paramsData.user.no;
                this.oldNo = paramsData.user.no;
                this.form.loginName = paramsData.user.loginName;
                this.oldLoginName = paramsData.user.loginName;
                this.form.mobile = paramsData.user.mobile;
                this.form.email = paramsData.user.email;
                this.form.phone = paramsData.user.phone;
                this.form.roleIds = paramsData.user.roleIds;
                this.form.roleList = paramsData.user.roleList;
                this.createDate = paramsData.user.createDate;
                this.oldLoginIp = paramsData.user.oldLoginIp;
                this.updateDate = paramsData.user.updateDate;
            }
        },
        formSendDataMaker () {
            let _roleIds = this.roleIdsArr ? this.roleIdsArr.join(',') : '';
            return {
                ...this.form,
                roleIds:  _roleIds
            }
        }
    }
};
</script>
