<style lang='stylus'>
@require '../../styles/cnuc/var/color.styl';

.build-desc-list {
  list-style: none;
  padding: 0px;
}

.build-desc-item {
  font-size: 14px;
  border-bottom: 1px solid $color-light-grey-ss;
  line-height: 35px;

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
