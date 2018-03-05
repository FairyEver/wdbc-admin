export default `
<template>
    <div>
        <Form inline>
            <FormItem :label="'VAL 1 : ' + val1"><NoRepeat :value.sync="val1"></NoRepeat></FormItem>
            <FormItem :label="'VAL 2 : ' + val2"><NoRepeat :value.sync="val2"></NoRepeat></FormItem>
            <FormItem :label="'VAL 3 : ' + val3"><NoRepeat :value.sync="val3"></NoRepeat></FormItem>
            <FormItem :label="'VAL 4 : ' + val4"><NoRepeat :value.sync="val4"></NoRepeat></FormItem>
            <FormItem :label="'VAL 5 : ' + val5"><NoRepeat :value.sync="val5"></NoRepeat></FormItem>
            <FormItem :label="'VAL 6 : ' + val6"><NoRepeat :value.sync="val6"></NoRepeat></FormItem>
        </Form>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
export default {
    data () {
        return {
            val1: '',
            val2: '',
            val3: '',
            val4: '',
            val5: '',
            val6: ''
        };
    },
    computed: {
        ...mapState([
            'noRepeatUsed',
            'noRepeatPool'
        ])
    },
    created () {
        this.cleanPool();
        this.setPool();
    },
    methods: {
        ...mapMutations([
            'setNoRepeatPool'
        ]),
        setPool () {
            this.setNoRepeatPool([...Array(5000)].map((e, index) => 1 + index));
        },
        cleanPool () {
            this.setNoRepeatPool([]);
        }
    }
};
</script>`;
