export default {
    props: {
        // 值
        value: {
            type: Object,
            required: false,
            default: () => ({})
        }
    },
    data () {
        return {
            currentValue: {}
        };
    },
    created () {
        // 内部值等于参数值
        this.currentValue = {...this.value}
    },
    watch: {
        // 参数值变化了 内部值更新
        value: {
            handler (value) {
                this.currentValue = {...value}
            },
            deep: true
        },
        // 内部的值变化了 要更新到外部
        currentValue: {
            handler (value) {
                if (JSON.stringify(value) !== JSON.stringify(this.value)) {
                    this.$emit('input', this.currentValue)
                }
            },
            deep: true
        }
    }
};
