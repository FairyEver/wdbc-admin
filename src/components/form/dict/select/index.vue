<template>
    <Select
        v-model="currentValue"
        clearable
        @on-change="change"
        :filterable="filterable"
        :style="style"
        v-bind="$attrs">
        <Option
            v-for="item in currentOptions"
            :value="item.value"
            :key="item.value">
            {{ item.label }}
        </Option>
    </Select>
</template>

<script>
// 字典 下拉菜单
// mixin
import dictPublic from './../dictPublic.js';
export default {
    mixins: [
        dictPublic
    ],
    props: {
        clearable: { default: true },
        width: { default: 50 },
        filterable: { default: true }
    },
    data () {
        return {
            currentValue: '',
            currentValueType: 'string'
        };
    },
    computed: {
        style () {
            return {
                minWidth: this.width + 'px'
            };
        }
    }
};
</script>
