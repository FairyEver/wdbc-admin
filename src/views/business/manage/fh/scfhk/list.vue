<template>
    <div>
        <LayoutHeader title="生成孵化库"></LayoutHeader>
        <Form ref="searchForm" :model="searchForm" :rules="rules" label-position="top" inline>
            <FormItem prop="strain" label="品系">
                <StrainSelect
                    :value.sync="searchForm.strain">
                </StrainSelect>
            </FormItem>
            <FormItem prop="gen" label="世代">
                <Input style="width: 100px" type="text" v-model="searchForm.gen" placeholder="世代"></Input>
            </FormItem>
            <FormItem prop="use" label="用途">
                <ChickenUseSelect
                    :value.sync="searchForm.use">
                </ChickenUseSelect>
            </FormItem>
            <FormItem label="搜索">
                <Button type="primary" @click="search('searchForm')"><Icon type="search"></Icon></Button>
            </FormItem>
            <FormItem v-show="isEmptyData" label="生成孵化库">
                <Button type="primary" @click="createFhk"><Icon type="plus"></Icon></Button>
            </FormItem>
        </Form>
        <Vtable
            ref="vtable"
            v-bind="table">
        </Vtable>
        <PageList :current="page.current" :total="page.total" :page-size="page.size" @change="pageChangeHandler"></PageList>
    </div>
</template>

<script>
// 库
import { axiosToken, axiosErrorHandler } from '@/plugins/axios.js';
// mixin
import business from '@/mixin/business.js';
export default {
    mixins: [
        business
    ],
    data () {
        return {
            table: {
                columns: [
                    {title: '品系', key: 'strain'},
                    {title: '世代', key: 'gen'},
                    {title: '家系号', key: 'pen'},
                    {title: '父亲身份ID', key: 'did'},
                    {title: '小家系号', key: 'smallPen'},
                    {title: '母亲身份ID', key: 'sid'}
                ],
                data: [],
                loading: false
            },
            searchForm: {
                strain: '',
                gen: '',
                use: null
            },
            rules: {
                strain: [{required: true, message: '必填', trigger: 'change'}],
                gen: [{required: true, message: '必填', trigger: 'blur'}],
                use: [{required: true, type: 'object', message: '必填', trigger: 'change'}]
            },
            isEmptyData: false
        };
    },
    methods: {
        search (name) {
            this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.resetPage();
                        this.syncTableData();
                    } else {
                        this.$Message.error('请先输入搜索项');
                    }
            });
        },
        createFhk () {
            this.table.loading = true;
            axiosToken({
                url: '/a/hatch/hatchMain/addHatchMain',
                method: 'post',
                data: {
                    strain: this.searchForm.strain,
                    gen: this.searchForm.gen,
                    useId: this.searchForm.use ? this.searchForm.use.id : '',
                    optUse: this.searchForm.use ? this.searchForm.use.sourceSelectionUse : ''
                }
            }).then(res => {
                if (res.data.code === 0) {
                    this.isEmptyData = false;
                    this.resetPage();
                    this.syncTableData();
                }
            }).catch(error => {
                this.table.loading = false;
                return axiosErrorHandler(error);
            });
        },
        syncTableData () {
            this.table.loading = true;
            axiosToken({
                url: '/a/hatch/hatchMain',
                data: {
                    strain: this.searchForm.strain,
                    gen: String(Number(this.searchForm.gen) + 1),
                    useId: this.searchForm.use ? this.searchForm.use.id : '',
                    pageNo: this.page.current,
                    pageSize: this.page.size
                }
            }).then(res => {
                if (res.data.page.list) {
                    this.table.data = res.data.page.list;
                    this.isEmptyData = false;
                } else {
                    this.table.data = [];
                    this.isEmptyData = true;
                }
                this.page.total = res.data.page.total;
                this.table.loading = false;
            }).catch(error => {
                this.table.loading = false;
                axiosErrorHandler(error)
            });
        }
    }
};
</script>
