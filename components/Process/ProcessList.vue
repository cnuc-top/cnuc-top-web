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
    <div class="process-item">
      <div class="process-item__name">
        效果图
      </div>
      <div class="process-item__count">
        {{count['demo']}}
      </div>
    </div>
    <process-item @click="handleClick" v-for="(item, index) in list" :count="count[item.year]" :key="index" :data="item"></process-item>
    <div class="process-item">
      <div class="process-item__name">
        建成图
      </div>
      <div class="process-item__count">
        {{count['finish']}}
      </div>
    </div>
  </div>
</template>

<script>
import ProcessItem from './ProcessItem'
import moment from 'moment'

export default {
  components: { ProcessItem },

  props: {
    data: Array,
    count: Object,
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
        item.year = year

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
      list.find(_ => _.active)['active'] = false
      data.active = true
      this.$emit('click', data)
    }
  }
}
</script>
