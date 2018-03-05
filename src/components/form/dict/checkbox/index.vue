<template>
    <CheckboxGroup
        v-model="currentValue"
        @on-change="change">
        <Checkbox
            v-for="item in currentOptions"
            :key="item.value"
            :label="item.value">
            {{item.label}}
        </Checkbox>
    </CheckboxGroup>
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
            currentValue: [],
            currentValueType: 'array'
        };
    }
};
</script>

