<style lang='stylus'>
@require '../../styles/cnuc/var/color.styl';

.process-list {
  border-top: 1px solid $color-light-grey-ss;
  margin-top: 24px;
}
</style>
<template>
  <div class="process-list">
    <process-item @click="handleClick" v-for="(item, index) in list" :key="index" :data="item"></process-item>
    <div class="process-item">已建成</div>
    <div class="process-item">效果图</div>
  </div>
</template>

<script>
import ProcessItem from './ProcessItem'
import moment from 'moment'

export default {
  components: { ProcessItem },

  props: {
    data: Array,
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
    list() {
      const map = new Set()
      const list = []

      this.data.forEach(item => {
        const { viewDate } = item
        const year = moment(viewDate, 'YYYY年MM月DD日').format('YYYY')

        if (!map.has(year)) {
          list.push(item)
          map.add(year)
        }
      })
      return list
    }
  },

  mounted() { },

  methods: {
    handleClick(data) {
      this.$emit('click', data)
    }
  }
}
</script>
