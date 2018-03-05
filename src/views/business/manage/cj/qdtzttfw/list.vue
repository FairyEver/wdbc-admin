<style lang="less">
    @import '~@/styles/business.less';
</style>

<template>
    <div>
        <LayoutHeader title="确定体重淘汰范围"></LayoutHeader>
        <Form ref="searchForm" :model="searchForm" :rules="rules" label-position="top" inline>
            <FormItem prop="strain" label="品系">
                <StrainSelect
                    :value.sync="searchForm.strain">
                </StrainSelect>
            </FormItem>
            <FormItem prop="gen" label="世代">
                <Input style="width: 100px" type="text" v-model="searchForm.gen" placeholder="世代"></Input>
            </FormItem>
            <FormItem prop="hax" label="批次">
                <Input style="width: 100px" type="text" v-model="searchForm.hax" placeholder="批次"></Input>
            </FormItem>
            <FormItem prop="sex" label="性别">
                <RadioGroup v-model="searchForm.sex">
                    <Radio :label="1">公</Radio>
                    <Radio :label="2">母</Radio>
                </RadioGroup>
            </FormItem>
            <FormItem prop="startRange" label="开始均匀度范围">
                <Slider v-model="searchForm.startRange"></Slider>
            </FormItem>
            <FormItem prop="endRange" label="结束均匀度范围">
                <Slider v-model="searchForm.endRange" :min="101" :max="200"></Slider>
            </FormItem>
            <FormItem label="搜索"><Button type="primary" @click="search('searchForm')"><Icon type="search"></Icon></Button></FormItem>
        </Form>
        <Card dis-hover>
            <Form inline>
                <FormItem style="margin-bottom: 0px;">
                    <Input :disabled="isEditable" number type="text" v-model="depositColumnNumber" style="width: 120px;">
                        <span slot="prepend">存栏数</span>
                    </Input>
                </FormItem>
                <FormItem style="margin-bottom: 0px;">
                    <Input :disabled="isEditable" number type="text" v-model="planNumber" style="width: 120px;">
                        <span slot="prepend">计划数</span>
                    </Input>
                </FormItem>
                <FormItem style="margin-bottom: 0px;">
                    <Slider :disabled="isEditable" v-model="minMax" range :step="0.5" :min="0" :max="100" style="width: 120px;"></Slider>
                </FormItem>
                <FormItem style="margin-bottom: 0px;">
                    <Input :disabled="isEditable" number type="text" v-model="avg" style="width: 120px;">
                        <span slot="prepend">平均值</span>
                    </Input>
                </FormItem>
                <FormItem style="margin-bottom: 0px;">
                    <Input :disabled="isEditable" number type="text" v-model="selectionEliminationNumber" style="width: 120px;">
                        <span slot="prepend">选种淘汰数</span>
                    </Input>
                </FormItem>
                <FormItem style="margin-bottom: 0px;">
                    <Input :disabled="isEditable" number type="text" v-model="surplusDepositColumnNumber" style="width: 120px;">
                        <span slot="prepend">剩余存栏数</span>
                    </Input>
                </FormItem>
                <FormItem style="margin-bottom: 0px;">
                    <Input :disabled="isEditable" number type="text" v-model="uniformity" style="width: 120px;">
                        <span slot="prepend">均匀度</span>
                        <span slot="append">%</span>
                    </Input>
                </FormItem>
                <FormItem style="margin-bottom: 0px;">
                    <Input :disabled="isEditable" number type="text" v-model="expectTheCageNumber" style="width: 120px;">
                        <span slot="prepend">预期上笼数</span>
                    </Input>
                </FormItem>
                <FormItem v-show="!isEditable" style="margin-bottom: 0px;">
                    <Button @click="submit">
                        保存
                        <Icon type="archive"></Icon>
                    </Button>
                </FormItem>
            </Form>
        </Card>
    </div>
</template>

<script>
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
                hax: '1', // 批次
                sex: 1,
                startRange: 90,
                endRange: 110
            },
            rules: {
                strain: [{required: true, message: '必填', trigger: 'change'}],
                gen: [{required: true, message: '必填', trigger: 'blur'}],
                hax: [{required: true, message: '必填', trigger: 'blur'}]
            },
            listType: 'list',
            depositColumnNumber: null, //存栏数
            planNumber: null, // 计划数
            minMax: [0, 100], //最大最小值
            avg: null, // 平均值
            selectionEliminationNumber: null, // 选种淘汰数
            surplusDepositColumnNumber: null, // 剩余存栏数
            uniformity: null, // 均匀度
            expectTheCageNumber: null // 预期上笼数
        };
    },
    computed: {
        isEditable () {
            return this.listType === 'list' ? true : false
        }
    },
    watch: {
        // 计算剩余存栏数(更改存栏数)
        depositColumnNumber (val, oldVal) {
            this.surplusDepositColumnNumber = val - this.selectionEliminationNumber
        },
        // 计算剩余存栏数(更改选种淘汰数)
        selectionEliminationNumber (val, oldVal) {
            this.surplusDepositColumnNumber = this.depositColumnNumber - val
        },
        // 计算预期上笼数(更改剩余存栏数)
        surplusDepositColumnNumber (val, oldVal) {
            this.expectTheCageNumber = Math.round(val * this.uniformity / 100)
        },
        // 计算预期上笼数(更改均匀度)
        uniformity (val, oldVal) {
            this.expectTheCageNumber = Math.round(this.surplusDepositColumnNumber * val / 100)
        },
        // 计算平均值
        minMax: {
            handler (val, oldVal) {
                this.avg = ((val[0] + val[1]) / 2).toFixed(1)
            },
            deep: true
        }
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
        submit () {
            axiosToken({
                url: '/a/chicken/chickenWeightEliminateRange',
                method: 'POST',
                data: {
                    strain: this.searchForm.strain,
                    gen: this.searchForm.gen,
                    hax: this.searchForm.hax,
                    sex: this.searchForm.sex,
                    planNumber: this.planNumber,
                    depositColumnNumber: this.depositColumnNumber,
                    min: this.minMax[0],
                    max: this.minMax[1],
                    avg: this.avg,
                    selectionEliminationNumber: this.selectionEliminationNumber,
                    uniformity: this.uniformity
                }
            }).then (res => {

            })
        },
        syncTableData () {
            this.depositColumnNumber = null
            this.planNumber = null
            this.minMax = [0, 100]
            this.avg = null
            this.selectionEliminationNumber = null
            this.surplusDepositColumnNumber = null
            this.uniformity = null
            this.expectTheCageNumber = null
            axiosToken({
                url: '/a/chicken/chickenWeightEliminateRange/getChickenWeightEliminateRange',
                data: {
                    strain: this.searchForm.strain,
                    gen: this.searchForm.gen,
                    hax: this.searchForm.hax ? this.searchForm.hax.padStart(2, '0') : '',
                    sex: this.searchForm.sex,
                    startRange: this.searchForm.startRange,
                    endRange: this.searchForm.endRange
                }
            }).then(res => {
                if (res.data.list) {
                    this.listType = 'list'
                    this.depositColumnNumber = res.data.list.depositColumnNumber
                    this.planNumber = res.data.list.planNumber
                    this.minMax = [res.data.list.min, res.data.list.max]
                    this.avg = res.data.list.avg
                    this.selectionEliminationNumber = res.data.list.selectionEliminationNumber
                    this.surplusDepositColumnNumber = res.data.list.surplusDepositColumnNumber
                    this.uniformity = res.data.list.uniformity
                    this.expectTheCageNumber = res.data.list.expectTheCageNumber
                } else {
                    this.listType = 'list1'
                    this.depositColumnNumber = res.data.list1.depositColumnNumber
                    this.minMax = [res.data.list1.min, res.data.list1.max]
                    this.avg = res.data.list1.avg
                    this.selectionEliminationNumber = res.data.list1.selectionEliminationNumber
                    this.surplusDepositColumnNumber = res.data.list1.surplusDepositColumnNumber
                    this.uniformity = res.data.list1.uniformity
                    this.expectTheCageNumber = res.data.list1.expectTheCageNumber
                }
            })
        }
    }
};
</script>
