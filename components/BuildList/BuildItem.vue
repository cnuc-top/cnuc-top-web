<style lang='stylus'>
.build-item {
  text-align: center;

  &__title {
    font-size: 16px;
    margin-top: 10px;
  }

  &_height {
  }
}
</style>
<template>
  <div class="build-item">
    <h2 class="build-item__title">{{data.name}}</h2>
    <h3 class="build-item__height">{{data.height}}M</h3>
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
