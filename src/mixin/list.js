// 公用的 列表 - 表单 模式
import { all, spread, axios, axiosToken, axiosErrorHandler } from '@/plugins/axios.js';
import * as tool from '@/assets/library/tool.js';
export default {
    data: () => {
        return {
            setting: {
                // 选项请求地址
                columnsOptionsAPI: '/a/fns/getDictList',
                // 跳转到表单页面时数据传递方式 row:从本页面的row数据中获取 | new:到表单页后新get数据(在页面组件中重新声明覆盖默认值)
                formDataGetWay: 'row',
                // mock数据地址
                mockBaseUrl: 'http://www.easy-mock.com/mock/5a09103ac645f122782988de/wdbc-admin'
            },
            page: {
                current: 1,
                total: 0,
                size: 10
            },
            table: {
                data: [],
                dataTransformOptionDict: {}, // 此字段会根据dataTransformOptionDictSetting的配置加载数据
                ready: false,
                loading: false
            }
        };
    },
    created () {
        this.syncdataTransformOptionDict().then(() => {
            this.syncTableOptions();
            this.syncTableData();
        });
    },
    watch: {
        '$route.params' (value) {
            this.checkMyParams();
        }
    },
    methods: {
        checkMyParams () {
            // 检查params
            let params = tool.clone(this.$route.params);
            // 检查是否有传递给此页面的参数
            if (params.for === this.setting.myName) {
                // 有传递给此页面的参数
                if (params.data.reload) {
                    this.page.current = 1;
                    this.page.total = 0;
                    this.syncTableData();
                }
            }
        },
        pageChangeHandler (index) {
            // 页码变化
            this.page.current = index;
            this.syncTableData();
        },
        syncdataTransformOptionDict () {
            // 如果表格数据需要转换(比如 1 => 'abc'), 在这里请求字典数据(下拉菜单数据)
            return new Promise((resolve, reject) => {
                let setting = this.table.dataTransformOptionDictSetting || [];
                if (setting.length > 0) {
                    all(setting.map(e => {
                        return axiosToken({
                            url: e.API,
                            data: e.data
                        }).catch(error => axiosErrorHandler(error));
                    }))
                    .then(spread((...res) => {
                        res.forEach((e, index) => {
                            this.table.dataTransformOptionDict[setting[index].name] = e.data.dictList;
                        });
                        resolve();
                    }));
                } else {
                    resolve();
                }
            });
        },
        syncTableOptions () {
            // 如果是一个可编辑列表 并且有下拉菜单 在这里请求所有的下拉菜单选项数据
            let columnsEdit = this.table.columns.filter(e => e.control);
            // columnsEdit现在是过滤后的含有control属性的columns设置项
            if (columnsEdit.length === 0) {
                // 没有哪列是需要编辑的(这不是一个需要编辑的表格)
                this.table.ready = true;
                return;
            }
            let allDictSelect = columnsEdit.filter(e => e.control === 'DictSelect');
            if (allDictSelect.length > 0) {
                all(allDictSelect.map(e => {
                    return axiosToken({
                        url: this.setting.columnsOptionsAPI,
                        data: {
                            type: e.key
                        }
                    }).catch(error => axiosErrorHandler(error));
                }))
                .then(spread((...res) => {
                    res.forEach((resItem, index) => {
                        let options = resItem.data.dictList.map(e => ({
                            label: e.label,
                            value: e.value
                        }));
                        let key = allDictSelect[index].key;
                        this.table.columns.forEach(columnsItem => {
                            if (columnsItem.key === key) {
                                // columnsItem.options = options;
                                if (columnsItem.props) {
                                    columnsItem.props.options = options;
                                } else {
                                    columnsItem.props = {
                                        options
                                    };
                                }
                            }
                        });
                    });
                    this.table.ready = true;
                }));
            } else {
                // 没有设置需要请求option的下拉菜单
                this.table.ready = true;
            }
        },
        syncTableData () {
            this.table.loading = true;
            let _searchForm = this.searchForm ? this.searchForm : {};
            // 处理返回的数据
            let resHandler = (res) => {
                // console.log('***表格数据***');
                // console.log(res.data);
                // console.log('***表格数据结束***');
                // 判断是否是分页模式的表格 区别处理
                if (res.data.page) {
                    this.page.total = res.data.page.total;
                    dataSaveLocal(res.data.page.list);
                } else {
                    dataSaveLocal(res.data.list);
                }
                this.table.loading = false;
                // this.$Message.success('数据重载完毕');
            };
            // 进一步处理返回的数据
            let dataSaveLocal = (res) => {
                if (this.dataTransformer) {
                    this.table.data = this.dataTransformer(res);
                } else {
                    this.table.data = res;
                }
            };
            // 获得表格数据
            // 是否使用mock数据
            if (this.setting.mock) {
                axios.get(this.setting.mockBaseUrl + this.setting.API)
                .then(res => resHandler(res))
                .catch(error => axiosErrorHandler(error));
            } else {
                axiosToken({
                    url: this.setting.API,
                    data: {
                        pageNo: this.page.current,
                        pageSize: this.page.size,
                        ..._searchForm
                    }
                })
                .then(res => resHandler(res))
                .catch(error => axiosErrorHandler(error));
            }
        },
        tableHandler (methodName, ...props) {
            // 接收表格的事件 基础的在此文件内配置了 特殊的需要在实际的组件文件内注册
            if (this[methodName]) {
                this[methodName](...props);
            }
        },
        enterHandler (info) {
            if (this.table.data[info.row][info.key] !== info.value) {
                this.table.data[info.row][info.key] = info.value;
                console.log('更新了table.data第' + info.row + '行的' + info.key + ' = ' + info.value);
            }
        },
        search () {
            this.page.current = 1;
            this.syncTableData();
        },
        add () {
            // 新增
            this.$router.push({
                name: this.setting.brotherName,
                params: {
                    for: this.setting.brotherName,
                    from: this.setting.myName,
                    mode: 'new',
                    dataGetWay: this.setting.formDataGetWay,
                    dataGetId: 'id',
                    data: {}
                }
            });
        },
        edit (row, id, mode = 'edit') {
            // 编辑
            this.$router.push({
                name: this.setting.brotherName,
                params: {
                    for: this.setting.brotherName,
                    from: this.setting.myName,
                    mode,
                    dataGetWay: this.setting.formDataGetWay,
                    dataGetId: row.id,
                    data: {
                        row
                    }
                }
            });
        },
        saveLine (row, id) {
            // 保存一行 这个功能和表单页面的保存一样
        },
        saveAll () {
            // 全部保存
            this.$Message.info('全部保存');
        },
        delete (row, id) {
            // 删除一行
            axiosToken({
                url: this.setting.API + '/' + row.id,
                method: 'delete'
            }).then(res => {
                this.$Message.success('删除成功');
                this.syncTableData();
                if (this.refreshOffice) {
                    this.refreshOffice();
                }
            }).catch(error => axiosErrorHandler(error));
        }
    }
};
