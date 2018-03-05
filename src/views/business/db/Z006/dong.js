// 栋
import { all, spread, axiosToken, axiosErrorHandler } from '@/plugins/axios.js';
export default {
    data: () => {
        return {
            // 分页
            pageDong: {
                current: 1,
                total: 0,
                size: 10
            },
            // 表格
            tableDong: {
                columns: [
                    {title: '名称', key: 'name', control: 'Input', style: {width: '80px'}},
                    {title: '母鸡起始笼号', key: 'henCageNumberFrom', control: 'Input', style: {width: '60px'}},
                    {title: '母鸡结束笼号', key: 'henCageNumberTo', control: 'Input', style: {width: '60px'}},
                    {title: '公鸡起始笼号', key: 'cockCageNumberFrom', control: 'Input', style: {width: '60px'}},
                    {title: '公鸡结束笼号', key: 'cockCageNumberTo', control: 'Input', style: {width: '60px'}}
                ],
                data: [],
                // addButtonText: '新增栋',
                // saveButtonText: '保存栋',
                loading: false,
                addMode: true,
                saveMode: true,
                deleteMode: true,
                addTemplate: {}
            }
        };
    },
    methods: {
        pageChangeHandlerDong (index) {
            this.pageDong.current = index;
            this.syncTableDongData();
        },
        syncTableDongData () {
            this.tableDong.loading = true;
            axiosToken({
                url: '/a/config/building',
                data: {
                    farmId: this.changSelectId,
                    pageNo: this.pageDong.current,
                    pageSize: this.pageDong.size
                }
            })
            .then(res => {
                let rowMaker = ({
                    id = '',
                    name = '',
                    henCageNumberFrom = '',
                    henCageNumberTo = '',
                    cockCageNumberFrom = '',
                    cockCageNumberTo = ''
                }) => ({
                    id,
                    name,
                    henCageNumberFrom,
                    henCageNumberTo,
                    cockCageNumberFrom,
                    cockCageNumberTo,
                    delFlag: '0'
                });
                // 缓存
                let page = res.data.page;
                // 表格数据 只要需要提交的
                let list = page.list ? page.list : [];
                this.tableDong.data = list.map(e => rowMaker(e));
                this.tableDong.loading = false;
                // 分页设置
                this.pageDong.current = page.pageNo;
                this.pageDong.total = page.total;
                this.pageDong.size = page.pageSize;
                // 新增行设置
                this.tableDong.addTemplate = rowMaker({});
            })
            .catch(error => {
                this.tableDong.loading = false;
                axiosErrorHandler(error);
            });
        },
        vTableSaveHandlerDong (rows) {
            // 校验
            if (rows.some(e => {
                if (e.delFlag === '1') {
                    return false;
                } else {
                    return e.name === '' ||
                    e.henCageNumberFrom === '' ||
                    e.henCageNumberTo === '' ||
                    e.cockCageNumberFrom === '' ||
                    e.cockCageNumberTo === '';
                }
            })) {
                this.$Message.error('数据校验没有通过');
                return;
            }
            if (rows.length === 0) {
                this.$Message.error('没有需要提交的数据');
                return;
            }
            // 提交
            axiosToken({
                url: '/a/config/building',
                method: 'post',
                data: rows.map(e => {
                    e.farmId = this.changSelectId;
                    return e;
                })
            })
            .then(res => {
                if (res.data.code === 0) {
                    this.$Message.success(res.data.msg);
                    this.syncTableDongData();
                } else {
                    this.$Message.error(res.data.msg);
                }
            })
            .catch(error => axiosErrorHandler(error));
        },
        resetPageDong () {
            this.pageDong.current = 1;
            this.pageDong.total = 0;
            this.pageDong.size = 10;
        }
    }
};
