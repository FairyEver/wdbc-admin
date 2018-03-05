<template>
    <Tabs>
        <TabPane label="选育点1 计算等级3">
            <XuanZhong :stage="1" :grade="3" @submit="handleSubmitStage1Grade3"></XuanZhong>
        </TabPane>
        <TabPane label="选育点1 计算等级1和2">
            <XuanZhong :stage="1" :grade="21" @submit="handleSubmitStage1Grade21"></XuanZhong>
        </TabPane>
    </Tabs>
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
        handleSubmitStage1Grade3 (poolCompute, params, setting) {
            this.xzSubmit(poolCompute, params, setting, 3, 21)
        },
        handleSubmitStage1Grade21 (poolCompute, params, setting) {
            this.xzSubmit(poolCompute, params, setting, 2, 1)
        }
    }
}
</script>
