<template>
  <div style="margin: 0px 130px;">
    <Alert>公式: {{gsString}}</Alert>
    <template v-for="(item, index) in gs">
      <Insert v-bind="$attrs" :key="'insert' + index" :index="index" @select="selectHandler"></Insert>
      <Tag :key="index" :color="tagColor(item.type)"> {{item.label}}</Tag>
    </template>
  </div>
</template>

<script>
import Insert from './Insert'
export default {
  components: {
    Insert
  },
  props: {
    gs: {
      type: Array,
      required: false,
      default: () => []
    }
  },
  computed: {
    gsString () {
      return this.gs.map(e => e.value).join('')
    }
  },
  methods: {
    tagColor (type) {
      switch (type) {
        case 'operator':
          return 'blue'
        case 'variable':
          return 'green'
        default:
          return 'yellow'
      }
    },
    selectHandler (index, item) {
      this.$emit('select', index, item)
    }
  }
}
</script>

