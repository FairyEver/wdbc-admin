<template>
    <div>
        <Card dis-hover style="margin-bottom: 10px;">
            <p slot="title">带Token请求</p>
            <RadioGroup v-model="method" type="button" size="small" style="margin-bottom: 10px;">
                <Radio label="get">GET</Radio>
                <Radio label="post">POST</Radio>
                <Radio label="delete">DELETE</Radio>
            </RadioGroup>
            <Input v-model="url" placeholder="输入一个地址">
                <span slot="prepend">{{baseUrl}}</span>
                <Button slot="append" @click="go"><Icon type="paper-airplane"></Icon> 发送</Button>
            </Input>
        </Card>
        <Row :gutter="10">
            <Col span="6">
                <Card dis-hover style="margin-bottom: 10px;">
                    <p slot="title">携带数据</p>
                    <Button href="#" slot="extra" size="small" @click="sendData = {}">
                        <Icon type="refresh"></Icon>
                    </Button>
                    <JsonEditor :value.sync="sendData"></JsonEditor>
                </Card>
                <CodeCard :data="sendData"></CodeCard>
            </Col>
            <Col span="18">
                <CodeCard :data="res" title="返回结果"></CodeCard>
            </Col>
        </Row>
    </div>
</template>

<script>
// 库
import { axiosToken, axiosErrorHandler } from '@/plugins/axios.js';
import Cookies from 'js-cookie';
// 从登陆页面获取数据源
import loginPage from '@/views/modules/login/login.vue'
export default {
    data () {
        return {
            url: '/a/config/eliminationReason',
            method: 'get',
            sendData: {
                pageNo: 1,
                pageSize: 10
            },
            res: {}
        };
    },
    computed: {
        baseUrl () {
            return Cookies.get('baseURL');
        }
    },
    methods: {
        go () {
            this.$Message.info('开始请求数据');
            axiosToken({
                url: this.url,
                method: this.method,
                data: this.sendData
            })
            .then(res => {
                this.res = res;
                this.$Message.success('数据请求成功');
            })
            .catch(error => {
                axiosErrorHandler(error);
            });
        },
        open () {
            window.open(this.url, '_blank');
        }
    }
};
</script>
