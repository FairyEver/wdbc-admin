<template>
  <div>
    <div v-if="mode === 'tag'">
      <Tag
        v-for="(item, index) in options"
        :key="index"
        type="dot"
        color="blue"
        @click.native="handler(item)">
        {{item.label}}
      </Tag>
    </div>
    <div v-if="mode === 'select'">
      <Select
        :filterable="true"
        placeholder="选择变量"
        @on-change="selectChange">
          <Option
            v-for="(item, index) in options"
            :key="index"
            :value="index">
            {{ item.label }}
          </Option>
      </Select>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      required: false,
      default: () => []
    },
    mode: {
      type: String,
      required: false,
      default: 'tag'
    }
  },
  methods: {
    selectChange (index) {
      this.handler(this.options[index])
    },
    handler (item) {
      this.$emit('select', {
        type: 'variable',
        ...item
      })
    }
  }
}
</script>

