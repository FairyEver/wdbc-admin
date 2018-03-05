<template>
    <div style="height: 600px; overflow: scroll;">
        <ButtonGroup vertical>
            <Button v-for="item in list"
                :key="item"
                :type="item === pen ? 'primary' : 'default'"
                @click="penChange(item)">
                {{item}}
            </Button>
        </ButtonGroup>
    </div>
</template>

<script>
// 库
import { axiosToken, axiosErrorHandler } from '@/plugins/axios.js';
export default {
    props: {
        pen: {default: ''},
        penTotal: {default: 0},
        strain: {default: ''},
        gen: {default: ''},
        dateFlow: {default: ''},
        url: {default: '/a/hatch/hatchMain/searchCountPen'}
    },
    data () {
        return {
            list: []
        }
    },
    methods: {
        // 改变家系
        penChange (item) {
            this.$emit('update:pen', item);
        },
        // 切换到下一家系
        nextPen () {
            let index = this.list.findIndex(e => e === this.pen);
            let nextIndex = index < this.list.length - 1 ? index + 1 : 0;
            this.$emit('update:pen', this.list[nextIndex]);
        },
        // 获取家系列表
        getCountPen () {
            axiosToken({
                url: this.url,
                data: {
                    strain: this.strain,
                    gen: this.gen,
                    dateFlow: this.dateFlow
                }
            }).then(res => {
                this.list = res.data.list;
                this.$emit('update:penTotal', this.list.length);
            }).catch(error => axiosErrorHandler(error));
        }
    }
}
</script>
