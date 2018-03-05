<template>
    <section>
        <Form ref="searchForm" label-position="top" inline>
            <FormItem label="方案名称"><Input type="text" v-model="searchForm.name" placeholder="name"></Input></FormItem>
            <FormItem label="搜索"><Button type="primary" @click="search"><Icon type="search"></Icon></Button></FormItem>
            <FormItem label="新增"><Button type="ghost" @click="add"><Icon type="plus"></Icon></Button></FormItem>
        </Form>
        <Alert v-if="putMsg.length !== 0" closable @on-close="putMsg = []"><p v-for="(msg, index) in putMsg" :key="index">{{msg}}</p></Alert>
        <XTable :loading="table.loading" :columns="table.columns" :columns-extend="table.columnsExtend" :data="table.data" @emit="tableHandler"></XTable>
        <PageList :current="page.current" :total="page.total" :page-size="page.size" @change="pageChangeHandler"></PageList>
        <!-- 生成 -->
        <Modal v-model="putModal" width="300" @on-cancel="putLoading = false">
            <p slot="header" style="text-align: center;">生成代码</p>
            <div style="text-align:center"><p>{{replaceFile ? '将会替换现有文件' : '不会替换现有文件'}}</p><br><p><i-switch v-model="replaceFile"></i-switch></p></div>
            <div slot="footer"><Button :type="replaceFile ? 'warning' : 'success'" size="large" long @click="putStart" :loading="putLoading">生成{{replaceFile ? ' ( 替换现有文件 )' : ''}}</Button></div>
        </Modal>
    </section>
</template>

<script>
// 插件
import { axiosToken, axiosErrorHandler } from '@/plugins/axios.js';
// mixin
import list from '@/mixin/list.js';
// 组件
import XTable from '@/components/table/table.vue';
// name
const nameInRouter = 'gen-scheme';
export default {
    name: nameInRouter,
    mixins: [
        list
    ],
    components: {
        XTable
    },
    data () {
        return {
            // 设置
            setting: {
                // 本页的名字 和路由name对应
                myName: nameInRouter,
                // 此列表页对应的表单页路由name
                brotherName: 'gen-scheme-form',
                // 数据接口
                API: '/a/gen/genScheme',
                // 表单数据的获取方式
                formDataGetWay: 'new'
            },
            // 搜索表单
            searchForm: {
                name: ''
            },
            // 表格
            table: {
                columns: [
                    {title: '方案名称', key: 'name'},
                    {title: '生成模块', key: 'packageName'},
                    {title: '模块名', key: 'moduleName'},
                    {title: '功能名', key: 'functionName'},
                    {title: '功能作者', key: 'functionAuthor'}
                ],
                columnsExtend: [
                    {
                        width: 200,
                        children: [
                            {action: 'edit', text: '修改'},
                            {action: 'delete', text: '删除'},
                            {action: 'put', text: '生成'}
                        ]
                    }
                ]
            },
            // 这个页面独有的
            putModal: false,
            putRow: {},
            replaceFile: false,
            putLoading: false,
            putMsg: []
        };
    },
    methods: {
        put (row, id) {
            // 响应每行最后的生成按钮
            console.log(row);
            this.putRow = row;
            this.putModal = true;
        },
        putStart () {
            this.putLoading = true;
            // 提交生成
            axiosToken({
                url: '/a/gen/genScheme/generate',
                method: 'post',
                data: {
                    id: this.putRow.id,
                    replaceFile: this.replaceFile
                }
            }).then(res => {
                this.putModal = false;
                this.putLoading = false;
                this.putMsg = res.data.msg.split('<br/>');
            }).catch(error => axiosErrorHandler(error));
        }
    }
};
</script>
