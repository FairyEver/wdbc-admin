<template>
    <div>
        <Upload
            type="drag"
            v-bind="$attrs"
            :data="{ type: type }"
            :on-success="handleSuccess"
            :on-error="handleError"
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
                <Button @click="download">
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
        <Vtable ref="vtable" v-bind="table" v-show="table.data.length > 0"></Vtable>
    </div>
</template>

<script>
import Cookies from 'js-cookie';
import { axiosToken, axiosErrorHandler } from '@/plugins/axios.js';
export default {
    props: {
        name: {
            default: ''
        },
        downloadUrl: {
            default: ''
        },
        type: {
            default: 7
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
            table: {
                columns: [
                    {title: '品系', key: 'strain'},
                    {title: '世代', key: 'gen'},
                    {title: '身份号', key: 'identityNumber'},
                    {title: '淘汰原因', key: 'eliminateDescribe'}
                ],
                data: []
            }
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
        download () {
            window.open(this.baseUrl + this.downloadUrl + '?token=' + Cookies.get('token'));
        },
        handleSuccess (res, file) {
            this.$Message.success('上传成功');
            if (res.code === 0) {
                this.msg = res.msg;
            }
        },
        handleError (error, file, fileList) {
            this.$Message.error('上传失败');
        },
        ok () {
            // 清空信息
            this.submitRes = '';
            // 开始提交
            axiosToken({
                url: this.submitUrl,
                data: {
                    filePath: this.msg,
                    type: this.type
                }
            })
            .then(res => {
                // this.submitRes = res.data.msg
                if (res.data.code === 0) {
                  this.table.data = res.data.results
                }

            })
            .catch(error => {
                axiosErrorHandler(error)
            });
        }
    }
}
</script>
