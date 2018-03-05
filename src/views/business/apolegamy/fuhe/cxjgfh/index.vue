<template>
    <div>
        <LayoutHeader title="复核初选结果"></LayoutHeader>
        <Form ref="searchForm" :model="searchForm" :rules="rules" label-position="top" inline>
            <FormItem prop="strain" label="品系">
                <StrainSelect
                    :value.sync="searchForm.strain">
                </StrainSelect>
            </FormItem>
            <FormItem prop="gen" label="世代">
                <Input style="width: 100px" type="text" v-model="searchForm.gen" placeholder="世代"></Input>
            </FormItem>
            <FormItem prop="purpose" label="选种用途">
                <DictSelect :value.sync="searchForm.purpose" type="Z008"></DictSelect>
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
        <LayoutTableCard>
            <Form inline slot="title">
                <FormItem style="margin-bottom: 0px;">
                    <Input disabled type="text" v-model="tableForm.strain" style="width: 100px;">
                        <span slot="prepend">品系</span>
                    </Input>
                </FormItem>
                <FormItem style="margin-bottom: 0px;">
                    <Input disabled type="text" v-model="tableForm.gen" style="width: 100px;">
                        <span slot="prepend">世代</span>
                    </Input>
                </FormItem>
                <FormItem v-show="table.data.length > 0">
                    <Button type="success" @click="eliminateSubmit">保存淘汰</Button>
                </FormItem>
            </Form>
            <Vtable
                ref="vtable"
                v-bind="table"
                @change="vTableChangeHandler">
            </Vtable>
        </LayoutTableCard>
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
                    {title: '身份ID', key: 'identity'},
                    {title: '淘汰描述', key: 'eliminateDescribe', control: 'Input', style: { width: "200px"}},
                    {title: '标记淘汰', key: 'eliminate', control: 'i-switch', props:{trueValue: true, falseValue: false}}
                ],
                data: [],
                loading: false
            },
            searchForm: {
                strain: '',
                gen: '',
                purpose: '',
                sex: '1'
            },
            rules: {
                strain: [{required: true, message: '必填', trigger: 'change'}],
                gen: [{required: true, message: '必填', trigger: 'blur'}]
            },
            tableForm: {
                strain: '',
                gen: ''
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
            });
        },
        eliminateSubmit () {
            this.table.loading = true;
            axiosToken({
                url: '/a/recheck/saveRecheckResult',
                method: 'post',
                data: this.$refs.vtable.dataCopy

            }).then(res => {
                this.table.loading = false;
                if (res.data.code === 0) {
                    this.$Message.success(res.data.msg);
                } else {
                    this.$Message.error(res.data.msg);
                }
            }).catch(error => {
                this.table.loading = false;
                axiosErrorHandler(error)
            });
        },
        syncTableData () {
            this.table.loading = true;
            axiosToken({
                url: '/a/recheck/getRecheckResult',
                data: {
                    strain: this.searchForm.strain,
                    gen: this.searchForm.gen,
                    sex: this.searchForm.sex,
                    purpose: this.searchForm.purpose
                }
            }).then(res => {
                let rowMaker = ({
                    id = '',
                    strain = this.searchForm.strain,
                    gen = this.searchForm.gen,
                    isNewRecord = '',
                    createDate = '',
                    updateDate = '',
                    delFlag = '',
                    identity = '',
                    breedingPoint = '',
                    sex = '',
                    rate = '',
                    optUse = '',
                    eliminateDescribe = '',
                    type = '',
                    eliminate = ''
                }) => ({
                    id,
                    strain,
                    gen,
                    isNewRecord,
                    createDate,
                    updateDate,
                    delFlag,
                    identity,
                    breedingPoint,
                    sex,
                    rate,
                    optUse,
                    eliminateDescribe,
                    type,
                    eliminate
                })
                let results = res.data.results;
                this.table.data = results.map(e => rowMaker(e));
                this.tableForm.strain = this.searchForm.strain;
                this.tableForm.gen = this.searchForm.gen;
                this.table.loading = false;
            }).catch(error => {
                this.table.loading = false;
                axiosErrorHandler(error)
            });
        },
        vTableChangeHandler ({row, key, value}) {
            if (value === false || this.$refs.vtable.dataCopy[row].type !== 0) return;
            this.$refs.vtable.dataCopy[row].type = 7;
        }
    }
}
</script>
