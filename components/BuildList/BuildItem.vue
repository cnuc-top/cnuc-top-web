<style lang='stylus'>
.build-item {
  border: 1px solid #EEE;
}
</style>
<template>
  <div class="build-item">
    {{data.name}}
    <build :data="data"></build>
  </div>
</template>

<script>
import Build from '@/components/Build/Build'

export default {
  components: { Build },

  props: {
    data: Object
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
