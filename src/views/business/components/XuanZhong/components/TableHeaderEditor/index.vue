<template>
    <Collapse v-model="collapse" style="margin-bottom: 10px;">
        <Panel name="1">
            编辑列显示
            <div slot="content">
                <Checkbox
                    v-for="(item, index) in currentValue"
                    :key="index"
                    v-model="currentValue[index].display">
                    {{item.title}} {{chinesePEG(item.PEG)}}
                </Checkbox>
            </div>
        </Panel>
    </Collapse>
</template>

<script>
export default {
    props: {
        value: {
            type: Array,
            required: false,
            default: () => []
        }
    },
    data () {
        return {
            collapse: '',
            currentValue: []
        }
    },
    created () {
        this.currentValue = this.value
    },
    watch: {
        // 参数值变化了 内部值更新
        value: {
            handler (value) {
                this.currentValue = [...value]
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
    },
    methods: {
        chinesePEG (PEG) {
            switch (PEG) {
                case 'P':
                    return '表型值'
                case 'E':
                    return '育种值'
                case 'G':
                    return '基因值'
                default:
                    return ''
            }
        }
    }
}
</script>
