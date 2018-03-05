export default {
    methods: {
        // 计算 数字类型的校验 返回 true 为校验通过
        filterNumber (value, paramValue, log = false) {
            if (log) {
                console.group('filterNumber');
                console.log(value);
                console.log(paramValue);
                console.groupEnd();
            }
            let res = true;
            paramValue.forEach(e => {
                // 启用的条件
                if (e.enable) {
                    // 最后 temp 等于 真 的话 就代表这条子条件通过了
                    let temp = true;
                    switch (e.sym) {
                        case '>':
                            temp = value > e.value;
                            break;
                        case '>=':
                            temp = value >= e.value;
                            break;
                        case '<':
                            temp = value < e.value;
                            break;
                        case '<=':
                            temp = value <= e.value;
                            break;
                        case '=':
                            temp = value === e.value;
                            break;
                        default:
                            temp = false;
                            break;
                    }
                    // 只要有一个 temp 为 false 最后返回的结果就是 false
                    if (!temp) {
                        res = false;
                    }
                }
            });
            return res;
        },
        // 计算 字符类型的校验 返回 true 为校验通过
        filterString (value, paramValue, log) {
            if (log) {
                console.group('filterString');
                console.log(value);
                console.log(paramValue);
                console.groupEnd();
            }
            // 有一个符合就变为 true
            let res = false;
            paramValue.forEach(e => {
                if (e === value) {
                    res = true;
                }
            });
            return res;
        },
        // 将符号转换为汉字
        symToChaiese (sym) {
            switch (sym) {
                case '>':
                    return '大于';
                case '>=':
                    return '大于等于';
                case '<':
                    return '小于';
                case '<=':
                    return '小于等于';
                case '=':
                    return '等于';
                default:
                    return '';
            }
        },
        filterSettingToChinese (setting) {
            if (setting.type === 'Number') {
                return setting.value.filter(e => e.enable).map(e => this.symToChaiese(e.sym) + e.value).join('并且');
            } else {
                const prefix = setting.value.length > 1 ? '符合' : '等于';
                const suffix = setting.value.length > 1 ? '其中之一' : '';
                return prefix + setting.value.join(',') + suffix;
            }
        }
    }
};
