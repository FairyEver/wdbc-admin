// 保存按钮
export default {
    props: {
        saveMode: {default: false},
        saveButtonText: {default: '保存'},
        saveButtonIcon: {default: 'upload'},
        saveButtonType: {default: 'success'},
        saveButtonSize: {default: 'large'}
    },
    methods: {
        saveHandler () {
            this.$emit('save', this.changedRow);
        }
    }
};
