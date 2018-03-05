// 选择功能
export default {
    methods: {
        selectHandler (selection, row) {
            this.$emit('on-select', selection, row);
        },
        selectAllHandler (selection) {
            this.$emit('on-select-all', selection);
        },
        selectChangeHandler (selection) {
            this.$emit('on-selection-change', selection);
        }
    }
};
