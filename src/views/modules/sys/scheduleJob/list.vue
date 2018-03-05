<template>
    <section>
        <Form ref="searchForm" label-position="top" inline>
            <FormItem label="新增"><Button type="ghost" @click="add"><Icon type="plus"></Icon></Button></FormItem>
        </Form>
        <XTable :loading="table.loading" :columns="table.columns" :columns-extend="table.columnsExtend" :data="table.data" @emit="tableHandler"></XTable>
        <PageList :current="page.current" :total="page.total" :page-size="page.size" @change="pageChangeHandler"></PageList>
    </section>
</template>

<script>
// 库
import { axiosToken, axiosErrorHandler } from '@/plugins/axios.js';
// mixin
import list from '@/mixin/list.js';
// 组件
import XTable from '@/components/table/table.vue';
// name
const nameInRouter = 'sys-schedule-job';
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
                brotherName: 'sys-schedule-job-form',
                // 数据接口
                API: '/a/job/scheduleJob'
            },
            // 搜索表单
            searchForm: {
                // label: '',
                // type: '',
                // description: ''
            },
            // 表格
            table: {
                columns: [
                    {title: '任务名称', key: 'jobName'},
                    {title: 'bean名称', key: 'beanName'},
                    {title: '方法名称', key: 'methodName'},
                    {title: '参数', key: 'params'},
                    {title: 'cron表达式', key: 'cronExpression'},
                    {title: '备注', key: 'remarks'},
                    {title: '状态', key: '_status'}
                ],
                columnsExtend: [
                    {
                        width: 200,
                        children: [
                            {action: 'resume', icon: 'play'},
                            {action: 'pause', icon: 'pause'},
                            // {action: 'run', icon: 'arrow-right-a'},
                            {action: 'edit', icon: 'edit'},
                            {action: 'delete', icon: 'trash-a'}
                        ]
                    }
                ]
            }
        };
    },
    methods: {
        resume (row, id) {
            if (row.status === 0) {
                this.$Message.error('状态已经为正常！')
            } else {
                this.syncAction(row.jobId, 'resume');
            }
        },
        pause (row, id) {
            if (row.status === 1) {
                this.$Message.error('状态已经为暂停！')
            } else {
                this.syncAction(row.jobId, 'pause');
            }
        },
        // run (row, id) {
        //     this.syncAction(row.jobId, 'run');
        // },
        syncAction (jobId, url) {
            axiosToken({
                url: `/a/job/scheduleJob/${jobId}/${url}`,
                method: 'post'
            }).then(res => {
                this.syncTableData();
            }).catch(error => axiosErrorHandler(error));
        },
        dataTransformer (data) {
            // [可选] 请求到的数据可以在这里转换后再传递给表格
            if (data) {
                return data.map(e => {
                    return {
                        ...e,
                        _status: e.status === 0 ? '正常' : '暂停'
                    };
                });
            };
        }
    }
};
</script>
