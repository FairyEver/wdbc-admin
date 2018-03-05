<template>
    <mavon-editor v-model="value"/>
</template>

<script>
import template from './template.js';
export default {
    data () {
        return {
            value: template
        };
    }
};
</script>