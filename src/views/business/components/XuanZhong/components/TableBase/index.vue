<template>
    <div>
        <template v-if="filterSettingHistory.length > 0">
            <div style="margin-bottom: 10px;">
                <Button type="text">{{currentData.length}}个筛选结果</Button>
                <Button @click="clearHandler">清空筛选条件</Button>
            </div>
            <!-- 显示目前的筛选设置历史 -->
            <Alert>
                <div><b>当前筛选条件</b></div>
                <div v-for="(item, index) in filterSettingHistory.map(e => filterSettingToChinese(e.filterSetting))" :key="index">
                    {{index + 1}} : {{filterSettingHistory[index].col.title}}{{item}}
                </div>
            </Alert>
        </template>
        <table class="gridtable">
            <tr>
                <th v-if="select">
                    <input type="checkbox" v-model="selectAll">
                </th>
                <th v-for="(col, colIndex) in columns" :key="colIndex">
                    <TableHeadControl
                        v-if="col.display && filterable"
                        :data="col"
                        @sort-sx="sortSxHandler"
                        @sort-jx="sortJxHandler"
                        @filter="filterHandler">
                    </TableHeadControl>
                    <template v-else>{{col.title}}</template>
                </th>
            </tr>
            <tr v-for="(row, rowIndex) in currentData" :key="rowIndex">
                <td v-if="select" class="check">
                    <input type="checkbox" :value="row.id" v-model="currentValue">
                </td>
                <td v-for="(col, colIndex) in columns" :key="colIndex">{{row[col.key]}}</td>
            </tr>
        </table>
    </div>
</template>

<script>
// 组件
import TableHeadControl from '../TableHeadControl'
// mixin
import filterMinin from '../../mixins/filter'
// 库
import * as tool from '@/assets/library/tool.js'
export default {
    mixins: [
        filterMinin
    ],
    components: {
        TableHeadControl
    },
    props: {
        value: {
            type: Array,
            required: false,
            default: () => []
        },
        data: {
            type: Array,
            required: false,
            default: () => []
        },
        columns: {
            type: Array,
            required: false,
            default: () => []
        },
        select: {
            type: Boolean,
            required: false,
            default: false
        },
        filterable: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    data () {
        return {
            selectAll: false,
            // 勾选的行
            currentValue: [],
            // 表格数据
            currentData: [],
            // 过滤相关的设置 过滤哪一列
            filterCol: {},
            // 过滤相关的设置 过滤参数
            filterSetting: {},
            // 过滤相关的设置 历史参数记录
            filterSettingHistory: []
        }
    },
    created () {
        // 内部值等于参数值
        this.currentValue = [...this.value]
        this.currentData = [...this.data]
    },
    watch: {
        // 表格数据变化了 内部值更新
        data (value) {
            this.clearHandler()
        },
        // 参数值变化了 内部值更新
        value (value) {
            this.currentValue = [...value]
        },
        // 内部的值变化了 要更新到外部
        currentValue (value) {
            if (value.join('') !== this.value.join('')) {
                this.$emit('input', this.currentValue)
            }
        },
        // 全选值变化
        selectAll (value) {
            if (value) {
                this.allSelect()
            } else {
                this.clearSelect()
            }
        }
    },
    methods: {
        // 升序排序
        sortSxHandler (col) {
            this.clearSelect()
            this.currentData.sort((a, b) => a[col.key] - b[col.key])
        },
        // 降序排序
        sortJxHandler (col) {
            this.clearSelect()
            this.currentData.sort((a, b) => b[col.key] - a[col.key])
        },
        // 用户发出一个过滤数据事件
        filterHandler (col, filterSetting) {
            const _col = tool.clone(col)
            const _filterSetting = tool.clone(filterSetting)
            this.filterSettingHistory.push({
                col: _col,
                filterSetting: _filterSetting
            })
            this.filterCol = _col
            this.filterSetting = _filterSetting
            this.doFilter()
        },
        // 用户申请清空条件
        clearHandler () {
            this.clearFilter()
            this.clearSelect()
            this.resetData()
        },
        // 执行一次筛选
        doFilter () {
            const tempData = [...this.currentData]
            this.currentData = tempData.filter(e => {
                return this.filterSetting.type === 'Number' ? this.filterNumber(e[this.filterCol.key], this.filterSetting.value) : this.filterString(e[this.filterCol.key], this.filterSetting.value)
            })
            // 默认全选上
            this.allSelect()
        },
        // 清空筛选
        clearFilter () {
            this.filterCol = {}
            this.filterSetting = {}
            this.filterSettingHistory = []
        },
        // 清空选择的项
        clearSelect () {
            this.selectAll = false
            this.currentValue = []
        },
        // 执行选择所有的项目
        allSelect () {
            this.selectAll = true
            this.currentValue = this.currentData.map(e => e.id)
        },
        // 还原表格数据
        resetData () {
            this.currentData = [...this.data]
        }
    }
}
</script>


<style lang="less" scoped>
table.gridtable {
    font-family: verdana,arial,sans-serif;
    font-size:11px;
    color:#333333;
    border-width: 1px;
    border-color: #e9eaec;
    border-collapse: collapse;
    width: 100%;
    text-align: center;
}
table.gridtable th {
    border-width: 1px;
    padding: 8px;
    border-style: solid;
    border-color: #e9eaec;
    background-color: #f8f8f9;
}
table.gridtable td {
    border-width: 1px;
    padding: 8px;
    border-style: solid;
    border-color: #e9eaec;
    background-color: #ffffff;
    font-size: 12px;
    line-height: 12px;
}
table.gridtable td.check{
    text-align: center;
}
</style>
