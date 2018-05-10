<style lang='stylus'>
.process-item {
  cursor: pointer;
  color: #333;

  &__date {
    line-height: 30px;
  }
}
</style>
<template>
  <div class="process-item" @click="handleClick(data)">
    <div class="process-item__date">
      {{data.viewDate | timeFormat('YYYY年', 'YYYY年MM月DD日')}}
    </div>

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
