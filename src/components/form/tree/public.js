import { axiosToken, axiosErrorHandler } from '@/plugins/axios.js';
export default {
    props: {
        value: { default: '' },
        // poptip
        poptipTitle: { default: '预览' },
        poptipConnectText: { default: ' : ' },
        poptipEmptyText: { default: '没有选择的项目' },
        poptipPlacement: { default: 'bottom' },
        poptipInvalidText: { default: '无效ID' },
        poptipInvalidHide: { default: true },
        // 按钮
        buttonIcon: { default: 'android-checkbox-outline' },
        buttonText: { default: '选择' },
        buttonTextLoading: { default: 'Loading...' }
    },
    data () {
        return {
            modal: {
                show: false
            },
            tree: {
                loading: false,
                data: []
            }
        };
    },
    computed: {
        ztree () {
            return this.$refs.ztree;
        },
        valueArray () {
            // 返回value值转换成的数组
            return this.value.split(',');
        },
        nameAndValueArray () {
            // 返回value值的对应标题数组
            // 返回的是类似 A : 1234 这种格式
            if (this.tree.data.length === 0) {
                return this.valueArray;
            } else {
                let textArr = this.valueArray.map(e => {
                    let obj = this.tree.data.find(d => d.id === e);
                    return obj ? obj.name + this.poptipConnectText + e : this.poptipInvalidText;
                });
                return this.poptipInvalidHide ? textArr.filter(t => t !== this.poptipInvalidText) : textArr;
            }
        },
        nameArray () {
            // 返回的是将value翻译成label的数组
            if (this.tree.data.length === 0) {
                return this.valueArray;
            } else {
                let textArr = this.valueArray.map(e => {
                    let obj = this.tree.data.find(d => d.id === e);
                    return obj ? obj.name : this.poptipInvalidText;
                });
                return this.poptipInvalidHide ? textArr.filter(t => t !== this.poptipInvalidText) : textArr;
            }
        },
        buttonTextComputed () {
            // 按钮上的文字
            let _buttonText = '';
            if (this.nameArray.length === 0) {
                _buttonText = this.buttonText;
            }
            if (this.nameArray.length === 1) {
                _buttonText = this.nameArray[0];
            }
            if (this.nameArray.length > 1) {
                _buttonText = `已选择${this.nameArray.length}项`;
            }
            return this.tree.loading ? this.buttonTextLoading : _buttonText;
        }
    },
    watch: {
        'modal.show' (value) {
            if (value) {
                if (this.modalShowHandler) { this.modalShowHandler(); }
            } else {
                if (this.modalHideHandler) { this.modalHideHandler(); }
            }
        }
    },
    created () {
        this.syncTreeData();
    },
    methods: {
        syncTreeData () {
            // 获得树的数据
            this.tree.loading = true;
            axiosToken({
                url: this.setting.API
            }).then(res => {
                this.tree.data = res.data;
                this.tree.loading = false;
            }).catch(error => axiosErrorHandler(error));
        },
        modalOk () {
            this.$emit('update:value', this.ztree.getTreeValue().map(e => e.id).join(','));
        }
    }
};
