<template>
    <div>
        <Row
            :gutter="10"
            v-for="(item, index) in valueArray"
            :key="index"
            :style="rowStyle(index)">
            <Col span="10">
                <Input v-model="valueArray[index][0]" placeholder="key"></Input>
            </Col>
            <Col span="10">
                <Input v-model="valueArray[index][1]" placeholder="value"></Input>
            </Col>
            <Col span="4" v-if="index !== valueArray.length - 1">
                <Button type="error" @click="deleteRow(index)">
                    <Icon type="trash-b"></Icon>
                </Button>
            </Col>
        </Row>
    </div>
</template>

<script>
export default {
    props: {
        value: {
            default: () => {
                return {}
            }
        }
    },
    data () {
        return {
            valueArray: []
        }
    },
    mounted () {
        this.valueArray = this.objToArray(this.value);
    },
    watch: {
        valueArray (value) {
            // 最后一行写字的时候新增一行
            let lastItem = value[value.length - 1]
            if (lastItem[0] || lastItem[1]) {
                this.valueArray.push(['', ''])
            }
            if (this.value !== this.nowValue) {
                this.emitNowValue();
            }
        },
        value (value) {
            if (value !== this.nowValue) {
                this.valueArray = this.objToArray(value);
            }
        }
    },
    computed: {
        nowValue () {
            return this.arrayToObj(this.valueArray.filter(e => e[0]));
        }
    },
    methods: {
        objToArray (obj) {
            return [
                ...Object.entries(obj),
                ['', '']
            ];
        },
        arrayToObj (array) {
            let obj = {};
            array.forEach(e => {
                obj[e[0]] = e[1]
            })
            return obj;
        },
        rowStyle (index) {
            return {
                marginBottom: index === this.valueArray.length - 1 ? '0px' : '10px'
            }
        },
        deleteRow (index) {
            this.valueArray.splice(index, 1);
        },
        emitNowValue () {
            this.$emit('update:value', this.nowValue)
        }
    }
}
</script>

