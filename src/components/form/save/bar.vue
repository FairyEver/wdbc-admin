<template>
    <Card style="margin: 10px auto;" dis-hover>
        <div class="card-inner-m-10">
            <Button size="large" type="primary" @click="save">保存</Button>
        </div>
    </Card>
</template>

<script>
export default {
    methods: {
        save () {
            this.$emit('save');
        }
    }
};
</script>
