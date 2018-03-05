<template>
    <div>
        <Select
            v-model="currentValue"
            filterable
            remote
            :remote-method="remoteMethod"
            :loading="loading"
            :placeholder="placeholder"
            loading-text="正在过滤"
            :clearable="true"
            v-bind="$attrs">
            <Option v-for="(option, index) in optionsDisplay" :value="option.value" :key="index">{{option.label}}</Option>
        </Select>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
export default {
    props: {
        value: {default: ''},
        mode: {default: 'form'}
    },
    data () {
        return {
            currentValue: '',
            loading: false,
            optionsDisplay: []
        };
    },
    watch: {
        currentValue (value, oldValue) {
            if (value) {
                // 如果选择了一个值
                this.setNoRepeatUsed(Array.from(this.noRepeatUsedSet.add(value)));
            }
            if (oldValue) {
                // 把之前选的值还原回去
                this.noRepeatUsedSet.delete(oldValue);
                this.setNoRepeatUsed(Array.from(this.noRepeatUsedSet));
            }
            this.change(value);
        },
        value (value) {
            if (value !== this.currentValue) {
                // 这里一般是外部改变了值 组件内要是向外改变 value 不会进这个 if
                this.currentValue = value;
            }
        }
    },
    created () {
        if (this.value !== this.currentValue) {
            // 这里一般是外部改变了值 组件内要是向外改变 value 不会进这个 if
            this.currentValue = this.value;
        }
    },
    computed: {
        options () {
            return [
                ...this.noRepeatPool
            ];
        },
        placeholder () {
            return this.noRepeatPoolFilted.length + '个选项';
        },
        ...mapState([
            'noRepeatUsed',
            'noRepeatPool'
        ]),
        ...mapState({
            noRepeatPoolFilted (state) {
                return this.noRepeatPool.filter(e => {
                    return !this.noRepeatUsedSet.has(e);
                });
            }
        }),
        noRepeatUsedSet () {
            return new Set(this.noRepeatUsed);
        },
        tempOption () {
            return this.currentValue ? [{label: this.currentValue, value: this.currentValue}] : [];
        }
    },
    methods: {
        ...mapMutations([
            'setNoRepeatPool',
            'setNoRepeatUsed'
        ]),
        remoteMethod (query) {
            if (this.noRepeatPoolFilted.length === 0) {
                this.$Message.error('可选项为空');
                return;
            }
            if (query !== '') {
                this.loading = true;
                setTimeout(() => {
                    this.loading = false;
                    this.optionsDisplay = [
                        ...this.tempOption,
                        ...this.noRepeatPoolFilted.filter(e => {
                            return String(e).indexOf(query) > -1;
                        }).map(e => ({
                            label: e,
                            value: e
                        }))
                    ];
                }, 300);
            } else {
                this.optionsDisplay = [];
            }
        },
        change (value) {
            if (this.mode === 'table') {
                // 每个字典组件都需要向外发一个on-change事件 在可编辑表格里需要用到 页面环境下用不到
                this.$emit('on-change', value);
            } else if (this.mode === 'form') {
                // 在表单页面环境下使用 同步数据
                this.$emit('update:value', value);
            }
        }
    }
};
</script>

