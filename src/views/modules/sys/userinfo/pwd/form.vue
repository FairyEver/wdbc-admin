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
                    <FormItem label="旧密码：" prop="oldPassword">
                        <div style="display:inline-block;width:300px;">
                            <Input type="password" v-model="userForm.oldPassword" ></Input>
                        </div>
                    </FormItem>
                    <FormItem label="新密码：" prop="newPassword">
                        <div style="display:inline-block;width:300px;">
                            <Input type="password" v-model="userForm.newPassword" ></Input>
                        </div>
                    </FormItem>
                    <FormItem label="重复新密码：" prop="confirmNewPassword">
                        <div style="display:inline-block;width:300px;">
                            <Input type="password" v-model="userForm.confirmNewPassword" ></Input>
                        </div>
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
    name: 'pwd',
    data () {
        return {
            userForm: {
                oldPassword: '',
                newPassword: '',
                confirmNewPassword: '',
            },
            inforValidate: {
                oldPassword: [
                    { required: true, message: '请输入旧密码' },
                    { type: 'string', min: 3, message: '请输入一个长度最少是 3 的字符串', trigger: 'blur' }
                ],
                newPassword: [
                    { required: true, message: '请输入新密码' },
                    { type: 'string', min: 3, message: '请输入一个长度最少是 3 的字符串', trigger: 'blur' }
                ],
                confirmNewPassword: [
                    { required: true, message: '请重复新密码' },
                    { type: 'string', min: 3, message: '请输入一个长度最少是 3 的字符串', trigger: 'blur' }
                ]
            },
            save_loading: false
        };
    },
    methods: {
        saveEdit () {
            this.$refs['userForm'].validate((valid) => {
                if (valid) {
                    if (this.userForm.newPassword !== this.userForm.confirmNewPassword) {
                        this.$Message.error('两次输入的密码不一致');
                        return;
                    }
                    this.saveInfoAjax();
                }
            });
        },
        saveInfoAjax () {
            this.save_loading = true;
            axiosToken({
                method: 'post',
                url: '/a/sys/user/modifyPwd',
                data: {
                    oldPassword: this.userForm.oldPassword,
                    newPassword: this.userForm.newPassword
                }
            }).then(res => {
                this.save_loading = false;
            }).catch(error => axiosErrorHandler(error));
        }
    }
};
</script>
