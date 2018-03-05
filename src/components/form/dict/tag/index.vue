<template>
    <Tag>{{currentValueTranslate}}</Tag>
</template>

<script>
// 字典 下拉菜单

// currentOptions

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
    },
    computed: {
        currentValueTranslate () {
            if (this.currentOptions.find(e => e.value === this.currentValue)) {
                return this.currentOptions.find(e => e.value === this.currentValue).label
            } else {
                return '匹配中...'
            }
        }
    }
};
</script>
