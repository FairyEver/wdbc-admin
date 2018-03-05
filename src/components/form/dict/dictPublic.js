// 库
import { axiosToken, axiosErrorHandler } from '@/plugins/axios.js';
export default {
    props: {
        // 必要参数
        value: { default: '' },
        type: {default: ''},
        // 不是必选参数
        url: {default: '/a/fns/getDictList'},
        mode: { default: 'form' },
        options: {default: () => []},
        addEmptyOption: {default: false},
        emptyOptionLabel: {default: '空'},
        emptyOptionValue: {default: ''}
    },
    data () {
        return {
            currentOptions: []
        };
    },
    created () {
        if (this.currentValueType === 'string') {
            this.currentValue = this.value;
        } else if (this.currentValueType === 'array') {
            this.currentValue = this.value.split(',');
        }
        this.getOptions();
    },
    watch: {
        value (value) {
            if (this.currentValue !== value) {
                if (this.currentValueType === 'string') {
                    this.currentValue = this.value;
                } else if (this.currentValueType === 'array') {
                    this.currentValue = this.value.split(',');
                }
            }
        },
        options (value) {
            if (value) {
                this.currentOptions = this.options;
            }
        }
    },
    methods: {
        getOptions () {
            let emptyOption = [{
                label: this.emptyOptionLabel,
                value: this.emptyOptionValue
            }];
            if (this.options.length === 0) {
                if (this.type !== '') {
                    // 需要请求options
                    axiosToken({
                        url: this.url,
                        data: {
                            type: this.type
                        }
                    }).then(res => {
                        this.currentOptions = [
                            ...res.data.dictList.map(e => ({
                                value: e.value,
                                label: e.label
                            })),
                            ...this.addEmptyOption ? emptyOption : []
                        ];
                    }).catch(error => axiosErrorHandler(error));
                }
            } else {
                this.currentOptions = [
                    ...this.options,
                    ...this.addEmptyOption ? emptyOption : []
                ];
            }
        },
        dataTransformer (value) {
            if (this.currentValueType === 'string') {
                return value;
            } else if (this.currentValueType === 'array') {
                return value.filter(e => e !== '').join(',');
            }
        },
        change (value) {
            if (this.mode === 'table') {
                // 每个字典组件都需要向外发一个on-change事件 在可编辑表格里需要用到 页面环境下用不到
                this.$emit('on-change', this.dataTransformer(value));
            } else if (this.mode === 'form') {
                // 在表单页面环境下使用 同步数据
                this.$emit('update:value', this.dataTransformer(value));
            }
        }
    }
};
