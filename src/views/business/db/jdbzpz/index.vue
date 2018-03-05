<template>
    <Card dis-hover>
        <p slot="title">集蛋标志配置</p>
        <Button slot="extra" size="small" type="primary" @click="submit">保存</Button>
        <h2 style="margin-bottom: 4px;">集蛋总数指标ID</h2>
        <DictRadio :value.sync="val1" :options="options"></DictRadio>
        <div style="height: 20px;"></div>
        <h2 style="margin-bottom: 4px;">不合格蛋指标ID</h2>
        <DictCheckbox :value.sync="val2" :options="options"></DictCheckbox>
    </Card>
</template>

<script>
// 库
import { axiosToken, axiosErrorHandler } from '@/plugins/axios.js';
export default {
    data () {
        return {
            val1: '',
            val2: '',
            options: [],
            cemListId: ''
        }
    },
    mounted () {
        this.getData()
    },
    methods: {
        getData () {
            axiosToken({
                url: '/a/config/collectEggMarks'
            })
            .then(res => {
                this.val1 = res.data.cemList[0].traitIndexId1
                this.val2 = res.data.cemList[0].traitIndexId2
                this.cemListId = res.data.cemList[0].id
                this.options = res.data.tiList.map(e => ({label: e.name, value: e.code}))
            })
            .catch(error => {
                axiosErrorHandler(error);
            })
        },
        submit () {
            axiosToken({
                url: '/a/config/collectEggMarks',
                method: 'post',
                data: {
                    id: this.cemListId,
                    traitIndexId1: this.val1,
                    traitIndexId2: this.val2
                }
            })
            .then(res => {
                if (res.data.code === 0) {
                    this.$Message.success(res.data.msg);
                    this.getData();
                } else {
                    this.$Message.error(res.data.msg);
                }
            })
            .catch(error => axiosErrorHandler(error));
        }
    }
}
</script>

