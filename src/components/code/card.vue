<template>
    <Card dis-hover>
        <p v-if="title" slot="title">{{title}}</p>
        <CodeBase :data="data" v-bind="$attrs"></CodeBase>
    </Card>
</template>

<script>
import CodeBase from './base.vue';
export default {
    props: {
        data: {
            default: () => {}
        },
        title: {
            default: ''
        }
    },
    components: {
        CodeBase
    }
};
</script>

