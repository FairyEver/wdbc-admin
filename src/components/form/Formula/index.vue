<template>
  <div>
    <Button @click="modal = true">{{currentValue || '编辑公式'}}</Button>
    <Modal
        v-model="modal"
        width="1200"
        title="重新书写公式"
        ok-text="确定使用新公式"
        cancel-text="放弃"
        @on-ok="submit"
        @on-cancel="cancel">
        <Card dis-hover style="margin-bottom: 10px;">
        <div slot="title"><Button @click="gs = []">reset</Button></div>
        <GsView
          :operator-options="operatorOptions"
          :variable-options="variableOptions"
          @select="gsViewHandler"
          :gs="gs">
        </GsView>
      </Card>
      <Card dis-hover>
        <p slot="title">在最后插入</p>
        <Row :gutter="10">
          <Col span="8">
            <p style="margin-bottom: 10px;">符号</p>
            <OperatorSelect :options="operatorOptions" @select="handler"></OperatorSelect>
          </Col>
          <Col span="10">
            <p style="margin-bottom: 10px;">变量</p>
            <VariableSelect :options="variableOptions" @select="handler"></VariableSelect>
          </Col>
          <Col span="6">
            <p style="margin-bottom: 10px;">常量</p>
            <ConstantControl @ok="handler"></ConstantControl>
          </Col>
        </Row>
      </Card>
    </Modal>
  </div>
</template>

<script>
// operator 操作符
// constant 常量
// variable 变量
import GsView from './GsView'
// 常量输入
import ConstantControl from './ConstantControl'
// 操作符输入
import OperatorSelect from './OperatorSelect'
// 变量输入
import VariableSelect from './VariableSelect'
export default {
  components: {
    GsView,
    ConstantControl,
    OperatorSelect,
    VariableSelect
  },
  props: {
    value: {
      type: String,
      required: false,
      default: ''
    }
  },
  data () {
    return {
      modal: false,
      operatorOptions: [
        {label: '+', value: '+'},
        {label: '-', value: '-'},
        {label: 'x', value: '*'},
        {label: '÷', value: '/'},
        {label: '(', value: '('},
        {label: ')', value: ')'}
      ],
      variableOptions: [
        {label: 'FR1', value: 'FR1'},
        {label: 'FR2', value: 'FR2'},
        {label: 'FR3', value: 'FR3'},
        {label: 'FR4', value: 'FR4'},
        {label: 'FR5', value: 'FR5'}
      ],
      // 内部值
      currentValue: '',
      gs: []
    }
  },
  computed: {
    // 返回正则用的符号字符串
    operatorReg () {
      return this.operatorOptions.map(variable => variable.value).join('|')
    },
    // 返回正则用的变量字符串
    variableReg () {
      return this.variableOptions.map(variable => variable.value).join('|')
    }
  },
  created () {
    this.gs = this.toObj(this.value)
    this.currentValue = this.value
  },
  watch: {
    // 外部参数变化
    value (value) {
      this.gs = this.toObj(value)
      this.currentValue = value
    }
  },
  methods: {
    handler (item) {
      this.gs.push(item)
    },
    gsViewHandler (index, item) {
      this.gs.splice(index, 0, item)
    },
    submit () {
      const val = this.toString(this.gs)
      this.$emit('on-change', val)
      this.currentValue = val
    },
    cancel () {
      //
    },
    // 将公式对象转化为字符串
    toString (obj) {
      return obj.map(e => e.value).join('')
    },
    // 将公式字符串解析为对象
    toObj (string) {
      const reg = new RegExp('(' + this.variableReg + ')|(\\+|-|\\*|\\/|\\(|\\))|\\d+(\\.\\d+)?', 'g')
      const res = string.match(reg)

      // 检验是否是变量的正则
      var isVariable = new RegExp(this.variableReg, 'g')
      // 检验是否是符号的正则
      var isOperator = /\+|-|\*|\/|\(|\)/
      // 检验是否是常量的正则
      var isConstant = /\d+(\.\d+)?/

      var _res = res.map(item => {
        // 检验变量
        if (isVariable.test(item)) {
          return {
            type: 'variable',
            value: item,
            label: this.variableOptions.find(function (variable) {
              return variable.value === item
            }).label
          }
        }
        // 检验变量
        else if (isOperator.test(item)) {
          return {
            type: 'operator',
            value: item,
            label: this.operatorOptions.find(function (operator) {
              return operator.value === item
            }).label
          }
        }
        // 检验常量
        else if (isConstant.test(item)) {
          return {
            type: 'constant',
            value: item,
            label: item
          }
        }
      })

      console.log(_res)

      return _res
    }
  }
}
</script>
