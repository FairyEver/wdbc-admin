<template>
    <div>
        <Row>
            <Col span="24">
                <Form ref="searchForm" label-position="top" inline>
                    <FormItem label="新增"><Button type="ghost" @click="add"><Icon type="plus"></Icon></Button></FormItem>
                </Form>
            </Col>
        </Row>
        <Row :gutter="16">
            <Col span="6">
                <Card dis-hover :bordered="false">
                    <p slot="title"><Icon type="briefcase"></Icon> 组织机构</p>
                    <a href="#" slot="extra" @click.prevent="refreshOffice"><Icon type="ios-loop-strong"></Icon> 刷新</a>
                    <div style="margin-bottom:20px;">
                        <Input v-model="officeKeyword" placeholder="输入关键字进行筛选"></Input>
                    </div>
                    <div style="height: 400px; overflow: scroll;">
                        <Ztree
                            ref="ztree"
                            dataMode="data"
                            :treeData="treeDataFilter"
                            :initAfterSync="true"
                            @onClick="zTreeOnClick">
                        </Ztree>
                    </div>
                </Card>
            </Col>
            <Col span="18">
                <tableTree
                    :items='table.data'
                    :columns='table.columns'
                    @on-row-click='rowClick'>
                </tableTree>
                <div style="margin-top:20px;" v-show="table.loading">
                    <Spin>数据加载中...</Spin>
                </div>
            </Col>
        </Row>
    </div>
</template>

<script>
// 库
import { axiosToken, axiosErrorHandler } from '@/plugins/axios.js';
// mixin
import list from '@/mixin/list.js';
// 组件
import tableTree from '@/components/table/tableTree.vue';
// name
const nameInRouter = 'sys-office';
export default {
    name: nameInRouter,
    mixins: [
        list
    ],
    components: {
        tableTree
    },
    data () {
      return {
            officeKeyword: '',
            treeData: [],
            treeDataFilter: [],
            // 设置
            setting: {
                // 本页的名字 和路由name对应
                myName: nameInRouter,
                // 此列表页对应的表单页路由name
                brotherName: 'sys-office-form',
                // 数据接口
                API: `/a/sys/office`
            },
            // 搜索表单
            searchForm: {},
            // 表格
            table: {
                columns: [
                    {title: '机构名称', key: 'name'},
                    {title: '机构编码', key: 'code'},
                    {title: '机构类型', key: '_officeType'},
                    {title: '备注', key: 'remarks'},
                    {
                        title: '操作',
                        type: 'action',
                        align: 'center',
                        actions: [
                            {type: 'primary', text: '修改'},
                            {type: 'ghost', text: '删除'},
                            {type: 'ghost', text: '添加下级机构'}
                        ]
                    }
                ],
                // 表格数据转换用的字典 这个数据需要在表格数据请求之前加载完成
                dataTransformOptionDictSetting: [
                    {
                        name: 'dataScope',
                        API: '/a/fns/getDictList',
                        data: {
                            type: 'sys_office_type'
                        }
                    }
                ]
            }
        }
    },
    mounted () {
        this.getTreeData();
    },
    watch: {
        officeKeyword (value) {
            this.$refs.ztree.destroy();
            this.filterOffice();
        }
    },
    methods: {
        dataTransformer (data) {
            // [可选] 请求到的数据可以在这里转换后再传递给表格
            let dataScope = this.table.dataTransformOptionDict.dataScope || [];
            return data.map(e => {
                let dataScopeFind = dataScope.find(s => s.value === e.type);
                return {
                    ...e,
                    _officeType: dataScopeFind ? dataScopeFind.label : ''
                };
            });
        },
        refreshOffice () {
            this.searchForm = {};
            this.officeKeyword = '';
            this.getTreeData();
        },
        filterOffice () {
            this.treeDataFilter = this.treeData.filter(ele => {
                return ele.name.indexOf(this.officeKeyword) >= 0;
            });
        },
        getTreeData () {
            this.$refs.ztree.destroy();
            axiosToken({
                url: '/a/sys/officeTree'
            }).then(res => {
                this.treeData = res.data;
                this.treeDataFilter = this.treeData;
            }).catch(error => axiosErrorHandler(error));
        },
        zTreeOnClick (event, treeId, treeNode) {
            this.table.data = [];
            this.searchForm.id = treeNode.id;
            this.syncTableData();
        },
        rowClick (result, event, index, text) {
            switch (text) {
                case '修改':
                    this.edit(result, index);
                    break;
                case '删除':
                    this.delete(result, index);
                    break;
                case '添加下级机构':
                    let _result = {
                        parent: {
                            id: result.id,
                            name: result.name
                        }
                    };
                    this.edit(_result, index, 'new');
                    break;
                default:
                    this.$Message.error('事件匹配失败');
                    break;
            }
        }
    }
}
</script>
