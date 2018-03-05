<template>
    <RadioGroup
        v-model="currentValue"
        @on-change="change">
        <Radio
            v-for="item in currentOptions"
            :key="item.value"
            :label="item.value"
            :disabled="item.disabled">
            {{item.label}}
        </Radio>
    </RadioGroup>
</template>

<script>
// 字典 下拉菜单
// mixin
import dictPublic from './../dictPublic.js';
export default {
    mixins: [
        dictPublic
    ],
    data () {
        return {
            currentValue: '',
            currentValueType: 'string'
        };
    }
};
</script>

