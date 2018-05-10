<style lang='stylus'>
@require '../../styles/cnuc/var/color.styl';

.build-desc-list {
  list-style: none;
  padding: 0 12px;
  // border: 1px solid $color-light-grey;
  background: $color-primary;
  color: rgba(255, 255, 255, 0.89);
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.14);
}

.build-desc-item {
  font-size: 14px;
  line-height: 35px;

  &:not(:last-child) {
    border-bottom: 1px solid rgba(255, 255, 255, 0.39);
  }

  &__name {
  }
}
</style>
<template>
  <ul class="build-desc-list">
    <li class="build-desc-item" v-for="(item, index) in data" :key="index">
      <span class="build-desc-item__name">{{item.name}}：</span>
      <span class="build-desc-item__value">{{item.value}}</span>
    </li>
  </ul>
</template>

<script>
export default {
  components: {},

  props: {
    data: Array
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
