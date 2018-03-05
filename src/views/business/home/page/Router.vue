<template>
    <Card dis-hover>
        <div slot="title">测试路由</div>
        <div>
            <Input v-model="name" size="large">
                <span slot="prepend">name</span>
            </Input>
            <div style="margin-top: 10px;">
                <Button @click="push">push</Button>
            </div>
        </div>
    </Card>
</template>

<script>
export default {
    data () {
        return {
            name: 'manage-cj-index'
        }
    },
    methods: {
        push () {
            this.$router.push({
                name: this.name
            })
        }
    }
}
</script>

