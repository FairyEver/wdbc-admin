<template>
    <Card dis-hover>
        <div slot="title">
            <Input v-model="url">
                <span slot="prepend">{{`上传地址：${baseUrl}`}}</span>
            </Input>
        </div>
        <Upload
            :action="uploadAction"
            :headers="uploadHeaders"
            :data="uploadData"
            :on-success="handleSuccess">
            <Button type="primary" icon="ios-cloud-upload-outline">上传文件 token: {{uploadHeaders.token}}</Button>
        </Upload>
        <Input v-model="res">
            <span slot="prepend">返回结果，如果没东西赶紧看控制台吧！</span>
        </Input>
    </Card>
</template>

<script>
// 库
import Cookies from 'js-cookie';

export default {
    data () {
        return {
            url: '/a/uploadFile',
            res: '',
            uploadData: {
                type: '1'
            }
        };
    },
    computed: {
        baseUrl () {
            return Cookies.get('baseURL');
        },
        uploadAction () {
            return this.baseUrl + this.url
        },
        uploadHeaders () {
            return {
                token: Cookies.get('token')
            }
        }
    },
    methods: {
        handleSuccess (res, file) {
            this.$Message.success('上传成功');
            this.$Message.success(String(res));
            this.res = String(res);
        }
    }
};
</script>
