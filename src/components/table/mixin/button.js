// mixin作用介绍
// 创建按钮

// 使用方法
// 使用携带的方法
export default {
    methods: {
        buttonBuilder (e, h, params, child, childIndex, p = true) {
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
            // 创建一个按钮
            return h('Button', {
                props: {
                    ...this.buttonPropBuilder(e, h, params, child, childIndex)
                },
                style: {
                    marginRight: childIndex === e.children.length - 1 ? '0px' : '5px'
                },
                on: {
                    click: () => {
                        this.$emit('emit', child.action, params.row, params.index);
                    }
                }
            }, [...icon, ...text]);
        },
        buttonPropBuilder (e, h, params, child, childIndex) {
            // 如果是按钮 返回按钮的参数
            let pub = {
                size: 'small'
            };
            return {
                type: child.action === 'edit' ? 'primary' : 'ghost',
                ...pub
            };
        }
    }
};
