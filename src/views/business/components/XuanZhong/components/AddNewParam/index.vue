<template>
    <Cascader
        :filterable="true"
        :data="cascaderData"
        v-model="classSelect"
        trigger="hover"
        @on-change="changeHandler"
        placeholder="选择一个新的筛选条件"
        size="large"
        style="width: 300px;"
        v-bind="$attrs">
    </Cascader>
</template>

<script>
// import conditionData from './data'
import { axiosToken, axiosErrorHandler } from '@/plugins/axios.js';
export default {
    data () {
        return {
            cascaderData: [],
            classSelect: []
        }
    },
    mounted () {
        this.getData()
    },
    methods: {
        getData () {
            // this.cascaderData = conditionData
            axiosToken({
                url: '/a/config/indexDetail/indexTree',
            }).then(res => {
                this.cascaderData = res.data.list
            }).catch(error => axiosErrorHandler(error));
        },
        changeHandler (value) {
            this.findItem(value)
            setTimeout(() => {
                this.classSelect = []
            }, 1000);
        },
        // 根据选择器选择的数据 查找出选择的项目
        findItem (value) {
            let stage1 = this.cascaderData.find(e => e.value === value[0]) || {children: []}
            let stage2 = stage1.children.find(e => e.value === value[1]) || {children: []}
            let stage3 = stage2.children.find(e => e.value === value[2])
            if (stage3) {
                this.$emit('select', stage3)
            } else {
                this.$Message.error('请选择一个有效的指标')
            }
        }
    }
}
</script>

