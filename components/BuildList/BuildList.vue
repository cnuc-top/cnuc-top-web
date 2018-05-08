<style lang='stylus'>
.build-list {
  margin-top: 30px;
  display: flex;

  .build-item {
    cursor: pointer;
    border: 1px solid #EEE;
    margin-right: 10px;

    &:hover {
      border-color: #000;
    }
  }
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
