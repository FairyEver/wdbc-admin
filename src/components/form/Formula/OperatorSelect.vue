<template>
  <div>
    <ButtonGroup>
      <Button
        v-for="(item, index) in options"
        :key="index"
        size="large"
        @click="handler(item)">
        {{item.label}}
      </Button>
    </ButtonGroup>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      required: false,
      default: () => []
    }
  },
  methods: {
    handler (item) {
      this.$emit('select', {
        type: 'operator',
        ...item
      })
    }
  }
}
</script>
