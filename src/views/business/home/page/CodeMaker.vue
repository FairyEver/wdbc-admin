<template>
    <div>
        <Form label-position="top" inline>
            <FormItem label="开始值">
                <Input type="text" v-model="codeFrom"></Input>
            </FormItem>
            <FormItem label="结束值">
                <Input type="text" v-model="codeTo"></Input>
            </FormItem>
            <FormItem label="每组最小">
                <InputNumber :max="setting.max" :min="setting.min" v-model="numberMin"></InputNumber>
            </FormItem>
            <FormItem label="每组最大">
                <InputNumber :max="setting.max" :min="setting.min" v-model="numberMax"></InputNumber>
            </FormItem>
            <FormItem label="OK">
                <Button type="primary" @click="start"><Icon type="play"></Icon></Button>
            </FormItem>
        </Form>
        <div style="margin-bottom: 10px;">
            <p>点击下面的例子看看</p>
            <p>
                <Tag v-for="(item, index) in eg" :key="index" @click.native="egHandler(item)">
                    {{`${item.codeFrom}到${item.codeTo} 每组最小${item.numberMin} 最大${item.numberMax}`}}
                </Tag>
            </p>
        </div>
        <Card dis-hover>
            <p slot="title">结果</p>
            {{resArray}}
        </Card>
    </div>
</template>

<script>
export default {
    data () {
        return {
            codeFrom: 'B04',
            codeTo: 'E12',
            numberMin: 0,
            numberMax: 30,
            setting: {
                min: 0,
                max: 9999
            },
            eg: [
                {
                    codeFrom: 'B04',
                    codeTo: 'E12',
                    numberMin: 0,
                    numberMax: 20
                },
                {
                    codeFrom: 'A10',
                    codeTo: 'C12',
                    numberMin: 5,
                    numberMax: 40
                },
                {
                    codeFrom: 'A10',
                    codeTo: 'C789',
                    numberMin: 0,
                    numberMax: 999
                }
            ],
            resArray: []
        };
    },
    mounted () {
        this.start();
    },
    methods: {
        start () {
            this.resArray = this.builder({
                from: this.codeFrom,
                to: this.codeTo,
                numberMin: this.numberMin,
                numberMax: this.numberMax
            })
        },
        egHandler ({codeFrom, codeTo, numberMin, numberMax}) {
            this.codeFrom = codeFrom;
            this.codeTo = codeTo;
            this.numberMin = numberMin;
            this.numberMax = numberMax;
            this.start();
        },
        builder ({from, to, numberMin, numberMax}) {
            let [fc, ...fn] = from
            let [tc, ...tn] = to
            return [].concat(...[...Array(to.charCodeAt() - from.charCodeAt() + 1)]
            .map((e, i) => from.charCodeAt() + i)
            .map(e => String.fromCharCode(e))
            .map(e => {
                let min = e === fc ? Number(fn.join('')) : numberMin
                let max = e === tc ? Number(tn.join('')) : numberMax
                return [...Array(max - min + 1)].map((n, i) => e + String(min + i).padStart(String(numberMax).length, '0'))
            }))
        }
    }
}
</script>
