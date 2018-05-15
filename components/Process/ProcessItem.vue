<style lang='stylus'>
@require '../../styles/cnuc/var/color.styl';

.process-item {
  cursor: pointer;
  color: #333;
  display: flex;
  align-items: center;
  padding: 0 15px;
  height: 38px;
  overflow: hidden;

  &:hover {
    background: rgba($color-light-grey-ss, 0.5);
  }

  &.is-active {
    font-weight: 600;
    background: rgba($color-light-grey-ss, 0.5);
  }

  &__name {
    margin-right: 10px;
    font-size: 14px;
  }

  svg {
    width: 100px;
    height: 14px;
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
      <span v-show="data.year">{{data.year}}</span>

      <ContentLoader v-show="!data.year" :width="100" :height="14">
        <rect x="0" y="0" rx="3" ry="3" :width="100" :height="14" />
      </ContentLoader>

    </div>
    <div v-if="data.count" class="process-item__count">
      {{data.count}}
    </div>
  </div>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'
export default {
  components: {
    ContentLoader
  },

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
