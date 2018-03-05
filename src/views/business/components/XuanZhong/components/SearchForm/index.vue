<template>
    <Card dis-hover style="margin-bottom: 10px;">
        <Alert>
            第{{stage}}选育点
            <template v-if="grade !== 0">等级标记 {{grade}}</template>
        </Alert>
        <Form :model="searchForm" label-position="top" inline>
            <FormItem style="margin-bottom: 0px;" label="品系">
                <StrainSelect :value.sync="searchForm.strain"></StrainSelect>
            </FormItem>
            <FormItem style="margin-bottom: 0px;" label="世代">
                <Input style="width: 100px" type="text" v-model="searchForm.gen" placeholder="世代"></Input>
            </FormItem>
            <FormItem style="margin-bottom: 0px;" label="性别">
                <DictRadio :value.sync="searchForm.sex" type="sex"></DictRadio>
            </FormItem>
            <FormItem v-if="stage === 1 || stage === 2" style="margin-bottom: 0px;" label="用途">
                <DictSelect :value.sync="searchForm.use" :options="Z007options" :filterable="false" style="width: 160px;"></DictSelect>
            </FormItem>
            <FormItem v-if="stage === 3" style="margin-bottom: 0px;" label="选种用途">
                <DictSelect :value.sync="searchForm.breedingUse" type="Z008" :filterable="false" style="width: 100px;"></DictSelect>
            </FormItem>
            <FormItem v-if="stage === 3" style="margin-bottom: 0px;" label="批次">
                <Input style="width: 100px" type="text" v-model="searchForm.hax" placeholder="批次"></Input>
            </FormItem>
            <FormItem style="margin-bottom: 0px;" label="载入数据">
                <Button type="primary" @click="loadData"><Icon type="search"></Icon></Button>
            </FormItem>
        </Form>
    </Card>
</template>

<script>
import { axiosToken, axiosErrorHandler } from '@/plugins/axios.js'
import Mock from 'mockjs'
export default {
    props: {
        // 第几个选育点
        stage: {
            type: Number,
            required: false,
            default: 1
        },
        // 等级标记 只有在第一选育点的时候用到
        grade: {
            type: Number,
            required: false,
            default: 0 // 21
        }
    },
    data () {
        return {
            searchForm: {
                strain: 'Y1',
                gen: '15',
                sex: '2',
                use: '00b9e42ca7b544d19b08adce4b98ca1c',
                breedingUse: 'Z1',
                hax: '01,02'
            },
            Z007options: []
        }
    },
    created () {
        this.getOptions()
    },
    computed: {
        // 外界取值用
        setting () {
            return {
                ...this.searchForm,
                stage: this.stage,
                grade: this.grade
            }
        }
    },
    methods: {
        // Z007字典
        getOptions () {
            // 需要请求options
            axiosToken({
                url: '/a/config/chickenUse/list'
            }).then(res => {
                this.list = res.data.list
                const options = this.list.map(e => ({
                    value: e.id,
                    label: e.name
                }))
                this.Z007options = options
            }).catch(error => axiosErrorHandler(error))
        },
        // 载入数据
        loadData () {
            axiosToken({
                url: '/a/analyze/individualValue',
                data: {
                    strainGen: this.searchForm.strain + this.searchForm.gen, // 品系世代
                    sex: this.searchForm.sex, // 性别
                    stage: this.stage, // 第几个选育点
                    ...(this.stage === 1 || this.stage === 2) ? {use: this.searchForm.use} : {}, // 用途 只有第一第二个选育点有
                    ...this.stage === 3 ? {breedingUse: this.searchForm.breedingUse} : {}, // 选种用途 只有第三个选育点有
                    ...this.stage === 3 ? {hax: this.searchForm.hax} : {}, // 批次 只有第三个选育点有
                    ...this.stage === 1 ? {grade: this.grade} : {} // 选种用途 3 21 只有第一个选育点有
                }
            }).then(res => {
                this.$emit('submit', res.data.list)
            }).catch(error => axiosErrorHandler(error))
        }
    }
}
</script>

