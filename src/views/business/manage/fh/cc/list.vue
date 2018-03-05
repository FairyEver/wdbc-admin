<style lang="less">
    @import '~@/styles/business.less';
</style>

<template>
    <div>
        <LayoutHeader title="出雏"></LayoutHeader>
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
            <FormItem prop="pen" label="家系号">
                <Input style="width: 100px" type="text" v-model="pen" @on-enter="penChangeHandler" placeholder="家系号"></Input>
            </FormItem>
            <FormItem label="搜索"><Button type="primary" @click="search('searchForm')"><Icon type="search"></Icon></Button></FormItem>
        </Form>
        <Row>
            <Col span="2">
                <PenList
                    ref="penlist"
                    :pen.sync="pen" 
                    :pen-total.sync="penTotal"
                    :strain="searchForm.strain" 
                    :gen="searchForm.gen"
                    dateFlow="fh04">
                </PenList>
            </Col>
            <Col span="22">
                <Card dis-hover>
                    <Row :gutter="16">
                        <Col class="fh-tb-ex-hd" span="4">
                            <Input disabled v-model="gjCount">
                                <span slot="prepend">累计公鸡数</span>
                            </Input>
                        </Col>
                        <Col class="fh-tb-ex-hd" span="4">
                            <Input disabled v-model="mjCount">
                                <span slot="prepend">累计母鸡数</span>
                            </Input>
                        </Col>
                        <Col class="fh-tb-ex-hd" span="4">
                            <Input disabled v-model="ccCount">
                                <span slot="prepend">累计出雏数</span>
                            </Input>
                        </Col>
                        <Col class="fh-tb-ex-hd" span="4">
                            <Input disabled v-model="penTotal">
                                <span slot="prepend">总家系数</span>
                            </Input>
                        </Col>
                        <Col class="fh-tb-ex-hd" span="4">
                            <Input disabled v-model="setDate">
                                <span slot="prepend">验蛋日期</span>
                            </Input>
                        </Col>
                    </Row>
                </Card>
                <Vtable
                    ref="vtable"
                    v-bind="table"
                    @change="vTableChangeHandler"
                    @on="vTableOnHandler">
                </Vtable>
                <PageList :current="page.current" :total="page.total" :page-size="page.size" @change="pageChangeHandler"></PageList>
            </Col>
        </Row>
        <Modal
            v-model="showWbModal"
            title="Common Modal dialog box title"
            @on-ok="saveWb">
                <Vtable
                    ref="wbVtable"
                    v-bind="wbTable"
                    @change="wbVtableChangeHandler">
                </Vtable>
        </Modal>
        <Modal
            v-model="showCullModal"
            title="Common Modal dialog box title"
            @on-ok="saveCull">
                <Vtable
                    ref="cullVtable"
                    v-bind="cullTable"
                    @change="cullVtableChangeHandler">
                </Vtable>
        </Modal>
    </div>
</template>

<script>
// 库
import { axiosToken, axiosErrorHandler } from '@/plugins/axios.js';
import * as tool from '@/assets/library/tool.js';
// mixin
import business from '@/mixin/business.js';
// 组件
import PenList from '@/views/business/components/penList.vue';
export default {
    mixins: [
        business
    ],
    components: {
        PenList
    },
    data () {
        return {
            table: {
                columns: [
                    {title: '家系号', key: 'pen'},
                    {title: '小家系号', key: 'smallPen'},
                    {title: '落盘数', key: 'eggTrayting'},
                    {title: '总雏数', key: 'allchix', control: 'InputNumber', style: { width: "50px"}},
                    {title: '公雏数', key: 'schix', control: 'InputNumber', style: { width: "50px"}},
                    {title: '母雏数', key: 'dchix', control: 'InputNumber', style: { width: "50px"}},
                    {title: '开始翅号', key: 'wbfrom', control: 'InputNumber', style: { width: "50px"}},
                    {title: '结束翅号', key: 'wbto'},
                    {title: '淘汰数', key: 'culls'},
                    {title: '毛蛋数', key: 'unhax'},
                    {
                        width: 180,
                        children: [
                            {action: 'wbEdit', text: '翅号', icon: 'edit'},
                            {action: 'cullInfo', text: '淘汰', icon: 'trash-a'},
                            {action: 'mainSubmit', text: '保存', icon: 'archive'},
                        ]
                    }
                ],
                data: [],
                loading: false
            },
            wbTable: {
                columns: [
                    {title: '翅号', key: 'cxWb'},
                    {
                        title: '断号',
                        key: 'lackWb',
                        control: 'i-switch',
                        props: {
                            trueValue: 0,
                            falseValue: 1
                        }
                    }
                ],
                data: [],
                loading: false
            },
            cullTable: {
                columns: [
                    {title: '淘汰原因', key: 'name'},
                    {title: '淘汰数量', key: 'damct', control: 'InputNumber', style: { width: "100px"}}
                ],
                data: [],
                loading: false
            },
            searchForm: {
                strain: '', // 品系
                gen: '', // 世代
                hax: '' // 批次
            },
            rules: {
                strain: [{required: true, message: '必填', trigger: 'change'}],
                gen: [{required: true, message: '必填', trigger: 'blur'}],
                hax: [{required: true, message: '必填', trigger: 'blur'}]
            },
            eliminationsList: [], // 淘汰原因
            pen: '001', // 家系号
            penTotal: 0, // 总家系数
            strain: '', // 品系
            gen: '', // 世代
            hax: '', // 批次
            useId: '', // 用途ID
            useName: '', // 用途名
            gjCount: 0, // 累计公鸡数
            mjCount: 0, // 累计母鸡数
            ccCount: 0, // 累计出雏数
            setDate: '', // 验单日期
            showWbModal: false,
            showCullModal: false,
            nowIndex: 0
        };
    },
    watch: {
        pen () {
            this.syncTableData();
        }
    },
    methods: {
        penChangeHandler () {
            if (!this.pen) return;
            if (this.pen.length === 1) {
                this.pen = `00${this.pen}`;
            } else if (this.pen.length === 2) {
                this.pen = `0${this.pen}`;
            }
        },
        // 搜索
        search (name) {
            this.penChangeHandler();
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.resetPage();
                    this.$refs.penlist.getCountPen();
                    this.syncTableData();
                } else {
                    this.$Message.error('请先输入搜索项');
                }
            });
        },
        // 翅号修改
        wbEdit (row, index) {
            this.showWbModal = true;
            this.nowIndex = index;
            axiosToken({
                url: '/a/hatch/hatchMainWb',
                data: {
                    hmId: this.$refs.vtable.dataCopy[this.nowIndex].id
                }
            }).then(res => {
                if (res.data.page.list) {
                    this.wbTable.data = res.data.page.list;
                } else {
                    this.wbTable.data = [];
                    for (let i=this.$refs.vtable.dataCopy[this.nowIndex].wbfrom; i<=this.$refs.vtable.dataCopy[this.nowIndex].wbto; i++) {
                        this.wbTable.data.push({
                            cxWb: i,
                            lackWb: 0
                        });
                    }
                }
            })
        },
        // 淘汰信息
        cullInfo (row, index) {
            this.showCullModal = true;
            axiosToken({
                url: '/a/config/eliminationReason/searchOut',
                data: {
                    position: 'fh04'
                }
            }).then(res => {
                this.eliminationsList = res.data.list;
                axiosToken({
                    url: '/a/hatch/hatchOut/searchHatchOut',
                    data: {
                        hmId: this.$refs.vtable.dataCopy[this.nowIndex].id
                    }
                }).then(res => {
                    if (res.data.page.list) {
                        let cullTableData = [];
                        for (let i=0; i<this.eliminationsList.length; i++) {
                            for (let j=0; j<res.data.page.list.length; j++) {
                                if (this.eliminationsList[i].code === res.data.page.list[j].weedId) {
                                    cullTableData.push({
                                        name: this.eliminationsList[i].name,
                                        hmId: this.$refs.vtable.dataCopy[this.nowIndex].id,
                                        position: 'FH04',
                                        weedId: this.eliminationsList[i].code,
                                        damct: res.data.page.list[j].damct
                                    })
                                }
                            }
                        }
                        this.cullTable.data = cullTableData;
                    } else {
                        this.cullTable.data = this.eliminationsList.map(e => {
                            return {
                                name: e.name,
                                hmId: this.$refs.vtable.dataCopy[this.nowIndex].id,
                                position: 'FH04',
                                weedId: e.code,
                                damct: 0
                            }
                        })
                    }
                })
            })
        },
        // 保存单条信息
        mainSubmit (row, index) {
            if (this.$refs.vtable.dataCopy[index].culls < 0) {
                this.$Message.error('淘汰数量为负')
            } else if (this.$refs.vtable.dataCopy[index].unhax < 0) {
                this.$Message.error('毛蛋数量为负')
            } else {
                axiosToken({
                    url: '/a/hatch/hatchMain',
                    method: 'post',
                    data: this.$refs.vtable.dataCopy[index]
                }).then(res => {
                    if (res.data.code === 0) {
                        this.$Message.success(res.data.msg);
                    } else {
                        this.$Message.error(res.data.msg);
                    }
                })
            }
        },
        // 保存翅号详情
        saveWb () {
            let list = this.wbTable.data.map(e => {
                return {
                    ...e,
                    hmId: this.$refs.vtable.dataCopy[this.nowIndex].id
                }
            })
            axiosToken({
                url: '/a/hatch/hatchMainWb/saveHatchWbs',
                method: 'post',
                data: list
            }).then(res => {
                if (res.data.code === 0) {
                    this.$refs.vtable.updateCell({row: this.nowIndex, key: 'wbto', value: this.$refs.wbVtable.dataCopy[this.$refs.wbVtable.dataCopy.length - 1].cxWb, updateComponent: true});
                } else {
                    this.$Message.error(res.data.msg);
                }
            })
        },
        // 保存淘汰详情
        saveCull () {
            axiosToken({
                url: '/a/hatch/hatchOut/saveHatchOut',
                method: 'post',
                data: this.$refs.cullVtable.dataCopy
            }).then(res => {
                if (res.data.code === 0) {
                    this.$Message.success(res.data.msg);
                } else {
                    this.$Message.error(res.data.msg);
                }
            })
        },
        syncTableData () {
            this.table.loading = true;
            axiosToken({
                url: '/a/hatch/hatchMain/searchNestlings',
                data: {
                    strain: this.searchForm.strain,
                    gen: this.searchForm.gen,
                    hax: this.searchForm.hax ? this.searchForm.hax.padStart(2, '0') : '',
                    pen: this.pen,
                    pageNo: this.page.current,
                    pageSize: this.page.size
                }
            }).then(res => {
                // let rowMaker = ({
                //     id = '',
                //     strain = '',
                //     gen = '',
                //     hax = '',
                //     pen = '',
                //     smallPen = '',
                //     useId = '',
                //     eggTrayting = 0,
                //     allchix = 0,
                //     dchix = 0,
                //     schix = 0,
                //     wbfrom = 0,
                //     wbto = 0,
                //     culls = 0,
                //     unhax = 0,
                // }) => ({
                //     id,
                //     strain,
                //     gen,
                //     hax,
                //     pen,
                //     smallPen,
                //     useId,
                //     eggTrayting,
                //     allchix,
                //     dchix,
                //     schix,
                //     wbfrom,
                //     wbto,
                //     culls,
                //     unhax
                // });
                if (res.data.page.list) {
                    this.table.data = res.data.page.list;
                    this.$nextTick(() => {
                        this.gjCountHandler();
                        this.mjCountHandler();
                        this.ccCountHandler();
                    })
                } else {
                    this.table.data = [];
                }
                this.page.total = res.data.page.total;
                this.strain = res.data.headstrain;
                this.gen = res.data.head.gen;
                this.useId = res.data.head.useId;
                this.hax = res.data.head.hax;
                this.setDate = res.data.head.setDate;
                if (this.useId) {
                    axiosToken({
                        url: '/a/config/chickenUse/list',
                    }).then(res => {
                        this.useName = res.data.list.find(e => {
                            return e.id === this.useId
                        }).name
                    });
                }
                this.table.loading = false;
            }).catch(error => {
                this.table.data = [];
                this.table.loading = false;
                return axiosErrorHandler(error);
            });
        },
        vTableChangeHandler ({row, key, value}) {
            let thisRowCulls = 0;
            let thisRowUnhax = 0;
            if (this.$refs.vtable.dataCopy[row].dchix === 0 && this.$refs.vtable.dataCopy[row].schix === 0 ) {
                this.$refs.vtable.updateCell({row, key: 'wbfrom', value: 0, updateComponent: true})
                this.$refs.vtable.updateCell({row, key: 'wbto', value: 0, updateComponent: true})
            } else {
                this.$refs.vtable.updateCell({row, key: 'wbto', value: this.$refs.vtable.dataCopy[row].wbfrom + this.$refs.vtable.dataCopy[row].dchix + this.$refs.vtable.dataCopy[row].schix +this.$refs.vtable.dataCopy[0].lackNum - 1, updateComponent: true});
            }
            // 计算本行culls
            thisRowCulls = this.$refs.vtable.dataCopy[row].allchix - this.$refs.vtable.dataCopy[row].dchix - this.$refs.vtable.dataCopy[row].schix;
            this.$refs.vtable.updateCell({row, key: 'culls', value: thisRowCulls, updateComponent: true});
            // 计算本行unhax
            thisRowUnhax = this.$refs.vtable.dataCopy[row].eggTrayting - this.$refs.vtable.dataCopy[row].allchix;
            this.$refs.vtable.updateCell({row, key: 'unhax', value: thisRowUnhax, updateComponent: true});
            this.gjCountHandler();
            this.mjCountHandler();
            this.ccCountHandler();
        },
        vTableOnHandler ({name, row, index}) {
            if (this[name]) {
                this[name](row, index);
            } else {
                this.$Message.error('没有匹配的 method');
            }
        },
        wbVtableChangeHandler ({row, key, value}) {
            if (this.$refs.wbVtable.dataCopy[row].lackWb === 1) {
                this.$refs.wbVtable.dataCopy.push({
                    cxWb: this.$refs.wbVtable.dataCopy[this.$refs.wbVtable.dataCopy.length - 1].cxWb + 1,
                    lackWb: 0
                })
                this.wbTable.data = tool.clone(this.$refs.wbVtable.dataCopy);
            } else {
                this.$refs.wbVtable.dataCopy.pop();
                this.wbTable.data = tool.clone(this.$refs.wbVtable.dataCopy);
            }
        },
        cullVtableChangeHandler ({row, key, value}) {
        },
        // 计算累计公鸡数
        gjCountHandler () {
            this.gjCount = 0;
            for (let i=0; i<this.$refs.vtable.dataCopy.length; i++) {
                this.gjCount += this.$refs.vtable.dataCopy[i].schix;
            }
        },
        // 计算累计母鸡数
        mjCountHandler () {
            this.mjCount = 0;
            for (let i=0; i<this.$refs.vtable.dataCopy.length; i++) {
                this.mjCount += this.$refs.vtable.dataCopy[i].dchix;
            }
        },
        // 计算累计出雏数
        ccCountHandler () {
            this.ccCount = this.gjCount + this.mjCount;
        },
        resetTableHeader () {
            this.table.columns = [
                {title: '家系号', key: 'pen'},
                {title: '小家系号', key: 'smallPen'},
                {title: '受精蛋数', key: 'fertEgg'},
                {title: '实际受精蛋数', key: 'realFertEgg', control: 'InputNumber', style: { width: "80px"}},
                {title: '落盘数量', key: 'eggTrayting'}
            ];
        }
    }
}
</script>
