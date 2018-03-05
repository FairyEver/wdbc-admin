<template>
    <Card dis-hover class="param-item">
        <span slot="title">
            <Button v-if="currentValue.fixed" size="small" type="success"><Icon type="checkmark-circled"></Icon> 已确定</Button>
            <Button size="small" type="text" style="margin-left: -6px;">{{currentValue.title}} [ {{currentValue.keyName}} ]</Button>
        </span>
        <span slot="extra">
            <Poptip
                confirm
                placement="left"
                title="删除这个条件？"
                @on-ok="$emit('delete')">
                <Button size="small" type="error">
                    <Icon type="reply"></Icon>
                    撤销
                </Button>
            </Poptip>
        </span>
        <!-- 数字 -->
        <Row v-if="currentValue.type === 'Number'">
            <Col span="14">
                <Form :model="currentValue" label-position="top" inline style="margin-bottom: 10px;">
                    <FormItem prop="PEG" label="类型">
                        <RadioGroup v-model="currentValue.PEG" type="button" @on-change="PEGChangeHandler">
                            <Radio label="P" :disabled="radiofixed">表型值</Radio>
                            <Radio label="E" :disabled="radiofixed">育种值</Radio>
                            <Radio label="G" :disabled="radiofixed">基因值</Radio>
                        </RadioGroup>
                    </FormItem>
                    <FormItem prop="param" label="参数">
                        <ParamControlNumber v-model="currentValue.param">
                            <Button :disabled="fixed">设置</Button>
                        </ParamControlNumber>
                    </FormItem>
                    <FormItem prop="selectedNumber" label="入选数量">
                        <Button long :type="currentValue.selectedNumber === null ? 'dashed' : 'success'">
                            <template v-if="currentValue.selectedNumber === null"><Icon type="help-circled"></Icon></template>
                            <template v-else>{{currentValue.selectedNumber}}</template>
                        </Button>
                    </FormItem>
                    <FormItem prop="eliminateNumber" label="淘汰数量">
                        <Button long :type="currentValue.eliminateNumber === null ? 'dashed' : 'warning'">
                            <template v-if="currentValue.eliminateNumber === null"><Icon type="help-circled"></Icon></template>
                            <template v-else>{{currentValue.eliminateNumber}}</template>
                        </Button>
                    </FormItem>
                    <FormItem prop="eliminateProportion" label="淘汰比例">
                        <Button long :type="currentValue.eliminateProportion === null ? 'dashed' : 'warning'">
                            <template v-if="currentValue.eliminateProportion === null"><Icon type="help-circled"></Icon></template>
                            <template v-else>{{currentValue.eliminateProportion}}</template>
                        </Button>
                    </FormItem>
                </Form>
                <Table v-bind="table" :columns="tableColumns" :data="tableData"></Table>
                <div v-if="!fixed" style="text-align: center;">
                    <ButtonGroup size="large" style="margin-top: 16px;">
                        <Button :disabled="computeButtonDisabled" type="ghost" @click="$emit('compute')"><Icon type="calculator"></Icon> 计算</Button>
                        <Button :disabled="fixedButtonDisabled" type="success" @click="$emit('fixed')">
                            进行下一步筛选
                            <Icon type="arrow-right-b"></Icon>
                        </Button>
                    </ButtonGroup>
                </div>
            </Col>
            <Col span="10">
                <div ref="chart1"></div>
                <div ref="chart2"></div>
            </Col>
        </Row>
        <!-- 字符 -->
        <template v-if="currentValue.type === 'String'">
            <Form :model="currentValue" label-position="top" inline>
                <FormItem prop="PEG" label="类型">
                    <RadioGroup v-model="currentValue.PEG" type="button">
                        <Radio label="P" :disabled="radiofixed">表型值</Radio>
                        <Radio label="E" :disabled="radiofixed">育种值</Radio>
                        <Radio label="G" :disabled="radiofixed">基因值</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem prop="param" label="参数">
                    <ParamControlString v-model="currentValue.param">
                        <Button :disabled="fixed">设置</Button>
                    </ParamControlString>
                </FormItem>
                <FormItem prop="selectedNumber" label="入选数量">
                    <Button long :type="currentValue.selectedNumber === null ? 'dashed' : 'success'">
                        <template v-if="currentValue.selectedNumber === null"><Icon type="help-circled"></Icon></template>
                        <template v-else>{{currentValue.selectedNumber}}</template>
                    </Button>
                </FormItem>
                <FormItem prop="eliminateNumber" label="淘汰数量">
                    <Button long :type="currentValue.eliminateNumber === null ? 'dashed' : 'warning'">
                        <template v-if="currentValue.eliminateNumber === null"><Icon type="help-circled"></Icon></template>
                        <template v-else>{{currentValue.eliminateNumber}}</template>
                    </Button>
                </FormItem>
                <FormItem prop="eliminateProportion" label="淘汰比例">
                    <Button long :type="currentValue.eliminateProportion === null ? 'dashed' : 'warning'">
                        <template v-if="currentValue.eliminateProportion === null"><Icon type="help-circled"></Icon></template>
                        <template v-else>{{currentValue.eliminateProportion}}</template>
                    </Button>
                </FormItem>
            </Form>
            <div v-if="!fixed" style="text-align: center;">
                <ButtonGroup size="large" style="margin-top: 16px;">
                    <Button :disabled="computeButtonDisabled" type="ghost" @click="$emit('compute')"><Icon type="calculator"></Icon> 计算</Button>
                    <Button :disabled="fixedButtonDisabled" type="success" @click="$emit('fixed')">
                        进行下一步筛选
                        <Icon type="arrow-right-b"></Icon>
                    </Button>
                </ButtonGroup>
            </div>
        </template>
    </Card>
</template>

<script>
import Chart from "frappe-charts/dist/frappe-charts.min.esm"
import ParamControlNumber from '../ParamControl/Number'
import ParamControlString from '../ParamControl/String'
export default {
    components: {
        ParamControlNumber,
        ParamControlString
    },
    props: {
        value: {
            type: Object,
            required: true
        }
    },
    data () {
        return {
            chart1: null,
            chart2: null,
            currentValue: {},
            table: {
                size: 'small',
                border: true,
                rowClassName: (row, index) => {
                    if (row.PEG === this.currentValue.PEG) {
                        return 'row-highlight';
                    }
                    return '';
                }
            }
        }
    },
    computed: {
        // 此项是否锁定
        fixed () {
            return this.currentValue.fixed
        },
        // 类型选择的项目是否锁定
        radiofixed () {
            return this.currentValue.fixed
        },
        // 计算按钮可用
        computeButtonDisabled () {
            return false
        },
        // 保存按钮可用
        fixedButtonDisabled () {
            return !(this.currentValue.selectedNumber !== null)
        },
        tableData () {
            return [
                this.currentValue.table.P,
                this.currentValue.table.E,
                this.currentValue.table.G
            ]
        },
        // 表格列设置
        tableColumns () {
            return [
                {
                    title: '类型',
                    key: 'name',
                    render: (h, params) => {
                        return h('div', [
                            h('Icon', {
                                style: {
                                    color: params.row.PEG === this.currentValue.PEG ? '#19be6b' : '#e9eaec',
                                    marginRight: '10px'
                                },
                                props: {
                                    type: params.row.PEG === this.currentValue.PEG ? 'android-radio-button-on' : 'android-radio-button-off'
                                }
                            }),
                            h('span', params.row.name)
                        ]);
                    }
                },
                {
                    title: '群体平均值 (' + this.currentValue.unit + ')',
                    key: 'groupAverageValue'
                },
                {
                    title: '群体标准差 (' + this.currentValue.unit + ')',
                    key: 'groupStandardDeviation'
                },
                {
                    title: '入选平均值 (' + this.currentValue.unit + ')',
                    key: 'selectedAverageValue',
                    render: (h, params) => {
                        const tempValue = params.row.selectedAverageValue
                        if (tempValue === null) {
                            return h('div', {
                                style: {
                                    textAlign: 'center'
                                }
                            }, [
                                h('Tag', {
                                    props: {
                                        type: 'border'
                                    }
                                }, '未计算')
                            ]);
                        } else {
                            return h('div', tempValue)
                        }
                    }
                },
                {
                    title: '入选标准差 (' + this.currentValue.unit + ')',
                    key: 'selectedStandardDeviation',
                    render: (h, params) => {
                        const tempValue = params.row.selectedStandardDeviation
                        if (tempValue === null) {
                            return h('div', {
                                style: {
                                    textAlign: 'center'
                                }
                            }, [
                                h('Tag', {
                                    props: {
                                        type: 'border'
                                    }
                                }, '未计算')
                            ]);
                        } else {
                            return h('div', tempValue)
                        }
                    }
                }
            ]
        }
    },
    created () {
        // 内部值等于参数值
        this.currentValue = {...this.value}
    },
    mounted () {
        // 更新图表
        if (this.currentValue.type === 'Number') {
            this.checkNumberChart()
        }
    },
    watch: {
        // 参数值变化了 内部值更新
        value: {
            handler (value) {
                this.currentValue = {...value}
            },
            deep: true
        },
        // 内部的值变化了 要更新到外部
        currentValue: {
            handler (value) {
                if (JSON.stringify(value) !== JSON.stringify(this.value)) {
                    this.$emit('input', this.currentValue)
                }
            },
            deep: true
        },
        // 图表数据变化 只有数值型的的条件才会触发这里
        'currentValue.table' () {
            // 更新图表
            if (this.currentValue.type === 'Number') {
                this.checkNumberChart()
            }
        }
    },
    methods: {
        // 更新图表
        checkNumberChart () {
            const groupAverageValueChecker = (value) => {
                return isNaN(value) ? 0 : value
            }
            const data1 = {
                labels: [
                    '表型值',
                    '育种值',
                    '基因值'
                ],
                datasets: [
                    {
                        title: '群体',
                        values: [
                            this.currentValue.table.P.groupAverageValue,
                            this.currentValue.table.E.groupAverageValue,
                            this.currentValue.table.G.groupAverageValue
                        ]
                    },
                    {
                        title: '入选',
                        values: [
                            this.currentValue.table.P.selectedAverageValue,
                            this.currentValue.table.E.selectedAverageValue,
                            this.currentValue.table.G.selectedAverageValue
                        ]
                    }
                ]
            }
            const data2 = {
                labels: [
                    '表型值',
                    '育种值',
                    '基因值'
                ],
                datasets: [
                    {
                        title: '群体',
                        values: [
                            groupAverageValueChecker(this.currentValue.table.P.groupStandardDeviation),
                            groupAverageValueChecker(this.currentValue.table.E.groupStandardDeviation),
                            groupAverageValueChecker(this.currentValue.table.G.groupStandardDeviation)
                        ]
                    },
                    {
                        title: '入选',
                        values: [
                            groupAverageValueChecker(this.currentValue.table.P.selectedStandardDeviation),
                            groupAverageValueChecker(this.currentValue.table.E.selectedStandardDeviation),
                            groupAverageValueChecker(this.currentValue.table.G.selectedStandardDeviation)
                        ]
                    }
                ]
            }
            // 有图表 更新
            if (this.chart1) {
                this.chart1.update_values(data1.datasets, data1.labels)
            }
            if (this.chart2) {
                this.chart2.update_values(data2.datasets, data2.labels)
            }
            // 没图表 初始化
            if (!this.chart1) {
                this.chart1 = new Chart({
                    parent: this.$refs.chart1,
                    title: '平均值',
                    data: data1,
                    type: 'bar',
                    height: 120,
                    colors: ['#7BD7FD', '#733EE2', '#FFD139'],
                    format_tooltip_y: d => d
                })    
            }
            if (!this.chart2) {
                this.chart2 = new Chart({
                    parent: this.$refs.chart2,
                    title: '标准差',
                    data: data2,
                    type: 'bar',
                    height: 120,
                    colors: ['#7BD7FD', '#733EE2', '#FFD139'],
                    format_tooltip_y: d => d
                })    
            }
        },
        // 三种类型的值切换时触发
        PEGChangeHandler () {
            setTimeout(() => {
                // 如果之前计算过 再重新计算一遍
                if (this.currentValue.selectedNumber !== null) {
                    this.$emit('compute')
                }
            }, 300);
        }
    }
}
</script>

<style lang="less">
.param-item {
    .ivu-form-item {
        margin-bottom: 0px;
    }
    .row-highlight {
        td {
            background-color: #eaf4fe;
        }
    }
    .chart-container {
        .title {
            margin-top: 0px;
        }
        .frappe-chart.graphics {
            margin-top: 5px;
            padding-bottom: 0px;
        }
        .graph-stats-container {
            padding-top: 0px;
        }
    }
}
</style>
