<style lang='stylus'>
.post-item {
  width: 200px;

  img {
    width: 100%;
  }
}
</style>
<template>
  <div class="post-item">
    <img :src="picUrl" alt=""> {{date}}
  </div>
</template>

<script>
export default {
  components: {},

  props: {
    data: Object
  },

  data() {
    return {
      ...this.data
    }
  },

  computed: {},

  mounted() { },

  methods: {}
}
</script>
