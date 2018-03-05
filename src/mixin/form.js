// 公用的 列表 - 表单 模式
import { axiosToken, axiosErrorHandler } from '@/plugins/axios.js';
import * as tool from '@/assets/library/tool.js';
export default {
    data: () => {
        return {
            setting: {
                brotherName: 'home_index',
                mode: 'new' // new edit
            },
            ready: false,
            // 表单
            form: {}
        };
    },
    created () {
        this.checkMyParams();
    },
    methods: {
        checkMyParams () {
            let dataToFrom = data => {
                // 你可以在页面中新建一个 dataToFrom 方法代替这一步
                if (this.dataToFrom) {
                    this.dataToFrom(data);
                } else {
                    // 默认方案
                    // 循环给字段赋值 (需要 data.role)
                    let _data = data.role || data;
                    for (var key of Object.keys(this.form)) {
                        if (_data[key] !== undefined) {
                            this.form[key] = _data[key];
                        }
                    }
                }
            };
            // 检查params
            this.ready = false;
            let params = tool.clone(this.$route.params);
            // 检查是否有传递给此页面的参数
            if (params.for === this.setting.myName) {
                // 如果带有from属性 将此属性赋值给兄弟属性
                if (params.from) {
                    this.setting.brotherName = params.from;
                }
                // 模式
                if (params.mode) {
                    this.setting.mode = params.mode;
                }

                // [Handler] 开始初始化 在created和重新显示的时候都会调用 这时候 setting.brotherName 和 setting.mode 已经赋值
                if (this.initStartHandler) {
                    this.initStartHandler();
                }

                // 新增模式初始化数据
                if (this.setting.mode === 'new') {
                    this.form = tool.clone(this.formEmpty);
                    // 上一步先赋值时因为有的字段是在对象中的 不嫌赋值会报错
                    let dataGetWay = params.dataGetWay || 'row';
                    if (dataGetWay === 'new') {
                        // 请求这一条的数据
                        axiosToken({
                            url: this.setting.API + '/id'
                        }).then(res => {
                            // 如果表单页面只是在编辑模式下需要重新请求数据
                            // 你可以在页面文件中增加 dataToFrom 方法，覆盖上面的 dataToFrom
                            // 判断 this.setting.mode === 'edit' 再进行赋值
                            dataToFrom(res.data);
                            this.ready = true;
                        }).catch(error => {
                            axiosErrorHandler(error);
                            this.ready = true;
                        });
                    }
                }

                // 编辑模式初始化数据
                if (this.setting.mode === 'edit') {
                    this.form = tool.clone(this.formEmpty);
                    // 上一步先赋值时因为有的字段是在对象中的 不嫌赋值会报错
                    let dataGetWay = params.dataGetWay || 'row';
                    if (dataGetWay === 'new') {
                        // 请求这一条的数据
                        axiosToken({
                            url: this.setting.API + '/' + params.dataGetId
                        }).then(res => {
                            dataToFrom(res.data);
                            this.ready = true;
                        }).catch(error => {
                            axiosErrorHandler(error);
                            this.ready = true;
                            // this.paramsErrorHandler();
                        });
                    } else {
                        // 数据获取方式 - 从之前的行数据里获取
                        if (this.paramsValidate ? this.paramsValidate(params) : true) {
                            // 通过了校验
                            if (params.data) {
                                if (params.data.row) {
                                    // 有行数据
                                    // 删除多余的数据
                                    delete (params.data.row._index);
                                    delete (params.data.row._rowKey);
                                    dataToFrom(params.data.row);
                                    this.ready = true;
                                }
                            } else {
                                // 没有行数据 这是新增模式
                                this.form = tool.clone(this.formEmpty);
                                this.ready = true;
                            }
                        } else {
                            this.$Message.error('页面参数校验失败，即将自动关闭');
                            this.paramsErrorHandler();
                        }
                    }
                }
            } else {
                this.paramsErrorHandler();
            }
        },
        paramsErrorHandler () {
            // 页面参数校验失败
            this.closeMeTo({
                name: this.setting.brotherName
            });
        },
        returnBrother () {
            // 返回列表页面
            this.closeMeTo({
                name: this.setting.brotherName,
                params: {
                    for: this.setting.brotherName,
                    data: {
                        reload: true
                    }
                }
            });
        },
        submitHandler () {
            // 提交
            let syncEnd = res => {
                // 接收本函数内提交后的数据 判断接下来的操作
                if (res.data.code === 0) {
                    this.$Message.success(res.data.msg);
                    this.returnBrother();
                } else {
                    this.$Message.error(res.data.msg);
                    this.ready = true;
                }
            };
            if (this.setting.mode === '') {
                this.$Message.error('未知提交模式');
                return;
            }
            this.$refs.form.validate((valid) => {
                if (valid) {
                    this.ready = false;
                    // 可以在外部设置表单数据 也可以使用默认的form数据
                    let _form = this.formSendDataMaker ? this.formSendDataMaker() : this.form;
                    axiosToken({
                        url: this.setting.API,
                        method: 'post',
                        data: {
                            ..._form
                        }
                    }).then(res => {
                        syncEnd(res);
                        if (this.setting.myName === 'sys-menu-form') {
                            // 请求侧边栏数据
                            axiosToken({
                                url: '/a/sys/nav'
                            }).then(res => {
                                this.$store.commit('setPermissionList', res.data.permissionList);
                                this.$store.commit('setNavList', res.data.menuList);
                                this.$router.push({
                                    name: 'home_index'
                                });
                            }).catch(error => axiosErrorHandler(error));
                        }
                    }).catch(error => axiosErrorHandler(error));
                } else {
                    this.$Message.error('表单校验失败');
                }
            });
        }
    }
};
