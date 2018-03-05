<template>
  <Poptip title="在这里插入" placement="bottom" width="300">
    <span class="insert">
      <Icon type="ios-plus-outline"></Icon>
    </span>
    <div slot="content">
      <p class="title">运算符</p>
      <OperatorSelect :options="operatorOptions" @select="handler"></OperatorSelect>
      <p class="title">变量</p>
      <VariableSelect :options="variableOptions" mode="select" @select="handler"></VariableSelect>
      <p class="title">常量</p>
      <ConstantControl @ok="handler"></ConstantControl>
      <br>
    </div>
  </Poptip>
</template>

<script>
import ConstantControl from './ConstantControl'
import OperatorSelect from './OperatorSelect'
import VariableSelect from './VariableSelect'
export default {
  components: {
    ConstantControl,
    OperatorSelect,
    VariableSelect
  },
  props: {
    index: {
      default: 0
    },
    operatorOptions: {
      default: () => []
    },
    variableOptions: {
      default: () => []
    }
  },
  methods: {
    handler (item) {
      this.$emit('select', this.index, item)
    }
  }
}
</script>

<style scoped>
.title {
  line-height: 30px;
}
.insert {
  display: inline-block;
  height: 22px;
  line-height: 22px;
  margin: 2px 2px 2px 0;
  padding: 0 2px;
  border-radius: 3px;
  border: 1px solid #FFF;
  font-size: 12px;
  vertical-align: middle;
  opacity: 1;
  overflow: hidden;
  cursor: pointer;
}
.insert:hover {
  border: 1px solid #e9eaec;
  background: #f7f7f7;
}
</style>

