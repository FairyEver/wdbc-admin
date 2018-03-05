// 新增行
import * as tool from '@/assets/library/tool.js';
export default {
    props: {
        addMode: {default: false},
        addButtonText: {default: '添加'},
        addButtonIcon: {default: 'plus-round'},
        addButtonType: {default: 'primary'},
        addButtonSize: {default: 'large'},
        addLineDiffrent: {default: true},
        addTemplate: {}
    },
    methods: {
        addRow () {
            let _row = {
                ...tool.clone(this.addTemplate ? this.addTemplate : this.dataCopy[this.dataCopy.length - 1]),
                _isAddRow: true
            };
            this.dataCopy.push(_row);
            this.dataDisplay = tool.clone(this.dataCopy);
            // 发出 rowChange 事件
            this.$emit('rowChange');
        },
        // 行样式
        rowClassName (row, index) {
            return (this.addLineDiffrent && row._isAddRow) ? 'v-table-row-is-add' : '';
        }
    }
};
