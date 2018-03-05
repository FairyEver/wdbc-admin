# Vtable

`Vtable` 组件在可以继续使用所有 iView `Table` 组件功能以外增加了一些扩展，封装了常用方法

* [x] 一个字段即可设置表格内编辑，简化了在表格内渲染组件的方法
* [x] 表格内渲染所有 iView 组件均支持组件原本所有的设置参数
* [x] 支持表格内输入控件和非输入控件的相互影响
* [x] 方便地设置操作列，支持按钮粒度权限验证

## 基本用法

```
<Vtable v-bind="table"></Vtable>
```

```
table: {
    columns: [
        {title: '姓名', key: 'name'},
        {title: '年龄', key: 'age'}
    ],
    data: []
}
```

## 属性

所有的 iView `Table` 组件支持的属性均可以直接传给 `Vtable` 组件，并扩展了一些功能

iView `Table` 组件属性略过，这里只列出扩展属性

> [iView 表格组件](https://www.iviewui.com/components/table)

### columns 列扩展

`columns` 字段支持所有的 iView `Table` 组件 `columns` 设置，并且加入了以下扩展：

#### title

`title` 属性现在可以忽略，忽略后默认值为 `key` 值

> 在 iView 中，这个默认值为 `#`

#### control

你可以在列设置上增加 `control` 字段，使此列可编辑
    
可选值
    
* Input : 渲染为输入框
    
* InputNumber : 渲染为数字输入框
    
* i-switch : 渲染为开关

* DatePicker : 渲染为日期选择器

* ... 其它全局注册的组件名称

示例
     
```
{title: '年龄', key: 'age', control: 'Input'}
```

#### props

你可以在列设置上增加 `props` 字段，此字段的值将会当做 `control` 字段指定组件的参数传入
    
示例
    
```
{
   title: '管理员',
   key: 'admin',
   control: 'i-switch',
   props: {
       trueValue: '1',
       falseValue: '0'
   }
}
// props 将会类似于 v-bind="props" 的形式传递给 i-switch 组件
```

#### children

设置了 `children` 属性后此列会变为扩展列，可以显示按钮

示例

```
columns: [
    {title: '姓名', key: 'name'},
    {
        width: 130,
        children: [
            {action: 'edit', icon: 'edit'},
            {action: 'delete', text: '删除', icon: 'trash-a'}
        ]
    }
]
```

设置了 `children` 属性后如果不设置 `title` 属性，会默认将 `title` 设置为"操作"

设置了 `children` 属性建议设置 `width` 属性为具体值

`children` 每项的属性见下

##### action

点击按钮触发的事件

##### text

按钮文字 非必选

##### icon

按钮图标 非必选

##### p

权限标识 非必选

### 新增行扩展

> @/components/tableNew/add.js
    
## 事件

### on

如果表格有扩展列，`on` 事件会将扩展列的按钮点击后的事件传递出来

#### 参数

action
    
* action.name : 对应按钮设置的 `action` 值

* action.row : 触发行数据

* action.index : 触发行的 index

#### 示例

```
<Vtable
    ref="vtable"
    v-bind="table"
    @on="vTableOnHandler">
</Vtable>
```

```
vTableOnHandler ({name, row, index}) {
    if (this[name]) {
        this[name](row, index);
    } else {
        this.$Message.error('没有匹配的 method');
    }
},
edit (row, index) {
    this.$Message.info('edit');
},
delete (row, index) {
    this.$Message.warning('delete');
}
```

### change
    
如果 `Vtable` 组件的 `columns` 中有某项带有 `control` 属性(可编辑)，在每次数据变化的时候会传递一次 `change` 事件
    
#### 参数
    
info
    
* info.row : 发生数据改变的行号
    
* info.key : 发生数据改变的key值
    
* info.value : 新的数据值
    
#### 示例
    
```
methods: {
   vTableChangeHandler ({row, key, value}) {
       console.log(`第${row}行的${key}变为了${value}`);
       // 或者显示出来便于调试
       this.$Message.info(`第 ${row} 行的 ${key} 变为了 ${value}`);
   }
}
```

## 取值

因为直接把表格数据绑定在(可编辑)表格的输入控件上会因为频繁渲染导致性能降低，在 `Vtable` 内部通过把 `data` 拷贝一份，输入控件改变的只是数据副本，避免表格再次渲染。所以在页面取值的时候需要通过 `this.$refs.vtable` 访问表格组件取编辑后的值

但是千万不要把 `this.$refs.vtable.dataCopy` 用在计算属性中

> 因为 `ref` 本身是作为渲染结果被创建的，在初始渲染的时候你不能访问它们 - 它们还不存在！`$refs` 也不是响应式的，因此你不应该试图用它在模板中做数据绑定。[https://cn.vuejs.org/v2/api/#ref](https://cn.vuejs.org/v2/api/#ref)

### 编辑后的值

在 `change` 事件触发后取值

```
// @change="vTableChangeHandler"
methods: {
   vTableChangeHandler () {
       this.dataCopyChangedRow = this.$refs.vtable.dataCopy;
   }
}
```

## 方法

通过 `ref` 访问组件的方法

### updateCell

#### 参数

info
    
* info.row : 发生数据改变的行号
    
* info.key : 发生数据改变的key值
    
* info.value : 可以是字符串 数字 布尔值 也可以是一个函数

    函数示例
    
    ```
    this.$refs.vtable.updateCell({
        row: 1,
        key: 'address',
        value: (row) => row.address + String(value),
        updateComponent: true
    });
    ```

* updateComponent

    可选

    `true` 更新此数据对应的组件上的数据
    
    `false` 只是更新组件内部的 `dataCopy` ，不更新表格内的输入组件
    
#### 示例

```
<Vtable
    ref="vtable"
    v-bind="table"
    @change="vTableChangeHandler">
</Vtable>
```

```
methods: {
    vTableChangeHandler ({row, key, value}) {
        if (key === 'age') {
            this.$refs.vtable.updateCell({
                row,
                key: 'address',
                value: (row) => row.address + String(value),
                updateComponent: true
            });
        }
    }
}
```

#### 支持的控件

因为避免表格重绘，表格数据改变实际上均没有改变 iView 表格组件上接收的 `data` 值，显示的值改变是由于对单元格内嵌套的组件进行了重赋值

目前 iView 组件为 `control` 字段可选参数的，均支持外部重新赋值

以下为 Vtable 内部实现对显示界面重新局部更新数据的逻辑

```
if (updateComponent) {
    let ref = null;
    let _row = this.$children[0].$refs.tbody.$children[row].$children;
    let _component = _row.find(e => e.$refs[String(row) + key]);
    if (_component) {
        ref = _component.$refs[String(row) + key];
        ref.currentValue = newValue;
    } else {
        _row.find(e => e.$options.propsData.column.key === key).$refs.cell.innerText = newValue;
    }
}
```

由于现在是使用 `ref.currentValue = newValue` 进行数据更新，所以无论是 iView 组件还是其它组件，只要内部数据保存在 `currentValue` 属性中，便可以直接在表格中支持数据刷新

目前测试 `Input` `InputNumber` 组件支持良好，其它的暂时没有测验但理论可行，这部分逻辑日后会优化

