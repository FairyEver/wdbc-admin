// 场
import { all, spread, axiosToken, axiosErrorHandler } from '@/plugins/axios.js';
export default {
    data: () => {
        return {
            // 分页
            pageChang: {
                current: 1,
                total: 0,
                size: 10
            },
            // 表格
            tableChang: {
                columns: [
                    {title: '场号', key: 'code', control: 'Input', width: 90},
                    {title: '名称', key: 'name', control: 'Input'},
                    {
                        width: 80,
                        fixed: 'right',
                        children: [
                            {action: 'getDong', text: '下属栋', icon: 'edit'}
                        ]
                    }
                ],
                data: [
                    {chang: 'demo'}
                ],
                // addButtonText: '新增场',
                // saveButtonText: '保存场',
                loading: false,
                addMode: true,
                saveMode: true,
                deleteMode: true,
                addTemplate: {}
            }
        };
    },
    methods: {
        pageChangeHandlerChang (index) {
            this.pageChang.current = index;
            this.syncTableChangData();
        },
        syncTableChangData () {
            // 清空栋相关的
            this.closeDong();
            // 请求数据
            this.tableChang.loading = true;
            axiosToken({
                url: '/a/config/farm',
                data: {
                    pageNo: this.pageChang.current,
                    pageSize: this.pageChang.size
                }
            })
            .then(res => {
                let rowMaker = ({
                    id = '',
                    name = '',
                    code = ''
                }) => ({
                    id,
                    name,
                    code,
                    delFlag: '0'
                });
                // 缓存
                let page = res.data.page;
                // 表格数据 只要需要提交的
                let list = page.list ? page.list : [];
                this.tableChang.data = list.map(e => rowMaker(e));
                this.tableChang.loading = false;
                // 分页设置
                this.pageChang.current = page.pageNo;
                this.pageChang.total = page.total;
                this.pageChang.size = page.pageSize;
                // 新增行设置
                this.tableChang.addTemplate = rowMaker({});
            })
            .catch(error => {
                this.tableChang.loading = false;
                axiosErrorHandler(error);
            });
        },
        vTableSaveHandlerChang (rows) {
            // 校验
            if (rows.some(e => {
                if (e.delFlag === '1') {
                    return false;
                } else {
                    return e.name === '' || e.code === '';
                }
            })) {
                this.$Message.error('数据校验没有通过');
                return;
            }
            if (rows.length === 0) {
                this.$Message.error('没有需要提交的数据');
                return;
            }
            this.checkChangIsEmpty(rows)
            .then(() => {
                // 提交
                axiosToken({
                    url: '/a/config/farm',
                    method: 'post',
                    data: rows
                })
                .then(res => {
                    if (res.data.code === 0) {
                        this.$Message.success(res.data.msg);
                        this.resetPageChang();
                        this.syncTableChangData();
                    } else {
                        this.$Message.error(res.data.msg);
                    }
                })
                .catch(error => axiosErrorHandler(error));    
            })
            .catch((chang) => {
                this.$Message.error(`${chang.map(e => e.name).join(',')} 有下属栋，不允许删除`);
            })
        },
        checkChangIsEmpty (rows) {
            return new Promise((resolve, reject) => {
                let delRows = rows.filter(e => e.delFlag === '1');
                
                if (delRows.length > 0) {
                    // 有需要删除的场
                    this.$Message.info('正在查询勾选的场是否有下属栋');
                    all(delRows.map(e => {
                        return axiosToken({
                            url: '/a/config/building',
                            data: {
                                farmId: e.id,
                                pageNo: 1,
                                pageSize: 10
                            }
                        }).catch(error => axiosErrorHandler(error));
                    }))
                    .then(spread((...res) => {
                        let changHasDong = [];
                        res.forEach((e, index) => {
                            if (e.data.page.total > 0) {
                                changHasDong.push(delRows[index])
                            }
                        })
                        if (changHasDong.length > 0) {
                            reject(changHasDong);
                        } else {
                            resolve();
                        }
                    }));
                } else {
                    // 没有需要删除的场
                    resolve();
                }
            });
        },
        resetPageChang () {
            this.pageChang.current = 1;
            this.pageChang.total = 0;
            this.pageChang.size = 10;
        },
        vTableOnHandlerChang ({name, row, index}) {
            if (this[name]) {
                this[name](row, index);
            } else {
                this.$Message.error('没有匹配的 method');
            }
        },
        getDong (row, index) {
            this.changSelectId = row.id;
            this.changSelectName = row.name;
        },
        closeDong () {
            this.resetPageDong();
            this.changSelectId = '';
            this.changSelectName = '';
        }
    }
};
