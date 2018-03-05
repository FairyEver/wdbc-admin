<template>
  <div>
    <Input
      size="large"
      v-model="constant"
      placeholder="按 Enter 键确定"
      @on-enter="ok">
    </Input>
  </div>
</template>

<script>
export default {
  data () {
    return {
      constant: ''
    }
  },
  methods: {
    ok () {
      if (this.constant) {
        this.$emit('ok', {
          type: 'constant',
          label: this.constant,
          value: this.constant
        })
        this.constant = ''
      } else {
        this.$Message.error('请不要添加空常量')
      }
    }
  }
}
</script>

