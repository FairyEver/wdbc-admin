<template>
    <div>

        <LayoutHeader title="群淘"></LayoutHeader>

        <Form ref="searchForm" :model="searchForm" :rules="rules" label-position="top" inline>
            <FormItem prop="strain" label="品系">
                <StrainSelect :value.sync="searchForm.strain"></StrainSelect>
            </FormItem>
            <FormItem prop="gen" label="世代">
                <Input type="text" v-model="searchForm.gen" placeholder="世代" style="width: 60px;"></Input>
            </FormItem>
            <!-- <FormItem prop="farmId" label="场">
                <FarmSelect :value.sync="searchForm.farmId"></FarmSelect>
            </FormItem> -->
            <FormItem prop="id" label="栋号">
                <TreeBuilding :value.sync="searchForm.id" :mustChild="true"></TreeBuilding>
            </FormItem>
            <FormItem label="查询">
                <Button @click="syncTableData()"><Icon type="search"></Icon></Button>
            </FormItem>
        </Form>

        <LayoutTableCard>
            <Form inline slot="title">
                <FormItem style="margin-bottom: 0px;">
                    <Button :disabled="selection.length == 0" type="primary" @click="save">淘汰</Button>
                </FormItem>
            </Form>
            <div>
                <Vtable
                    ref="vtable"
                    v-bind="table"
                    @on-selection-change="selectChangeHandler">
                </Vtable>
                <div style="margin: 10px;">
                    <PageList
                         :current="page.current"
                        :total="page.total"
                        :page-size="page.size"
                        @change="pageChangeHandler">
                    </PageList>
                </div>
            </div>
        </LayoutTableCard>

    </div>
</template>

<script>
// 插件
import { axiosToken, axiosErrorHandler } from '@/plugins/axios.js';
// mixin
import formValidate from '@/mixin/formValidate.js';
import business from '@/mixin/business.js';

export default {
    mixins: [
        formValidate,
        business
    ],
    data () {
        return {
            searchForm: {
                strain: 'Y1', // 品系
                gen: '15', // 世代
                // farmId: '2ba102404f3b4c4fbbadb1acb919e6f9', // 鸡场
                id: '5c0d4988f3fc42aeb60e7c0a87b04c5f' // 栋号 
            },
            rules: {
                strain: [{required: true, message: '必填', trigger: 'change'}],
                gen: [{required: true, message: '必填', trigger: 'blur'}],
                // farmId: [{required: true, message: '必填', trigger: 'change'}],
                id: [{required: true, message: '必填', trigger: 'change'}]
            },
            table: {
                columns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {title: '品系', key: 'strain'},
                    {title: '世代', key: 'gen'},
                    {title: '存栏数', key: 'count'}
                ],
                data: [],
                loading: false
            },
            // 已经选择的项
            selection: []
        }
    },
    methods: {
        // 选择项变化的时候触发
        selectChangeHandler (selection) {
            this.selection = selection;
        },
        // 搜索
        syncTableData () {
            // 搜索表单没有通过校验
            if (!this.tryFormValidate('searchForm')) {
                return;
            };
            // 开始请求数据
            this.table.loading = true;
            this.table.data = [];
            axiosToken({
                url: '/a/chicken/chicken/groupEliminateList',
                data: {
                    strain: this.searchForm.strain,
                    gen: this.searchForm.gen,
                    // farmId: this.searchForm.farmId,
                    id: this.searchForm.id,
                    // 分页相关
                    pageNo: this.page.current,
                    pageSize: this.page.size
                }
            }).then(res => {
                // 表格数据
                let page = res.data.page
                if (!page.list) {
                    this.$Message.error('没有数据');
                    this.resetPage();
                    this.table.loading = false;
                    return;
                }
                this.table.data = page.list.map(e => ({
                    hax: e.hax, // 批次 不显示 提交用
                    strain: e.strain, // 笼号
                    gen: e.gen, // 翅号
                    count: e.count // 栋 name
                }));
                // 分页设置
                this.page.current = page.pageNo;
                this.page.total = page.total;
                this.page.size = page.pageSize;
                // 结束
                this.table.loading = false;
            }).catch(error => axiosErrorHandler(error));
        },
        save () {
            let hax = this.selection.map(e => e.hax);
            axiosToken({
                url: '/a/chicken/chicken/groupEliminate',
                method: 'post',
                data: hax
            }).then(res => {
                if (res.data.code === 0) {
                    this.$Message.success(res.data.msg);
                    this.page.current = 1;
                    this.selection = [];
                    this.syncTableData();
                } else {
                    this.$Message.error(res.data.msg);
                }
            }).catch(error => axiosErrorHandler(error));
        }
    }
}
</script>