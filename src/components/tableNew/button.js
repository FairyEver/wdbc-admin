// 创建按钮
export default {
    methods: {
        buttonBuilder (e, h, params, child, childIndex, p) {
            // 权限判断
            if (!p) { return; }
            // 文字
            let text = child.text ? [child.text] : [];
            // 图标
            let icon = child.icon ? [h('Icon', {
                props: {
                    type: child.icon ? child.icon : 'edit'
                },
                style: {
                    marginRight: child.text ? '5px' : '0px'
                }
            })] : [];
            let propBuilder = (e, h, params, child, childIndex) => {
                // 按钮的属性
                let pub = {
                    size: 'small'
                };
                return {
                    type: child.action === 'edit' ? 'primary' : 'ghost',
                    ...pub
                };
            };
            // 创建一个按钮
            return h('Button', {
                props: {
                    ...propBuilder(e, h, params, child, childIndex)
                },
                style: {
                    marginRight: childIndex === e.children.length - 1 ? '0px' : '5px'
                },
                on: {
                    click: () => {
                        this.$emit('on', {
                            name: child.action,
                            row: params.row,
                            index: params.index
                        });
                    }
                }
            }, [...icon, ...text]);
        }
    }
};
