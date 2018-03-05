<template>
    <Page
        :total="total"
        :page-size="pageSize"
        :current="current"
        size="small"
        show-total
        show-elevator
        class="margin-top-10"
        @on-change="handleChange"
        style="margin-top: 10px;">
    </Page>
</template>

<script>
export default {
    props: {
        current: {
            default: 1
        },
        total: {
            default: 0
        },
        pageSize: {
            default: 0
        }
    },
    methods: {
        handleChange (id) {
            this.$emit('change', id);

        }
    }
};
</script>

