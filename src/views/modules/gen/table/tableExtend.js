// 给表单页面添加可编辑表格扩展
export default {
    data: () => {
        return {
            table: {
                // 数据
                columns: [],
                data: [],
                dataCopy: [],
                // 额外
                ready: false,
                loading: false
            }
        };
    },
    methods: {
        enterHandler (info) {
            console.log('enterHandler');
            if (this.table.data[info.row][info.key] !== info.value) {
                this.table.dataCopy[info.row][info.key] = info.value;
                console.log('更新了table.dataCopy第' + info.row + '行的' + info.key + ' = ' + info.value);
            }
        }
    }
};
