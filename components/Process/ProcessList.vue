<style lang='stylus'>
.process-list {
}
</style>
<template>
  <div class="process-list">
    <process-item @click="handleClick" v-for="(item, index) in data" :key="index" :data="item"></process-item>
  </div>
</template>

<script>
import ProcessItem from './ProcessItem'
export default {
  components: { ProcessItem },

  props: {
    data: Array
  },

  data() {
    return {
    }
  },

  computed: {},

  mounted() { },

  methods: {
    handleClick(data) {
      this.$emit('click', data)
    }
  }
}
</script>
