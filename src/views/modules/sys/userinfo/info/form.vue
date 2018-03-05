<style lang="less">
    @import '../user.less';
</style>

<template>
    <div>
        <Card>
            <p slot="title">
                <Icon type="person"></Icon>
                个人信息
            </p>
            <div>
                <Form 
                    ref="userForm"
                    :model="userForm" 
                    :label-width="100" 
                    label-position="right"
                    :rules="inforValidate"
                >
                    <FormItem label="邮箱：" prop="email">
                        <div style="display:inline-block;width:300px;">
                            <Input v-model="userForm.email" ></Input>
                        </div>
                    </FormItem>
                    <FormItem label="电话：" prop="phone">
                        <div style="display:inline-block;width:300px;">
                            <Input v-model="userForm.phone" ></Input>
                        </div>
                    </FormItem>
                    <FormItem label="手机：" prop="mobile">
                        <div style="display:inline-block;width:300px;">
                            <Input v-model="userForm.mobile" ></Input>
                        </div>
                    </FormItem>
                    <FormItem label="备注：" prop="remarks">
                        <div style="display:inline-block;width:300px;">
                            <Input v-model="userForm.remarks" ></Input>
                        </div>
                    </FormItem>
                    <FormItem label="公司名称：">
                        <span>{{ company }}</span>
                    </FormItem>
                    <FormItem label="用户角色：">
                        <span>{{ roleNames }}</span>
                    </FormItem>
                    <FormItem label="部门名称：">
                        <span>{{ department }}</span>
                    </FormItem>
                    <FormItem label="姓名：">
                        <span>{{ name }}</span>
                    </FormItem>
                    <FormItem label="用户类型：">
                        <span>{{ userType }}</span>
                    </FormItem>
                    <FormItem label="上次登录IP：">
                        <span>{{ oldLoginIp }}</span>
                    </FormItem>
                    <FormItem label="上次登录时间：">
                        <span>{{ oldLoginDate }}</span>
                    </FormItem>
                    <div>
                        <Button type="primary" style="width: 100px;" :loading="save_loading" @click="saveEdit">保存</Button>
                    </div>
                </Form>
            </div>
        </Card>
    </div>
</template>

<script>
import { axiosToken, axiosErrorHandler } from '@/plugins/axios.js';
export default {
    name: 'info',
    data () {
        return {
            userForm: {
                email: '',
                phone: '',
                mobile: '',
                remarks: ''
            },
            inforValidate: {
                email: [
                    { type: 'email', message: '请输入正确格式的邮箱', trigger: 'blur' }
                ]
            },
            roleNames: '',
            company: '',
            department: '',
            name: '',
            userType: '',
            oldLoginIp: '',
            oldLoginDate: '',
            save_loading: false
        };
    },
    created () {
        this.getUserInfo();
    },
    methods: {
        getUserInfo () {
            axiosToken({
                url: '/a/sys/user/info'
            }).then(res => {
                this.userForm.email = res.data.user.email;
                this.userForm.phone = res.data.user.phone;
                this.userForm.mobile = res.data.user.mobile;
                this.userForm.remarks = res.data.user.remarks;
                this.roleNames = res.data.user.roleNames;
                this.company = res.data.user.company_id;
                this.department = res.data.user.office_id;
                this.userType = res.data.user.user_type;
                this.name = res.data.user.name;
                this.oldLoginIp = res.data.user.oldLoginIp;
                this.oldLoginDate = res.data.user.oldLoginDate;
            }).catch(error => axiosErrorHandler(error));
        },
        saveEdit () {
            this.$refs['userForm'].validate((valid) => {
                if (valid) {
                    this.saveInfoAjax();
                }
            });
        },
        saveInfoAjax () {
            this.save_loading = true;
            axiosToken({
                method: 'post',
                url: '/a/sys/user/info',
                data: {
                    email: this.userForm.email,
                    phone: this.userForm.phone,
                    mobile: this.userForm.mobile,
                    remarks: this.userForm.remarks
                }
            }).then(res => {
                if (res.data.code === 0) {
                    this.$Message.success(res.data.msg);
                } else {
                    this.$Message.error(res.data.msg);
                }
                this.save_loading = false;
            });
        }
    }
};
</script>
