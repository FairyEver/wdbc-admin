<template>
    <div v-if="data.length > 0" class="unselect-chart">
        <div ref="chart"></div>
        <p style="margin-bottom: 10px;">所有淘汰条件：</p>
        <Alert v-for="(item, index) in reason" :key="index">
            <b>不满足主条件: {{item.main}}</b>
            <ul>
                <li v-for="(sub, subIndex) in item.sub" :key="subIndex">不满足次要条件: {{sub}}</li>
            </ul>
        </Alert>
    </div>
</template>

<script>
import Chart from "frappe-charts/dist/frappe-charts.min.esm"
// mixin
import filterMinin from '../../mixins/filter'
export default {
    mixins: [
        filterMinin
    ],
    props: {
        data: {
            type: Array,
            required: false,
            default: () => []
        },
        params: {
            type: Array,
            required: false,
            default: () => []
        }
    },
    data () {
        return {
            chart: null
        }
    },
    watch: {
        data: {
            handler () {
                this.$nextTick(() => {
                    this.refreshChart()
                })
            },
            deep: true
        }
    },
    mounted () {
        this.refreshChart()
    },
    computed: {
        reason () {
            return this.params.map(e => {
                return {
                    main: e.title + this.chinesePEG(e.PEG) + this.filterSettingToChinese(e.param),
                    sub: e.paramSub.map(sub => {
                        return sub.col.title + this.filterSettingToChinese(sub.filterSetting)
                    })
                }
            })
        }
    },
    methods: {
        refreshChart () {
            if (this.data.length === 0) {
                return
            }
            const data = {
                labels: [
                    '已选',
                    ...this.data.map((e, index) => {
                        return '步骤' + (index + 1)
                    })
                ],
                datasets: [
                    {
                        title: '淘汰数量',
                        values: [
                            this.data[this.data.length - 1].select.pool.length,
                            ...this.data.map(e => {
                                return e.unSelect.pool.length
                            })
                        ]
                    }
                ]
            }
            this.chart = new Chart({
                parent: this.$refs.chart,
                title: '',
                data: data,
                type: 'percentage',
                height: 100,
                colors: ['#19be6b', '#CECECE', '#B7B7B7', '#CECECE', '#B7B7B7', '#CECECE', '#B7B7B7', '#CECECE', '#B7B7B7'],
                format_tooltip_y: d => d
            })
        },
        chinesePEG (PEG) {
            switch (PEG) {
                case 'P':
                    return '表型值'
                case 'E':
                    return '育种值'
                case 'G':
                    return '基因值'
                default:
                    return ''
            }
        }
    }
}
</script>

<style lang="less">
.unselect-chart {
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
