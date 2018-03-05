export default [
    {
        label: '分类一',
        value: 'attr1',
        children: [
            {
                label: '1.1',
                value: 'attr1-1',
                children: [
                    {label: '1.1.1', value: 'attr1-1-1'},
                    {label: '1.1.2 String', value: 'attr1-1-2', type: 'String'},
                    {label: '1.1.3', value: 'attr1-1-3'}
                ]
            },
            {
                label: '1.2',
                value: 'attr1-2',
                children: [
                    {label: '1.2.1', value: 'attr1-2-1'},
                    {label: '1.2.2', value: 'attr1-2-2'},
                    {label: '1.2.3', value: 'attr1-2-3'}
                ]
            }
        ]
    },
    {
        label: '分类二',
        value: 'attr2',
        children: [
            {
                label: '2.1',
                value: 'attr2-1',
                children: [
                    {label: '2.1.1', value: 'attr2-1-1'},
                    {label: '2.1.2', value: 'attr2-1-2'},
                    {label: '2.1.3', value: 'attr2-1-3'}
                ]
            },
            {
                label: '2.2',
                value: 'attr2-2',
                children: [
                    {label: '2.2.1', value: 'attr2-2-1'},
                    {label: '2.2.2', value: 'attr2-2-2'},
                    {label: '2.2.3', value: 'attr2-2-3'}
                ]
            }
        ]
    }
];
