import Mock from 'mockjs';
export default ({size = 8} = {}) => {
    let maker = () => {
        let num1 = Mock.Random.natural(0, 7);
        let num2 = num1 + 1;
        let num3 = num2 + 1;
        let num4 = num1 + num2 + num3;
        let needMock = {
            'id': '@id',
            'name': '@cname',
            'age': '@natural(20, 30)',
            'address': '@county(true)',
            'married': '@boolean()',
            'admin|1': ['1', '0'],
            'creatData': '@date("yyyy-M-d")',
            'updateData': '@date("yyyy-M-d HH:mm:ss")',
            'delete': '0',
            'qq': '@boolean()',
            'project': '@natural(1, 10)'
        };
        return {
            ...Mock.mock(needMock),
            num1,
            num2,
            num3,
            num4
        };
    };
    return [...Array(size)].map(() => maker());
};
