<style lang="less">
    @import '~@/styles/business.less';
</style>

<template>
    <div>
        <LayoutHeader title="落盘"></LayoutHeader>
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
                    dateFlow="fh03">
                </PenList>
            </Col>
            <Col span="22">
                <Card dis-hover>
                    <Row :gutter="16">
                        <Col class="fh-tb-ex-hd" span="4">
                            <Input disabled v-model="lpCount">
                                <span slot="prepend">落盘总数</span>
                            </Input>
                        </Col>
                        <Col class="fh-tb-ex-hd" span="4">
                            <Input disabled v-model="ttCount">
                                <span slot="prepend">淘汰总数</span>
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
                        <Col class="fh-tb-ex-hd" span="4">
                            <Button v-show="table.data.length > 0" type="primary" @click="save" :loading="table.loading">
                                保存
                                <Icon type="archive"></Icon>
                            </Button>
                        </Col>
                    </Row>
                </Card>
                <Vtable
                    ref="vtable"
                    v-bind="table"
                    @change="vTableChangeHandler">
                </Vtable>
                <PageList :current="page.current" :total="page.total" :page-size="page.size" @change="pageChangeHandler"></PageList>
            </Col>
        </Row>
    </div>
</template>

<script>
// 库
import { axiosToken, axiosErrorHandler } from '@/plugins/axios.js';
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
                    {title: '母鸡翅号', key: '_did'},
                    {title: '受精蛋数', key: 'fertEgg'},
                    {
                        title: '实际受精蛋数',
                        key: 'realFertEgg',
                        render: (h, params) => {
                            return h('InputNumber', {
                                props: {
                                    type: 'text',
                                    value: params.row.realFertEgg,
                                    readonly: params.row.operation ? false : true
                                },
                                on: {
                                    input: (val) => {
                                        this.$refs.vtable.updateCell({row: params.index, key: 'realFertEgg', value: val, updateComponent: false})
                                    }
                                }
                            })
                        }
                    },
                    {title: '落盘数量', key: 'eggTrayting'}
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
            lpCount: 0, // 落盘总数
            ttCount: 0, // 淘汰总数
            setDate: '' // 验蛋日期
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
                    axiosToken({
                        url: '/a/config/eliminationReason/searchOut',
                        data: {
                            position: 'fh03'
                        }
                    }).then(res => {
                        this.resetTableHeader();
                        this.eliminationsList = res.data.list;
                        if (this.eliminationsList.length > 0) {
                            this.eliminationsList.map(e => {
                                this.table.columns.push({
                                    title: e.name,
                                    key: `damct_${e.code}`,
                                    render: (h, params) => {
                                        return h('InputNumber', {
                                            props: {
                                                type: 'text',
                                                value: params.row[`damct_${e.code}`],
                                                readonly: params.row.operation ? false : true
                                            },
                                            on: {
                                                input: (val) => {
                                                    this.$refs.vtable.updateCell({row: params.index, key: `damct_${e.code}`, value: val, updateComponent: false})
                                                }
                                            }
                                        })
                                    }
                                });
                            })
                        }
                        this.syncTableData();
                    })
                } else {
                    this.$Message.error('请先输入搜索项');
                }
            });
        },
        // 保存
        save () {
            let verifyEggin = [];
            this.$refs.vtable.dataCopy.map(e => {
                if (e.eggTrayting < 0) {
                    verifyEggin.push(e.smallPen)
                }
            })
            if (verifyEggin.length > 0) {
                this.$Message.error(`小家系号为${verifyEggin.join('、')}的落盘数量为负`)
            } else {
                this.resetPage();
                this.$refs.vtable.dataCopy.map(e => {
                    e.list = [];
                    this.eliminationsList.map(f => {
                        e.list.push({
                            id: e['damct_id_' + f.code],
                            weedId: f.code,
                            damct: e['damct_' + f.code]
                        })
                    })
                })
                this.submitTableData();
            }
        },
        syncTableData () {
            this.table.loading = true;
            axiosToken({
                url: '/a/hatch/hatchMain/searchDropTrays',
                data: {
                    strain: this.searchForm.strain,
                    gen: this.searchForm.gen,
                    hax: this.searchForm.hax ? this.searchForm.hax.padStart(2, '0') : '',
                    pen: this.pen,
                    pageNo: this.page.current,
                    pageSize: this.page.size
                }
            }).then(res => {
                if (res.data.page.list) {
                    let _list = res.data.page.list;
                    _list.map(e => {
                        for (let i=0; i<this.eliminationsList.length; i++) {
                            e['damct_id_' + this.eliminationsList[i].code] = '';
                            e['damct_' + this.eliminationsList[i].code] = 0;
                        }
                    })
                    _list.map(e => {
                        if (e.list) {
                            for (let i=0; i<this.eliminationsList.length; i++) {
                                for (let j=0; j<e.list.length; j++) {
                                    if (this.eliminationsList[i].code === e.list[j].weedId) {
                                        e['damct_id_' + this.eliminationsList[i].code] = e.list[j].id ? e.list[j].id : '';
                                        e['damct_' + this.eliminationsList[i].code] = e.list[j].damct;
                                    }
                                }
                            }
                        }
                    })
                    _list = _list.map(e => {
                        return {
                            ...e,
                            _did: e.did.slice(e.did.length - 5)
                        }
                    })
                    this.table.data = _list;
                    this.$nextTick(() => {
                        this.lpCountHandler();
                        this.ttCountHandler();
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
        submitTableData () {
            this.table.loading = true;
            axiosToken({
                url: '/a/hatch/hatchMain/saveDropTrayOut',
                method: 'post',
                data: this.$refs.vtable.dataCopy
            }).then(res => {
                this.$refs.penlist.nextPen();
            }).catch(error => {
                this.table.loading = false;
                return axiosErrorHandler(error);
            });
        },
        vTableChangeHandler ({row, key, value}) {
            let thisRowEliminations = 0;
            // 计算本行eggTrayting
            for (let i=0; i<this.eliminationsList.length; i++) {
                thisRowEliminations += this.$refs.vtable.dataCopy[row]['damct_' + this.eliminationsList[i].code];
            }
            this.$refs.vtable.updateCell({row, key: 'eggTrayting', value: this.$refs.vtable.dataCopy[row].realFertEgg - thisRowEliminations, updateComponent: true})
            this.lpCountHandler();
            this.ttCountHandler();
        },
        // 计算落盘总数
        lpCountHandler () {
            this.lpCount = 0;
            for (let i=0; i<this.$refs.vtable.dataCopy.length; i++) {
                this.lpCount += this.$refs.vtable.dataCopy[i].eggTrayting
            }
        },
        // 计算淘汰总数
        ttCountHandler () {
            this.ttCount = 0;
            for (let i=0; i<this.$refs.vtable.dataCopy.length; i++) {
                for (let j=0; j<this.eliminationsList.length; j++) {
                    this.ttCount += this.$refs.vtable.dataCopy[i]['damct_' + this.eliminationsList[j].code];
                }
            }
        },
        resetTableHeader () {
            this.table.columns = [
                {title: '家系号', key: 'pen'},
                {title: '小家系号', key: 'smallPen'},
                {title: '母鸡翅号', key: '_did'},
                {title: '受精蛋数', key: 'fertEgg'},
                {
                    title: '实际受精蛋数',
                    key: 'realFertEgg',
                    render: (h, params) => {
                        return h('InputNumber', {
                            props: {
                                type: 'text',
                                value: params.row.realFertEgg,
                                readonly: params.row.operation ? false : true
                            },
                            on: {
                                input: (val) => {
                                    this.$refs.vtable.updateCell({row: params.index, key: 'realFertEgg', value: val, updateComponent: false})
                                }
                            }
                        })
                    }
                },
                {title: '落盘数量', key: 'eggTrayting'}
            ];
        }
    }
}
</script>
