<template>
    <div>
        <Row>
            <Col span="24">
                <Form ref="searchForm" label-position="top" inline>
                    <FormItem prop="office.id" label="部门名称">
                        <TreeOffice :value.sync="searchForm.office.id"></TreeOffice>
                    </FormItem>
                    <FormItem prop="company.id" label="公司名称">
                        <TreeOffice :value.sync="searchForm.company.id"></TreeOffice>
                    </FormItem>
                    <FormItem prop="loginName" label="登录名">
                        <Input type="text" v-model="searchForm.loginName" placeholder="loginName"></Input>
                    </FormItem>
                    <FormItem prop="no" label="工号">
                        <Input type="text" v-model="searchForm.no" placeholder="no"></Input>
                    </FormItem>
                    <FormItem prop="mobile" label="手机号">
                        <Input type="text" v-model="searchForm.mobile" placeholder="mobile"></Input>
                    </FormItem>
                    <FormItem prop="name" label="姓名">
                        <Input type="text" v-model="searchForm.name" placeholder="name"></Input>
                    </FormItem>
                    <FormItem prop="userType" label="类型" style="width:150px;">
                        <DictSelect :value.sync="searchForm.userType" type="sys_user_type"></DictSelect>
                    </FormItem>
                    <FormItem label="搜索"><Button type="primary" @click="search"><Icon type="search"></Icon></Button></FormItem>
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
                <XTable
                    :loading="table.loading"
                    :columns="table.columns"
                    :columns-extend="table.columnsExtend"
                    :data="table.data"
                    @emit="tableHandler">
                </XTable>
                <PageList :current="page.current" :total="page.total" :page-size="page.size" @change="pageChangeHandler"></PageList>
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
import XTable from '@/components/table/table.vue';
// name
const nameInRouter = 'sys-user';
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
            officeKeyword: '',
            treeData: [],
            treeDataFilter: [],
            // 设置
            setting: {
                // 本页的名字 和路由name对应
                myName: nameInRouter,
                // 此列表页对应的表单页路由name
                brotherName: 'sys-user-form',
                // 数据接口
                API: '/a/sys/user',
                // 表单数据的获取方式
                formDataGetWay: 'new'
            },
            // 搜索表单
            searchForm: {
                office: {
                    id: ''
                },
                company: {
                    id: ''
                },
                loginName: '',
                no: '',
                mobile: '',
                name: '',
                userType: ''
            },
            // 表格
            table: {
                columns: [
                    {title: '隶属机构', key: '_companyName'},
                    {title: '用户类型', key: '_userType'},
                    {title: '姓名', key: 'name'},
                    {title: '工号', key: 'no'},
                    {title: '手机', key: 'mobile'},
                    {title: '登录名', key: 'loginName'}
                ],
                columnsExtend: [
                    {
                        width: 140,
                        children: [
                            {action: 'edit', text: '修改', p: 'sys:user:edit'},
                            {action: 'delete', text: '删除'}
                        ]
                    }
                ],
                // 表格数据转换用的字典 这个数据需要在表格数据请求之前加载完成
                dataTransformOptionDictSetting: [
                    {
                        name: 'dataScope',
                        API: '/a/fns/getDictList',
                        data: {
                            type: 'sys_user_type'
                        }
                    }
                ]
            }
        };
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
        editUser (row, id) {
            // 响应每行最后的分配按钮
            let _result = {
              id: row.id,
            }
            this.edit(_result);
        },
        dataTransformer (data) {
            // [可选] 请求到的数据可以在这里转换后再传递给表格
            let dataScope = this.table.dataTransformOptionDict.dataScope || [];
            if (data) {
                return data.map(e => {
                    let dataScopeFind = dataScope.find(s => s.value === e.userType);
                    return {
                        ...e,
                        _companyName: e.company.name ? e.company.name : '',
                        _userType: dataScopeFind ? dataScopeFind.label : ''
                    };
                });
            };
        },
        refreshOffice () {
            if (this.officeKeyword === '') {
                return;
            }
            this.officeKeyword = '';
            this.$refs.ztree.destroy();
            this.treeDataFilter = this.treeData;
            this.$refs.ztree.init();
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
            this.setting.API = `/a/sys/user?id=${treeNode.id}`
            this.syncTableData();
        }
    }
}
</script>
