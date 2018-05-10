<style lang='stylus'>
@require '../../styles/cnuc/var/color.styl';

.process-list {
  border: 1px solid $color-light-grey-ss;
  margin-top: 24px;
  background: #FFF;
  border-radius: 5px;

  .process-item {
    &:not(:last-child) {
      border-bottom: 1px solid rgba($color-light-grey-ss, 0.5);
    }
  }
}
</style>
<template>
  <div class="process-list">

    <process-item :active="{'is-active': item.year === active}" @click="handleClick" v-for="(item, index) in data" :key="index" :data="item"></process-item>

  </div>
</template>

<script>
import ProcessItem from './ProcessItem'
import moment from 'moment'

export default {
  components: { ProcessItem },

  props: {
    data: Array,
    active: String,
    mode: {
      type: String,
      default: 'year'
    }
  },

  data() {
    return {

    }
  },

  computed: {

  },

  mounted() {
  },

  methods: {
    handleClick(data) {
      list.find(_ => _.active)['active'] = false
      data.active = true
      this.$emit('click', data)
    }
  }
}
</script>
