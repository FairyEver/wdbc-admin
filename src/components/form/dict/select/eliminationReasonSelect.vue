<template>
    <Select
        v-model="model"
        clearable
        @on-change="change"
        :placeholder="placeholder"
        :filterable="filterable"
        :style="style"
        v-bind="$attrs">
        <Option
            v-for="item in optionsSelf"
            :value="item.value"
            :key="item.value">
            {{ item.label }}
        </Option>
    </Select>
</template>

<script>
// 库
import { axiosToken, axiosErrorHandler } from '@/plugins/axios.js';
export default {
    props: {
        // 必要参数
        value: { default: '' },
        // 不是必选参数
        placeholder: { default: '' },
        clearable: { default: true },
        filterable: { default: false }
    },
    data () {
        return {
            model: '',
            optionsSelf: [],
            list: []
        };
    },
    computed: {
        style () {
            return {
                width: '100px'
            };
        }
    },
    created () {
        this.model = this.value;
        this.getOptions();
    },
    methods: {
        getOptions () {
            // 需要请求options
            axiosToken({
                url: '/a/config/eliminationReason/eliminationReasonList'
            }).then(res => {
                this.list = res.data.list;
                this.optionsSelf = this.list.map(e => ({
                    value: e.id,
                    label: e.name
                }));
            }).catch(error => axiosErrorHandler(error));
        },
        change (value) {
            this.$emit('update:value', value);
        }
    }
};
</script>
