<template>
    <div style="padding-bottom: 300px;">
        <!-- 搜索条件 -->
        <SearchForm
            ref="searchForm"
            v-bind="$attrs"
            @submit="searchFromSubmitHandler">
        </SearchForm>
        <!-- 有了基础数据才可以进行下面的操作 -->
        <template v-if="raw.length > 0">
            <!-- 条件列表 -->
            <template v-for="(item, index) in params">
                <!-- 一个条件 -->
                <ParamItem
                    :key="`section${index}`"
                    v-model="params[index]"
                    @compute="computeLastParam"
                    @fixed="ParamItemFixedHandler"
                    @delete="ParamItemDeleteHandler(index)">
                </ParamItem>
                <!-- 箭头 -->
                <div v-if="index !== params.length - 1" :key="`arrow${index}`" class="section-arrow">
                    <Icon type="arrow-down-c"></Icon>
                </div>
            </template>
            <!-- 新建一个条件 -->
            <Card v-if="!addDisabled" dis-hover style="margin: 10px 0px;">
                <p slot="title">新增一个条件</p>
                <AddNewParam
                    style="margin: 20px auto;"
                    @select="addNewParamSelectHandler">
                </AddNewParam>
            </Card>
            <!-- 第一步确定后才显示第二步 -->
            <template v-if="step2Display">
                <!-- 显示入选数量 -->
                <Card dis-hover style="margin: 10px 0px;">
                    <p slot="title">入选数量 {{poolCompute[activeParamIndex].select.pool.length}}</p>
                    <SelectView :data="poolCompute[activeParamIndex].select.pool" :columns.sync="columnsSelect"></SelectView>
                </Card>
                <!-- 二次筛选 -->
                <Card dis-hover>
                    <p slot="title">淘汰数量 {{poolCompute[activeParamIndex].unSelect.pool.length}}</p>
                    <UnselectView
                        :data="poolCompute[activeParamIndex] ? poolCompute[activeParamIndex].unSelect.pool : []"
                        :columns.sync="columnsUnselect"
                        @fixed="unSelectFixedHandler"
                        @move="unSelectMoveHandler">
                    </UnselectView>
                </Card>
            </template>
            <!-- 目前所有的未选中个体统计 -->
            <Card dis-hover style="margin: 10px 0px;">
                <p slot="title">统计</p>
                <UnselectChart :data="poolCompute" :params="params"></UnselectChart>
            </Card>
            <!-- 保存 -->
            <Button type="success" size="large" @click="handleSave" long>保存</Button>
        </template>
    </div>
</template>

<script>
// 组件
import SearchForm from './components/SearchForm'
import ParamItem from './components/ParamItem'
import AddNewParam from './components/AddNewParam'
import SelectView from './components/SelectView'
import UnselectView from './components/UnselectView'
import UnselectChart from './components/UnselectChart'
// mixin
import filterMinin from './mixins/filter'
// 库
import * as tool from '@/assets/library/tool.js'
import { axiosToken, axiosErrorHandler } from '@/plugins/axios.js'
export default {
    mixins: [
        filterMinin
    ],
    components: {
        // 搜索条件
        SearchForm,
        // 一个条件
        ParamItem,
        // 新建条件的级联选择器
        AddNewParam,
        // 显示选中的结果
        SelectView,
        // 未选中的结果再次筛选的界面
        UnselectView,
        // 未选中的个体分析
        UnselectChart
    },
    data () {
        return {
            // 第几个选育点
            breedingPoint: 1,
            // 结果显示表格的表头设置 原始的
            columns: [],
            // 结果显示表格的表头设置 选中数据用的配置方案
            columnsSelect: [],
            // 结果显示表格的表头设置 没选中数据用的配置方案
            columnsUnselect: [],
            // 原始数据 写完了搜索条件后请求过来的
            raw: [],
            // 请求原始数据的时候设置的参数
            rawSetting: {},
            // 阶段数据池
            // 比如 params[n] 的参数是给 poolStage[n] 用的
            poolStage: [],
            // 计算结果池
            // poolStage[n] 经过 params[n] 计算后的结果是 poolCompute[n], 同时之后也会是 poolStage[n + 1]
            poolCompute: [],
            // 设置的参数
            params: []
        }
    },
    computed: {
        // 计算属性 新增的级联选择器是否禁用
        addDisabled () {
            if (this.params.length > 0) {
                // 已有条件的最后一个没有fixed的时候
                return this.params[this.params.length - 1].fixed === false || this.poolCompute[this.poolCompute.length - 1].fixed === false
            } else {
                // 现在还没有条件 第一个当然要非禁用
                return false
            }
        },
        // 最后一个主参数的index
        activeParamIndex () {
            return this.params.length - 1
        },
        // 显示第二步骤的条件
        step2Display () {
            // 没有这个步骤的计算结果 当然不显示
            if (!this.poolCompute[this.activeParamIndex]) {
                return false
            }
            // 有这步的计算结果了 但是还要这步的计算结果没有fixed
            return this.params[this.activeParamIndex].fixed && this.poolCompute[this.activeParamIndex].fixed === false
        }
    },
    methods: {
        // 保存
        handleSave () {
            this.$emit('submit', this.poolCompute, this.params, this.rawSetting)
        },
        // 搜索到了原始数据
        searchFromSubmitHandler (data) {
            if (this.raw.length > 0) {
                // 清空所有的数据 以后做
            }
            this.raw = data
            this.rawSetting = tool.clone(this.$refs.searchForm.setting)
            this.$Message.success('数据加载成功')
            // 获得表格表头设置
            this.getColumnsSetting()
        },
        // 获得表格表头设置
        getColumnsSetting () {
            axiosToken({
                url: '/a/pickout/pickoutStrainIndex',
                data: {
                    strain: this.$refs.searchForm.searchForm.strain,
                    gen: this.$refs.searchForm.searchForm.gen,
                    sex: this.$refs.searchForm.searchForm.sex,
                    breedingPoint: this.breedingPoint
                }
            }).then(res => {
                const list = res.data.list
                const columns = list.map(e => ({
                    title: e.name,
                    keyName: e.indexId,
                    PEG: e.indexAttr,
                    display: e.display === 1,
                    type: e.type === 1 ? 'Number' : 'String'
                }))
                this.columns = tool.clone(columns)
                this.columnsSelect = tool.clone(columns)
                this.columnsUnselect = tool.clone(columns)
            }).catch(error => axiosErrorHandler(error))
            // const keyName = ['1-1-1', '1-1-2', '1-1-3', '1-2-1', '1-2-2', '1-2-3', '2-1-1', '2-1-2', '2-1-3', '2-2-1', '2-2-2', '2-2-3']
            // const PEG = ['P', 'E', 'G']
            // let columns = []
            // PEG.forEach(pegItem => {
            //     keyName.forEach(keyNameItem => {
            //         let item = {}
            //         item.title = keyNameItem
            //         item.keyName = 'attr' + keyNameItem
            //         item.PEG = pegItem
            //         item.display = false
            //         item.type = keyNameItem === '1-1-2' ? 'String' : 'Number'
            //         columns.push(item)
            //     })
            // })
            // columns[0].display = true
            // columns[1].display = true
            // columns[2].display = true
            // columns[3].display = true
            // columns[4].display = true
            // columns[5].display = true
            // columns[6].display = true
            // this.columns = tool.clone(columns)
            // this.columnsSelect = tool.clone(columns)
            // this.columnsUnselect = tool.clone(columns)
        },
        // 用户通过级联选择器新添加了一个条件
        addNewParamSelectHandler (item = {}) {
            // 设置新条件的可选个体池
            // 新添加的这个条件以后在所有条件中的索引
            const paramIndex = this.params.length
            // 将要添加的条件是第一个
            if (paramIndex === 0) {
                // 第一个条件的候选池就是raw
                this.poolStage.push([...this.raw])
            } else {
                // 不是起始条件 那这个条件的候选池应该是上一个的计算结果 (select 已选中)
                this.poolStage.push([...this.poolCompute[paramIndex - 1].select.pool])
            }
            // 设置新条件的默认值
            const base = {
                // 标题
                title: item.label,
                // 单位
                unit: item.unit,
                // 对应的参数key
                keyName: item.value,
                // 条件是字符型还是数字型 默认是数字 有值的时候是字符
                type: item.type || 'Number',
                // 值的类型 表型值 育种值 基因值
                PEG: 'P',
                // 已经确定
                fixed: false
            }
            // 公用的一些参数
            const pub = {
                // 入选数量
                selectedNumber: null,
                // 淘汰数量
                eliminateNumber: null,
                // 淘汰比例
                eliminateProportion: null
            }
            // 右侧表格里的
            const numberType = {
                table: {
                    P: {
                        name: '表型值',
                        PEG: 'P',
                        groupAverageValue: this.groupAverageValueMaker(this.poolStage[paramIndex], 'P', item.value),
                        groupStandardDeviation: this.groupStandardDeviationMaker(this.poolStage[paramIndex], 'P', item.value),
                        selectedAverageValue: null,
                        selectedStandardDeviation: null
                    },
                    E: {
                        name: '育种值',
                        PEG: 'E',
                        groupAverageValue: this.groupAverageValueMaker(this.poolStage[paramIndex], 'E', item.value),
                        groupStandardDeviation: this.groupStandardDeviationMaker(this.poolStage[paramIndex], 'E', item.value),
                        selectedAverageValue: null,
                        selectedStandardDeviation: null
                    },
                    G: {
                        name: '基因值',
                        PEG: 'G',
                        groupAverageValue: this.groupAverageValueMaker(this.poolStage[paramIndex], 'G', item.value),
                        groupStandardDeviation: this.groupStandardDeviationMaker(this.poolStage[paramIndex], 'G', item.value),
                        selectedAverageValue: null,
                        selectedStandardDeviation: null
                    }
                }
            }
            // 指标参数
            const paramNumberValueDefault = [
                {
                    enable: true,
                    sym: '>',
                    value: 4
                },
                {
                    enable: false,
                    sym: '<',
                    value: 0
                }
            ]
            const paramStringValueDefault = []
            const param = {
                param: {
                    type: item.type || 'Number',
                    value: item.type ? paramStringValueDefault : paramNumberValueDefault
                }
            }
            // 最后合成最终的条件参数
            this.params.push({
                ...base,
                ...pub,
                ...numberType,
                ...param,
                // 子条件
                paramSub: []
            })
        },
        // 计算最后一个主参数
        computeLastParam () {
            // 从设置参数中取出有用的值
            const {
                param, // 参数值
                type, // Number String
                PEG, // P E G
                keyName // 字段名
            } = this.params[this.activeParamIndex]
            const pool = this.poolStage[this.activeParamIndex]
            // 筛选
            const {select, unSelect} = this.poolFilter(pool, param, type, PEG, keyName)
            // 设置计算结果池
            this.poolCompute.splice(this.activeParamIndex, 1, {
                fixed: false,
                select: {
                    pool: [...select]
                },
                unSelect: {
                    pool: [...unSelect]
                }
            })
            // 更新最新的参数值中的数据 (入选数量 淘汰数量 淘汰比例 PEG入选平均值 PEG入选标准差)
            this.updateActiveParam()
        },
        // 更新最后一个参数的值 使用这个方法的时候一定要在 poolCompute 相应地赋值以后
        updateActiveParam () {
            // 最后一个 param 代表的字段名
            const keyName = this.params[this.activeParamIndex].keyName
            const {
                select: {
                    pool: select
                },
                unSelect: {
                    pool: unSelect
                }
            } = this.poolCompute[this.activeParamIndex]
            // 更新参数值 入选数量
            this.params[this.activeParamIndex].selectedNumber = select.length
            // 更新参数值 淘汰数量
            this.params[this.activeParamIndex].eliminateNumber = unSelect.length
            // 更新参数值 淘汰比例
            this.params[this.activeParamIndex].eliminateProportion = (unSelect.length / this.poolStage[0].length * 100).toFixed(2) + '%'
            // 更新参数值 PEG入选平均值
            this.params[this.activeParamIndex].table.P.selectedAverageValue = this.groupAverageValueMaker(select, 'P', keyName)
            this.params[this.activeParamIndex].table.E.selectedAverageValue = this.groupAverageValueMaker(select, 'E', keyName)
            this.params[this.activeParamIndex].table.G.selectedAverageValue = this.groupAverageValueMaker(select, 'G', keyName)
            // 更新参数值 PEG入选标准差
            this.params[this.activeParamIndex].table.P.selectedStandardDeviation = this.groupStandardDeviationMaker(select, 'P', keyName)
            this.params[this.activeParamIndex].table.E.selectedStandardDeviation = this.groupStandardDeviationMaker(select, 'E', keyName)
            this.params[this.activeParamIndex].table.G.selectedStandardDeviation = this.groupStandardDeviationMaker(select, 'G', keyName)
        },
        // 用户确定了最后的主条件
        ParamItemFixedHandler () {
            this.params[this.activeParamIndex].fixed = true
        },
        // 用户删除了某项条件
        ParamItemDeleteHandler (index = 0) {
            //  index === 0 ? [] : 
            this.poolStage = tool.clone(this.poolStage.splice(0, index))
            this.poolCompute = tool.clone(this.poolCompute.splice(0, index))
            this.params = tool.clone(this.params.splice(0, index))
        },
        // 用户确认了二次筛选条件
        unSelectFixedHandler () {
            this.poolCompute[this.activeParamIndex].fixed = true
        },
        // 用户申请把一部分选中的特体移动出去
        unSelectMoveHandler (ids, reason) {
            console.group('unSelectMoveHandler')
            console.log(ids.length)
            console.log(reason)
            console.groupEnd()
            // poolCompute[activeParamIndex]
            let select = []
            let unSelect = []
            this.poolCompute[this.activeParamIndex].unSelect.pool.forEach(e => {
                if (this.inArray(ids, e.id)) {
                    select.push(e)
                } else {
                    unSelect.push(e)
                }
            })
            const oldSelect = this.poolCompute[this.activeParamIndex].select.pool
            this.poolCompute[this.activeParamIndex].select.pool = [...oldSelect, ...select]
            this.poolCompute[this.activeParamIndex].unSelect.pool = [...unSelect]
            this.updateActiveParam()
            // 将这次的条件存进去
            this.params[this.activeParamIndex].paramSub = this.params[this.activeParamIndex].paramSub.concat(reason)
        },
        // 计算 传入一个数组 传入一个字符串 返回这个字符串是否在数组内
        inArray (arr = [], item = '') {
            return arr.indexOf(item) >= 0
        },
        // 计算 根据条件过滤
        poolFilter (pool = [], param = {}, type = 'Number', PEG = 'P', keyName = '') {
            // 暂存 选中的
            let select = []
            // 暂存 没有选中的
            let unSelect = []
            // 遍历
            pool.forEach((e, index) => {
                if (e[PEG] !== undefined) {
                    if (e[PEG][keyName] !== undefined) {
                        const value = e[PEG][keyName]
                        if (param.type === 'Number' ? this.filterNumber(value, param.value) : this.filterString(value, param.value, index < 10)) {
                            select.push({...e})
                        } else {
                            unSelect.push({...e})
                        }
                    } else {
                        unSelect.push({...e})
                    }
                } else {
                    unSelect.push({...e})
                }
            })
            return {
                select,
                unSelect
            }
        },
        // 计算 群体平均值
        groupAverageValueMaker (pool = [], PEG = 'P', keyName = '') {
            if (pool.length === 0) {
                return 0
            }
            let sum = 0
            pool.forEach(e => {
                // 如果个体确实有这种类型的值
                if (e[PEG][keyName] !== undefined) {
                    sum += e[PEG][keyName]
                }
            })
            const result = (sum / pool.length).toFixed(4)
            return result
        },
        // 计算 群体标准差
        groupStandardDeviationMaker (pool = [], PEG = 'P', keyName = '') {
            if (pool.length === 0) {
                return '无法计算(为空)'
            }
            if (pool.length === 1) {
                return '无法计算(单个)'
            }
            let sum = (x, y) => x + y
            let square = x => x * x
            let data = []
            pool.forEach(e => {
                data.push(e[PEG][keyName] !== undefined ? e[PEG][keyName] : 0)
            })
            let mean = data.reduce(sum) / data.length
            let deviations = data.map(x => x - mean)
            let stddev = Math.sqrt(deviations.map(square).reduce(sum) / (data.length - 1))
            const result = stddev.toFixed(4)
            return result
        }
    }
}
</script>

<style lang="less" scoped>
// 下箭头
.section-arrow {
    text-align: center;
    font-size: 36px;
    color: #2d8cf0;
}
</style>
