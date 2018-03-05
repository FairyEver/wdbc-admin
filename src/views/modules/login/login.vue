<style lang="less">
    @import './login.less';
</style>

<template>
    <div class="login" @keydown.enter="handleSubmit" :style="{backgroundImage: 'url(' + bg + ')' }">
        <div class="login-con">
            <Card dis-hover :bordered="false">
                <p slot="title">
                    <Icon type="log-in"></Icon>
                    欢迎登录
                </p>
                <div class="form-con">
                    <Form ref="loginForm" :model="form" :rules="rules">
                        <FormItem prop="userName">
                            <Input v-model="form.userName" placeholder="请输入用户名">
                                <span slot="prepend">
                                    <Icon :size="16" type="person"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem prop="password">
                            <Input type="password" v-model="form.password" placeholder="请输入密码">
                                <span slot="prepend">
                                    <Icon :size="14" type="locked"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem style="margin-bottom: 0px;">
                            <Button @click="handleSubmit" type="primary" long>
                                <span v-if="!loginBtnLoading">登录</span>
                                <span v-else>登录中...</span>
                            </Button>
                        </FormItem>
                    </Form>
                </div>
            </Card>
            <Card dis-hover style="margin-top: 10px;" v-if="showSwitchServer">
                <Row :gutter="10">
                    <Col span="14">
                        <Select v-model="form.server" placeholder="请选择服务器">
                            <Option v-for="item in serverList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </Col>
                    <Col span="10">
                        <Tooltip content="为了在家开发组件，绕过登录" placement="top">
                            <Button long @click="devLogin"><Icon type="code"></Icon> 直接登录</Button>
                        </Tooltip>
                    </Col>
                </Row>
            </Card>
        </div>
    </div>
</template>

<script>
import Cookies from 'js-cookie';
import { axios, axiosToken, axiosErrorHandler } from '@/plugins/axios.js';
import bg from '@/images/login_bg.jpg';
export default {
    data () {
        return {
            bg,
            form: {
                userName: 'sadmin',
                password: 'sadmin',
                server: 'http://192.168.164.120:6080'
            },
            rules: {
                userName: [
                    { required: true, message: '账号不能为空', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' }
                ]
            },
            loginBtnLoading: false,
            serverList: [
                { value: 'http://192.168.164.120:6080', label: 'wl' }
            ]
        };
    },
    computed: {
        serverUrl () {
            switch (this.$store.state.environment) {
                case 'online':
                    return 'localhost';
                case 'qas':
                    return 'http://10.1.1.133:80';
                case 'test':
                    return 'http://10.1.1.132:80';
                case 'dev':
                    return this.form.server;
                case 'local':
                    return this.form.server;
                default:
                    return 'localhost';
            }
        },
        showSwitchServer () {
            switch (this.$store.state.environment) {
                case 'online':
                    return false;
                case 'qas':
                    return false;
                case 'test':
                    return false;
                case 'dev':
                    return true;
                case 'local':
                    return true;
                default:
                    return false;
            }
        }
    },
    methods: {
        devLogin () {
            Cookies.set('user', this.form.userName);
            Cookies.set('password', this.form.password);
            this.$store.commit('setPermissionList', []);
            this.$store.commit('setNavList', []);
            this.$router.push({ name: 'home_index' });
        },
        handleSubmit () {
            this.$refs.loginForm.validate((valid) => {
                if (valid) {
                    this.loginBtnLoading = true;
                    Cookies.set('baseURL', this.serverUrl);
                    axios.post(`${Cookies.get('baseURL')}/login`, {
                            username: this.form.userName,
                            password: this.form.password,
                            captcha: '1234'
                    }).then(res => {
                        if (res.data.code === 0) {
                            this.$Message.info('登录成功 token = ' + res.data.token);
                            Cookies.set('token', res.data.token);
                            // 请求侧边栏数据
                            axiosToken({
                                url: '/a/sys/nav'
                            }).then(res => {
                                this.$store.commit('setPermissionList', res.data.permissionList);
                                this.$store.commit('setNavList', res.data.menuList);
                                this.$router.push({
                                    name: 'home_index'
                                });
                            }).catch(error => axiosErrorHandler(error));
                        } else {
                            this.$Message.error(res.data.msg);
                        }
                    }).catch(error => {
                        this.loginBtnLoading = false;
                        axiosErrorHandler(error);
                    });
                    Cookies.set('user', this.form.userName);
                    Cookies.set('password', this.form.password);
                    // 头像
                    this.$store.commit('setAvator', 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg');
                    // [暂时]权限为0的话不显示demo 权限为1的话显示demo
                    Cookies.set('access', 1);
                }
            });
        }
    }
};
</script>

<style>

</style>
