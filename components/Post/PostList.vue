<style lang='stylus'>
</style>
<template>
  <div class="post-list">
    <post-item v-for="(item, index) in data" :key="index" :data="item"></post-item>

  </div>
</template>

<script>
import PostItem from './PostItem'
export default {
  components: {PostItem},

  props:{
    data: Array
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
