// mixin作用介绍
// 创建输入控件

// 使用方法
// 使用携带的方法
export default {
    methods: {
        inputBuilder (e, h, params) {
            let temp = params.row[params.column.key];
            let inputActionBuilder = () => {
                switch (e.control.split('|')[0]) {
                    case 'Input':
                        return {
                            'on-change': (e) => { temp = e.target.value; },
                            'on-blur': () => { this.$emit('enter', {row: params.index, key: params.column.key, value: temp}); },
                            'on-enter': () => { this.$emit('enter', {row: params.index, key: params.column.key, value: temp}); }
                        };
                    case 'i-switch':
                        return {
                            'on-change': (e) => { this.$emit('enter', {row: params.index, key: params.column.key, value: e}); }
                        };
                    case 'DatePicker':
                        switch (e.control.split('|')[1]) {
                            case 'datetime':
                                return {
                                    'on-change': (e) => { temp = e; },
                                    'on-ok': () => { this.$emit('enter', {row: params.index, key: params.column.key, value: temp}); }
                                };
                            default:
                                return {
                                    'on-change': (e) => { this.$emit('enter', {row: params.index, key: params.column.key, value: e}); }
                                };
                        }
                    case 'DictSelect':
                        return {
                            'on-change': (e) => { this.$emit('enter', {row: params.index, key: params.column.key, value: e}); }
                        };
                    default:
                        return {};
                }
            };
            // 属性生成器
            let propsBuilder = () => {
                let _props = e.props || {};
                switch (e.control.split('|')[0]) {
                    case 'Input':
                        return {
                            ..._props
                        };
                    case 'i-switch':
                        return {
                            ..._props
                        };
                    case 'DatePicker':
                        switch (e.control.split('|')[1]) {
                            case 'datetime':
                                return {
                                    type: e.control.split('|')[1],
                                    confirm: true,
                                    ..._props
                                };
                            default:
                                return {
                                    type: e.control.split('|')[1],
                                    ..._props
                                };
                        }
                    case 'DictSelect':
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
            // 创建一个控件
            return h(e.control.split('|')[0], {
                props: {
                    value: temp,
                    ...propsBuilder()
                },
                on: {
                    ...inputActionBuilder()
                }
            });
        }
    }
};
