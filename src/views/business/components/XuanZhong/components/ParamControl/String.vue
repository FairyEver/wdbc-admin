<template>
    <span>
        <!-- 气泡模式 -->
        <Poptip
            v-if="this.$slots.default"
            trigger="click"
            title="设置参数"
            placement="right"
            width="300">
            <div slot="content" style="margin: 10px 0px;">
                <div v-for="(item, index) in currentValue.value" :key="index" style="margin-bottom: 10px;">
                    <Row :gutter="10">
                        <Col :span="18">
                            <Input
                                v-model="currentValue.value[index]"
                                placeholder="输入可以通过的字符">
                            </Input>
                        </Col>
                        <Col :span="6">
                            <Button long @click="removeItem(index)" type="error">删除</Button>
                        </Col>
                    </Row>
                </div>
                <Button long @click="addItem" type="success">
                    <Icon type="plus"></Icon>
                </Button>
            </div>
            <slot></slot>
        </Poptip>
        <!-- 一般模式 -->
        <template v-else>
            <div v-for="(item, index) in currentValue.value" :key="index" style="margin-bottom: 10px;">
                <Row :gutter="10">
                    <Col :span="18">
                        <Input
                            v-model="currentValue.value[index]"
                            placeholder="输入可以通过的字符">
                        </Input>
                    </Col>
                    <Col :span="6">
                        <Button long @click="removeItem(index)" type="error">删除</Button>
                    </Col>
                </Row>
            </div>
            <Button long @click="addItem" type="success">
                <Icon type="plus"></Icon>
            </Button>
        </template>
    </span>
    
</template>

<script>
import publicMixin from './public'
export default {
    mixins: [
        publicMixin
    ],
    methods: {
        addItem () {
            this.currentValue.value.push('')
        },
        removeItem (index = 0) {
            this.currentValue.value.splice(index, 1)
        }
    }
}
</script>

