<template>
  <pre style="margin: 0px;"><code v-html="dataHignLight"></code></pre>
</template>

<script>
import Prism from 'prismjs';
export default {
    props: {
        data: {},
        stringify: {
            default: true
        }
    },
    computed: {
        dataHignLight () {
            if (this.stringify) {
                return Prism.highlight(JSON.stringify(this.data, null, '\t'), Prism.languages.javascript);
            } else {
                return Prism.highlight(this.data, Prism.languages.javascript);
            }
        }
    }
};
</script>