// 标记删除
export default {
    props: {
        // 删除模式
        deleteMode: {default: false},
        // 删除模式根据行数据中哪个key值进行判断是否删除
        deleteKey: {default: 'delFlag'},
        // 标记删除的值
        deleteTrueValue: {default: '1'},
        deleteFalseValue: {default: '0'}
    }
};
