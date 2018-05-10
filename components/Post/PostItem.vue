<style lang='stylus'>
@require '../../styles/cnuc/var/color.styl';

.vue-waterfall-slot {
  padding: 10px;
}

.post-item {
  position: absolute;
  top: 12px;
  left: 12px;
  right: 12px;
  bottom: 12px;
  background: #FFF;
  overflow: hidden;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.14);
  border-radius: 2px;

  img {
    width: 100%;
    height: 100%;
  }

  &__meta {
    display: flex;
    align-items: center;
    height: 58px;
    color: #666;
  }

  &__date {
    position: absolute;
    right: 15px;
  }

  .build-status {
    position: absolute;
    left: 0px;
    background-color: #EEE;
    color: $color-primary;
    font-size: 14px;
    height: 30px;
    line-height: 30px;
    padding: 0 10px;
  }
}
</style>
<template>
  <div class="post-item">
    <div class="post-item__meta">
      <div class="build-status" v-if="data.type === 1">效果图</div>
      <div class="build-status" v-if="data.type === 2">进度图</div>
      <div class="post-item__date" v-if="data.type === 2">
        {{data.viewDate}}
      </div>
    </div>
    <img :src="picUrl" alt="">
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
