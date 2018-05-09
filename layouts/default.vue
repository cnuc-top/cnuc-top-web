<style lang='stylus'>
</style>
<template>
  <div>
    <layout-header></layout-header>
    <nuxt />
    <layout-footer></layout-footer>
  </div>
</template>

<script>
import LayoutHeader from './Layout/LayoutHeader'
import LayoutFooter from './Layout/LayoutFooter'
export default {
  components: { LayoutHeader, LayoutFooter },

  props: {
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
