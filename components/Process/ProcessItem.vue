<style lang='stylus'>
.process-item {
  cursor: pointer;
}
</style>
<template>
  <div class="process-item" @click="handleClick(data)">{{data.viewDate}} {{data.basic}}</div>
</template>

<script>
export default {
  components: {},

  props: {
    data: Object
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
