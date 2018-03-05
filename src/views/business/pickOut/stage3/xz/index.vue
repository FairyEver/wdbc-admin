<template>
    <XuanZhong :stage="3" @submit="handleSubmitStage3"></XuanZhong>
</template>

<script>
import XuanZhong from '@/views/business/components/XuanZhong/index.vue'
import xuanZhongMixin from '@/mixin/xuanZhong.js'
export default {
    mixins: [
        xuanZhongMixin
    ],
    components: {
        XuanZhong
    },
    methods: {
        handleSubmitStage3 (poolCompute, params, setting) {
            this.xzSubmit(poolCompute, params, setting)
        }
    }
}
</script>
