// mixin作用介绍
// 关闭某个tab页面

// 使用方法
// closeMeTo(to)
// 参数 to 新的路由对象 基本应该包含一个 name 属性
export default {
    data: () => {
        return {
            closeMe: {
                currentPageName: '',
                // 如果调用函数的时候没有定义关闭自身后跳转到哪里 使用这个默认设置
                to: {
                    name: 'home_index'
                }
            }
        };
    },
    created () {
        this.closeMe.currentPageName = this.$route.name;
    },
    methods: {
        closeMeTo (to) {
            let toObj = to || this.closeMe.to;
            this.$store.commit('removeTag', this.closeMe.currentPageName);
            this.$store.commit('closePage', this.closeMe.currentPageName);
            localStorage.pageOpenedList = JSON.stringify(this.$store.state.pageOpenedList);
            this.$router.push(toObj);
        }
    }
};
