<style lang='stylus'>
</style>
<template>
  <div class="container">
    <build-list :data="list"></build-list>
  </div>
</template>

<script>
import BuildList from '@/components/BuildList/BuildList'
import BTL from '@/common/api/btl'
export default {
  components: { BuildList },

  data() {
    return {
      list: []
    }
  },

  computed: {},

  mounted() {
    this.init()
  },

  methods: {
    async init() {
      this.list = await BTL.buildingList()
    }
  }
}
</script>
