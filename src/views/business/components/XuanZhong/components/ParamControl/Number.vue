<template>
    <span>
        <!-- 气泡模式 -->
        <Poptip
            v-if="this.$slots.default"
            trigger="click"
            title="设置参数"
            placement="right"
            width="300">
            <div slot="content" style="height: 300px;">
                <div v-for="(item, index) in currentValue.value" :key="index" style="margin-bottom: 10px;">
                    <Form label-position="top" inline>
                        <FormItem label="启用">
                            <i-switch v-model="currentValue.value[index].enable"></i-switch>
                        </FormItem>
                        <FormItem label="符号">
                            <Select v-model="currentValue.value[index].sym" style="width:100px">
                                <Option v-for="item in options" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="值">
                            <InputNumber v-model="currentValue.value[index].value"></InputNumber>
                        </FormItem>
                    </Form>
                </div>
            </div>
            <slot></slot>
        </Poptip>
        <!-- 一般模式 -->
        <template v-else>
            <div v-for="(item, index) in currentValue.value" :key="index" style="margin-bottom: 10px;">
                <Form label-position="top" inline>
                    <FormItem style="margin-bottom: 0px;" label="启用">
                        <i-switch v-model="currentValue.value[index].enable"></i-switch>
                    </FormItem>
                    <FormItem style="margin-bottom: 0px;" label="符号">
                        <Select v-model="currentValue.value[index].sym" style="width:100px">
                            <Option v-for="item in options" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem style="margin-bottom: 0px;" label="值">
                        <InputNumber v-model="currentValue.value[index].value"></InputNumber>
                    </FormItem>
                </Form>
            </div>
        </template>
    </span>
</template>

<script>
import publicMixin from './public'
export default {
    mixins: [
        publicMixin
    ],
    data () {
        return {
            options: [
                {label: '大于', value: '>'},
                {label: '大于等于', value: '>='},
                {label: '小于', value: '<'},
                {label: '小于等于', value: '<='},
                {label: '等于', value: '='}
            ]
        }
    }
}
</script>

