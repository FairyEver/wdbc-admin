<template>
    <div>
        <LayoutHeader title="品系指标"></LayoutHeader>
        <Form ref="searchForm" :model="searchForm" :rules="rules" label-position="top" inline>
            <FormItem prop="strain" label="品系">
                <StrainSelect
                    :value.sync="searchForm.strain">
                </StrainSelect>
            </FormItem>
            <FormItem prop="gen" label="世代">
                <Input style="width: 100px" type="text" v-model="searchForm.gen" placeholder="世代"></Input>
            </FormItem>
            <FormItem prop="breedingPoint" label="选育点">
                <Input style="width: 100px" type="text" v-model="searchForm.breedingPoint" placeholder="选育点"></Input>
            </FormItem>
            <FormItem prop="sex" label="性别">
                <RadioGroup v-model="searchForm.sex">
                    <Radio :label="1">公</Radio>
                    <Radio :label="2">母</Radio>
                </RadioGroup>
            </FormItem>
            <FormItem label="搜索">
                <Button type="primary" @click="search('searchForm')"><Icon type="search"></Icon></Button>
            </FormItem>
        </Form>
        <Vtable
            ref="vtable"
            v-bind="table">
        </Vtable>
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
                    {title: '指标名称', key: 'name'},
                    {title: '指标ID', key: 'indexId'},
                    {title: '指标属性', key: 'indexAttr'},
                    {title: '指标类型', key: '_type'},
                    {title: '是否默认显示', key: '_display'}
                ],
                data: [],
                loading: false
            },
            searchForm: {
                strain: '',
                gen: '',
                breedingPoint: '',
                sex: 1
            },
            rules: {
                strain: [{required: true, message: '必填', trigger: 'change'}],
                gen: [{required: true, message: '必填', trigger: 'blur'}]
            }
        }
    },
    methods: {
        search (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.syncTableData();
                } else {
                    this.$Message.error('请先输入搜索项');
                }
            })
        },
        syncTableData () {
            this.table.loading = true;
            axiosToken({
                url: '/a/pickout/pickoutStrainIndex',
                data: {
                    strain: this.searchForm.strain,
                    gen: this.searchForm.gen,
                    breedingPoint: this.searchForm.breedingPoint,
                    sex: this.searchForm.sex
                }
            }).then(res => {
                console.log(res.data)
                this.table.data = res.data.list.map(e => {
                    return {
                        ...e,
                        _type: e.type === 1 ? '数值型' : '字符型',
                        _display: e.display === 1 ? '显示' : '不显示'
                    }
                });
                this.table.loading = false;
            }).catch(error => {
                this.table.loading = false;
                axiosErrorHandler(error)
            });
        }
    }
}
</script>
