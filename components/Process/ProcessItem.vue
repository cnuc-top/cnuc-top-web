<style lang='stylus'>
@require '../../styles/cnuc/var/color.styl';

.process-item {
  cursor: pointer;
  color: #333;
  display: flex;
  align-items: center;
  padding: 0 15px;
  height: 38px;

  &:hover {
    background: rgba($color-light-grey-ss, 0.5);
  }

  &.is-active {
    font-weight: 600;
    background: rgba($color-light-grey-ss, 0.5);
  }

  &__name {
    // flex: 1;
    margin-right: 10px;
    // width: 80px;
    font-size: 14px;
  }

  &__count {
    background: $color-light-grey-s;
    color: #FFF;
    line-height: 20px;
    font-size: 13px;
    font-weight: 600;
    padding: 0px 8px;
    border-radius: 4px;
    height: 20px;
  }
}
</style>
<template>
  <div class="process-item" @click="handleClick(data)">
    <div class="process-item__name">
      {{data.year}}
    </div>
    <div v-if="data.count" class="process-item__count">
      {{data.count}}
    </div>
  </div>
</template>

<script>
export default {
  components: {},

  props: {
    count: Number,
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
