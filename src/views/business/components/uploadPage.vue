<template>
    <div>
        <Upload
            type="drag"
            v-bind="$attrs"
            :data="{ type: type }"
            :on-success="handlerSuccess"
            :on-error="handlerError"
            :before-upload="handlerBeforeUpload"
            :action="action"
            :headers="uploadHeaders"
            accept=".xlsx">
            <div style="padding: 50px 0">
                <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                <p>
                    <Tag>点击</Tag>
                    或者
                    <Tag>拖拽</Tag>
                    文件到这里来上传 {{name}}
                </p>
            </div>
        </Upload>
        <div>
            <ButtonGroup>
                <Button @click="download(downloadUrl)">
                    <Icon type="android-download"></Icon>
                    下载{{name}}模板
                </Button>
                <Button type="success" :disabled="!(msg && submitUrl)" @click="ok">
                    <Icon type="checkmark-circled"></Icon>
                    确认导入
                </Button>
            </ButtonGroup>
        </div>
        <br>
        <Alert v-if="submitRes">
            <p v-for="(item, index) in submitArray" :key="index">{{item}}</p>
        </Alert>
        <Alert v-if="submitFilePath" @click.native="download(submitFilePath)">
            点击下载带有错误提示的文件 {{baseUrl}}{{submitFilePath}}
        </Alert>
    </div>
</template>

<script>
import Cookies from 'js-cookie';
import { axiosToken, axiosErrorHandlerr } from '@/plugins/axios.js';
export default {
    props: {
        name: {
            default: ''
        },
        downloadUrl: {
            default: ''
        },
        type: {
            default: 1
        },
        actionPath: {
            default: ''
        },
        submitUrl: {
            default: ''
        }
    },
    data () {
        return {
            // 上传成功后返回的地址
            msg: '',
            // 提交结束后返回的字符串
            submitRes: '',
            // 提交结束后返回的路径
            submitFilePath: ''
        }
    },
    computed: {
        baseUrl () {
            return Cookies.get('baseURL');
        },
        action () {
            return this.baseUrl + this.actionPath
        },
        uploadHeaders () {
            return {
                token: Cookies.get('token')
            }
        },
        submitArray () { 
            return this.submitRes.split(' ')
        }
    },
    methods: {
        download (url) {
            window.open(this.baseUrl + url + '?token=' + Cookies.get('token'));
        },
        handlerBeforeUpload () {
            this.$Spin.show()
        },
        handlerSuccess (res, file) {
            this.$Spin.hide()
            this.$Message.success('上传成功');
            if (res.code === 0) {
                this.msg = res.msg;
            }
        },
        handlerError (error, file, fileList) {
            this.$Spin.hide()
            this.$Message.error('上传失败');
        },
        ok () {
            this.$Spin.show()
            // 清空信息
            this.submitRes = '';
            // 开始提交
            axiosToken({
                url: this.submitUrl,
                data: {
                    filePath: this.msg
                }
            })
            .then(res => {
                this.$Spin.hide()
                this.submitRes = res.data.msg || ''
                this.submitFilePath = res.data.filePath || ''
            })
            .catch(error => {
                this.$Spin.hide()
                axiosErrorHandlerr(error)
            });
        }
    }
}
</script>
