<template>
    <div>
        <Form inline>
            <FormItem label="数量">
                <InputNumber :max="5000" :min="1" v-model="num"></InputNumber>
            </FormItem>
            <FormItem label="设置">
                <Button @click="setPool"><Icon type="archive"></Icon> 设置选项池</Button>
            </FormItem>
            <FormItem label="清空">
                <Button @click="cleanPool"><Icon type="trash-b"></Icon> 清空选项池</Button>
            </FormItem>
        </Form>
        <Form inline>
            <FormItem :label="'VAL 1 : ' + val1"><NoRepeat :value.sync="val1" v-bind="setting"></NoRepeat></FormItem>
            <FormItem :label="'VAL 2 : ' + val2"><NoRepeat :value.sync="val2" v-bind="setting"></NoRepeat></FormItem>
            <FormItem :label="'VAL 3 : ' + val3"><NoRepeat :value.sync="val3" v-bind="setting"></NoRepeat></FormItem>
            <FormItem :label="'VAL 4 : ' + val4"><NoRepeat :value.sync="val4" v-bind="setting"></NoRepeat></FormItem>
            <FormItem :label="'VAL 5 : ' + val5"><NoRepeat :value.sync="val5" v-bind="setting"></NoRepeat></FormItem>
            <FormItem :label="'VAL 6 : ' + val6"><NoRepeat :value.sync="val6" v-bind="setting"></NoRepeat></FormItem>
        </Form>
        <Row :gutter="10">
            <Col span="6">
                <Card dis-hover>
                    <p slot="title">信息</p>
                    <p>noRepeatUsed.length : {{noRepeatUsed.length}}</p>
                    <p>noRepeatPool.length : {{noRepeatPool.length}}</p>
                </Card>
            </Col>
            <Col span="18">
                <Card dis-hover>
                    <p slot="title">选项池</p>
                    <Input :value="noRepeatPool.join(' | ')" type="textarea" :rows="6" placeholder="waiting ..."></Input>
                </Card>
                <br>
                <Card dis-hover>
                    <p slot="title">已用选项池</p>
                    <Input :value="noRepeatUsed.join(' | ')" type="textarea" :rows="3" placeholder="waiting ..."></Input>
                </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
export default {
    data () {
        return {
            num: 5000,
            val1: '',
            val2: '',
            val3: '',
            val4: '',
            val5: '',
            val6: '',
            setting: {}
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
    },
    methods: {
        ...mapMutations([
            'setNoRepeatPool'
        ]),
        setPool () {
            this.setNoRepeatPool([...Array(this.num)].map((e, index) => 1 + index));
        },
        cleanPool () {
            this.setNoRepeatPool([]);
        }
    }
};
</script>

