<style lang='stylus'>
  // .nb-year-select

</style>
<template>
  <div class="nb-process">
    <div class="nb-year-select"></div>

    <div class="nb-process-item" v-for="(item, index) in data" :key="index">
      {{item}}

    </div>
  </div>
</template>

<script>
export default {
  components: {},

  props:{
    data: Object
  },

  data() {
    return {
    }
  },

  computed: {},

  mounted() {},

  methods: {}
}
</script>
