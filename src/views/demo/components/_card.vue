<template>
    <Card dis-hover style="margin-bottom: 10px;">
        <Row :gutter="10">
            <Col :span="l">
                <slot></slot>
            </Col>
            <Col :span="r">
                <CodeBase :data="code" :stringify="false"></CodeBase>
            </Col>
        </Row>
    </Card>
</template>

<script>
import CodeBase from '@/components/code/base.vue';
export default {
    components: {
        CodeBase
    },
    props: {
        l: { default: 10 },
        r: { default: 14 },
        code: { default: 'no code' }
    }
};
</script>

