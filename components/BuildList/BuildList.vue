<style lang='stylus'>
.build-list {
  display: flex;
}
</style>
<template>
  <div class="build-list">
    <build-item v-for="(item, index) in data" :key="index" :data="item"></build-item>
  </div>
</template>

<script>

import BuildItem from '@/components/BuildList/BuildItem'

export default {
  components: { BuildItem },

  props: {
    data: {
      type: Array,
      default: () => {
        return []
      }
    }
  },

  data() {
    return {
    }
  },

  computed: {},

  mounted() { },

  methods: {}
}
</script>
