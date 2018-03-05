<template>
    <div>
        <DemoCard :code="select">
            <DictSelect style="width:200px" :value.sync="value1" :placeholder="placeholder1" type="yes_no"></DictSelect>
        </DemoCard>
        <DemoCard :code="radio">
            <DictRadio :value.sync="value2" type="yes_no"></DictRadio>
        </DemoCard>
        <DemoCard :code="checkbox">
            <DictCheckbox :value.sync="value3" type="yes_no"></DictCheckbox>
        </DemoCard>
        <DemoCard :code="tag">
            <DictTag :value.sync="value4" type="Z100"></DictTag>
        </DemoCard>
    </div>
</template>

<script>
import select from './select.js';
import radio from './radio.js';
import checkbox from './checkbox.js';
import tag from './tag.js';
import DemoCard from '@/views/demo/components/_card.vue';
export default {
    data () {
        return {
            value1: '',
            value2: '',
            value3: '',
            value4: 'FH01',
            placeholder1: '请选择',
            select,
            radio,
            checkbox,
            tag
        }
    },
    components: {
        DemoCard
    }
}
</script>
