<template>
    <section>
        <Form ref="searchForm" label-position="top" inline>
            <FormItem label="新增"><Button type="ghost" @click="add"><Icon type="plus"></Icon></Button></FormItem>
        </Form>
        <XTable :loading="table.loading" :columns="table.columns" :columns-extend="table.columnsExtend" :data="table.data" @emit="tableHandler"></XTable>
        <Modal v-model="assignSetting.modal.show" title="分配角色" width="1000" @on-ok="assignModalOk">
            <Assign ref="assign"></Assign>
        </Modal>
    </section>
</template>

<script>
// 库
import { axiosToken, axiosErrorHandler } from '@/plugins/axios.js';
// mixin
import list from '@/mixin/list.js';
// 组件
import XTable from '@/components/table/table.vue';
import Assign from './assign.vue';
// name
const nameInRouter = 'sys-role';
export default {
    name: nameInRouter,
    mixins: [
        list
    ],
    components: {
        XTable,
        Assign
    },
    data () {
        return {
            // 设置
            setting: {
                // 本页的名字 和路由name对应
                myName: nameInRouter,
                // 此列表页对应的表单页路由name
                brotherName: 'sys-role-form',
                // 数据接口
                API: '/a/sys/role',
                // 表单数据的获取方式
                formDataGetWay: 'new'
            },
            // 表格
            table: {
                columns: [
                    {title: '角色名称', key: 'name'},
                    {title: '英文名称', key: 'enname'},
                    {title: '归属机构', key: '_officeName'},
                    {title: '数据范围', key: '_dataScope'}
                ],
                columnsExtend: [
                    {
                        width: 200,
                        children: [
                            {action: 'assign', text: '分配', icon: 'person'},
                            {action: 'edit', icon: 'edit'},
                            {action: 'delete', text: '删除', icon: 'trash-a'}
                        ]
                    }
                ],
                // 表格数据转换用的字典 这个数据需要在表格数据请求之前加载完成
                dataTransformOptionDictSetting: [
                    {
                        name: 'dataScope',
                        API: '/a/fns/getDictList',
                        data: {
                            type: 'sys_data_scope'
                        }
                    }
                ]
            },
            // 这个页面独有的[分配角色]
            assignSetting: {
                modal: {
                    show: false
                },
                row: {}
            }
        };
    },
    watch: {
        'assignSetting.modal.show' (value) {
            if (value) {
                // this.$refs.assign.init();
            } else {
                this.$refs.assign.destroy();
            }
        }
    },
    methods: {
        dataTransformer (data) {
            // [可选] 请求到的数据可以在这里转换后再传递给表格
            let dataScope = this.table.dataTransformOptionDict.dataScope || [];
            return data.map(e => {
                let dataScopeFind = dataScope.find(s => s.value === e.dataScope);
                return {
                    ...e,
                    _officeName: e.office.name ? e.office.name : '',
                    _dataScope: dataScopeFind ? dataScopeFind.label : ''
                };
            });
        },
        // 从这以下都是这个页面特有的
        assign (row, id) {
            // 响应每行最后的分配按钮
            this.assignSetting.modal.show = true;
            this.assignSetting.row = row;
            this.$refs.assign.init(row);
        },
        assignModalOk () {
            axiosToken({
                url: '/a/sys/role/' + this.assignSetting.row.id + '/assign/' + this.$refs.assign.selectedUserList.map(e => e.id).join(','),
                method: 'post'
            }).then(res => {
                this.$Message.success('保存成功');
            }).catch(error => axiosErrorHandler(error));
        }
    }
};
</script>

