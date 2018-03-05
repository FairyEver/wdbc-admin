<template>
    <Card dis-hover>
        <div slot="title" style="margin: -6px;">
            <slot name="title"></slot>
        </div>
        <div :style="tableGroupStyle">
            <slot></slot>
        </div>
    </Card>
</template>

<script>
export default {
    props: {
        paddingBottom: {default: 0}
    },
    computed: {
        tableGroupStyle () {
            return {
                margin: '-17px',
                paddingBottom: this.paddingBottom + 'px'
            };
        }
    }
};
</script>

