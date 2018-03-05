// 创建输入控件
import * as tool from '@/assets/library/tool.js';
import qs from 'qs';
// qs.stringify(data)
export default {
    data () {
        return {
            // 用来存储原始数据
            dataCopy: [],
            // 用来显示数据
            dataDisplay: []
        };
    },
    computed: {
        // 返回发生了数据变化的所有行
        changedRow () {
            let _dataCopy = tool.clone(this.dataCopy);
            return _dataCopy.filter((e, index) => {
                if (e._isAddRow) {
                    delete _dataCopy[index]._isAddRow;
                    return true;
                }
                if (qs.stringify(e) !== qs.stringify(this.data[index])) {
                    return true;
                }
            });
        }
    },
    methods: {
        updateCell ({row, key, value, updateComponent = false}) {
            // 更改一个单元格的值
            let newValue = typeof value === 'function' ? value(this.dataCopy[row]) : value;
            if (this.dataCopy[row][key] !== newValue) {
                this.dataCopy[row][key] = newValue;
                this.$emit('change', {
                    row,
                    key,
                    value: newValue
                });
            }
            if (updateComponent) {
                let ref = null;
                // this.$children[0] 是表格
                let _row = this.$children[0].$refs.tbody.$children[row].$children;
                let _component = _row.find(e => e.$refs[String(row) + key]);
                if (_component) {
                    ref = _component.$refs[String(row) + key];
                    ref.currentValue = newValue;
                } else {
                    _row.find(e => e.$options.propsData.column.key === key).$refs.cell.innerText = newValue;
                }
            }
        },
        // 创建表单控件 或者其他全局注册的组件
        controlBuilder (e, h, params) {
            // 创建控件事件接收设置
            let actionBuilder = () => {
                // 不管什么类型的控件都会携带的数据
                let publicData = {
                    row: params.index,
                    key: params.column.key
                };
                // 区分
                switch (e.control) {
                    case 'Input':
                        return {
                            'on-change': (e) => {
                                this.updateCell({
                                    ...publicData,
                                    value: e.target.value
                                });
                            }
                        };
                    default:
                        return {
                            'on-change': (e) => {
                                this.updateCell({
                                    ...publicData,
                                    value: e
                                });
                            }
                        };
                }
            };
            // 属性生成器
            let propsBuilder = () => {
                let _props = e.props || {};
                switch (e.control.split('|')[0]) {
                    case 'DictSelect':
                        return {
                            mode: 'table',
                            ..._props
                        };
                    case 'NoRepeat':
                        return {
                            mode: 'table',
                            ..._props
                        };
                    default:
                        return {
                            ..._props
                        };
                }
            };
            // 样式生成器
            let styleBuilder = () => {
                let _style = e.style || {};
                return _style;
            };
            // 创建一个控件
            return h(e.control, {
                props: {
                    value: params.row[params.column.key],
                    ...propsBuilder()
                },
                style: {
                    ...styleBuilder()
                },
                on: {
                    ...actionBuilder()
                },
                ref: String(params.index) + e.key
            });
        }
    }
};
