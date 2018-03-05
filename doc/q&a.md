# Q&A

## 怎样控制表格最后一列按钮的权限

在需要控制权限的按钮上添加 `p` 属性，值为权限名称

示例

```
columnsExtend: [
    {
        width: 140,
        children: [
            {action: 'edit', text: '修改(权限控制)', p: 'sys:user:edit'},
            {action: 'delete', text: '删除(没有权限控制)'}
        ]
    }
]
```

## 怎样控制表单按钮权限

有两种方式

* 使用 `v-p=""` 自定义指令

示例

```
<FormItem label="新增" v-p="'sys:user:add'">
    <Button type="ghost" @click="add">
        <Icon type="plus"></Icon>
   </Button>
</FormItem>
```

这种方法相当于添加了 `style="display: none;"`

* 使用全局注册的权限判断方法

> 在表格组件内部使用的是这种方式

示例

```
<FormItem label="新增" v-if="$root.p('sys:user:add')">
    <Button type="ghost" @click="add">
        <Icon type="plus"></Icon>
   </Button>
</FormItem>
```

这种方式由于使用 `v-if` 故不会渲染节点内容

> 也可以在 `v-show` 使用

不管使用什么方法，都首先应该在菜单管理中配置好响应的权限标识

## 怎样在表格最后一列的按钮上添加图标

在需要控制添加图标的按钮上添加 `icon` 属性，值为图标名称

> 全部图标见 [https://www.iviewui.com/components/icon](https://www.iviewui.com/components/icon)

示例

```
columnsExtend: [
    {
        width: 180,
        children: [
            {action: 'assign', text: '分配'},
            {action: 'edit', icon: 'edit'},
            {action: 'delete', text: '删除', icon: 'gear-b'}
        ]
    }
]
```

