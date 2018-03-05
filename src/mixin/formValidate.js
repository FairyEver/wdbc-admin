// mixin作用介绍
// 为组件提供表单校验

// 使用方法
// 在组件内混合并 并使用提供的方法
export default {
    methods: {
        // 校验表单
        tryFormValidate (name) {
            // 参数 表单的ref值
            let validRes = false;
            this.$refs[name].validate((valid) => {
                validRes = valid;
            });
            return validRes;
        }
    }
};
