// business公用模块
import { all, spread, axiosToken } from '@/plugins/axios.js';
export default {
    data: () => {
        return {
            page: {
                current: 1,
                total: 0,
                size: 15
            }
        };
    },
    methods: {
        // 页码变化
        pageChangeHandler (index) {
            this.page.current = index;
            this.syncTableData();
        },
        // 还原页码
        resetPage () {
            this.page.current = 1;
            this.page.total = 0;
            this.page.size = 15;
        },
        // 获取字典数据
        syncDictData () {
            return new Promise((resolve, reject) => {
                all(this.tableDictSetting.map(e => {
                    return axiosToken({
                        url: '/a/fns/getDictList',
                        data: {
                            type: e.type
                        }
                    });
                }))
                .then(spread((...res) => {
                    res.forEach((e, index) => {
                        this.table.columns.find(c => c.key === this.tableDictSetting[index].key).props.options = e.data.dictList;
                    });
                    resolve();
                }));
            });
        }
    }
};
